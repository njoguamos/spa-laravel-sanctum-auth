# SPA Authentication using Laravel Sanctum

This repo contains the source code for the following articles

1. [Preparing a Laravel API backend for SPA authentication using Sanctum.](https://njoguamos.me.ke/posts/preparing-a-laravel-api-backend-for-spa-authentication-using-sanctum)


## Preparing a Laravel API backend for SPA authentication using Sanctum

To get the Laravel API backend up and running, clone the entire repo

```bash
git clone git@github.com:njoguamos/spa-laravel-sanctum-auth.git
```

Navigate to the Laravel API subfolder

```bash
cd laravel_api
```

Create `.env` file and update the variables respectively

```bash
cp .env.example .env
```

Generate app key

```bash
php artisan key:generate
```

Migrate database and seed

```bash
php artisan migrate:fresh --seed
```

Start the server which will be accessible via `https://localhost:8000` by default.

```bash
php artisan serve
```

