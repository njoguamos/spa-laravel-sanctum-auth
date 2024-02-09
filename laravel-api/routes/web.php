<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

use Illuminate\Http\Request;

Route::middleware(['guest','throttle:api'])
    ->post('/login', function (Request $request) {
    // Validate the login request
    $request->validate([
        'email'    => [ 'required' ,'email' ],
        'password' => [ 'required' ],
    ]);

    // Attempt to authenticate the user
    if (Auth::attempt($request->only('email', 'password'))) {
        // Authentication successful, redirect to intended page
            return $request->user()->only(['name','email']);
    }

    return response()->json(['errors' => [
        'email' => 'The provided credentials do not match our records.',
    ]], 422);
});
