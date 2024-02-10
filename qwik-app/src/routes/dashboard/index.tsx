import { component$ } from "@builder.io/qwik";
import { useUser } from "~/routes/layout";

import type { RequestHandler } from "@builder.io/qwik-city";

export const onRequest: RequestHandler = ({ redirect, sharedMap }) => {
  if (!sharedMap.get("user")) {
    throw redirect(302, "login");
  }
};

export default component$(() => {
  const user = useUser();

  return (
    <div class="min-h-screen w-full bg-gray-50">
      <aside class="hidden min-h-dvh w-48 bg-white shadow  md:fixed md:inset-y-0 md:left-0 md:flex">
        Sidebar
      </aside>
      <div class="flex min-h-screen w-full items-center justify-center p-10 md:ml-48">
        <div class="flex max-w-sm flex-col items-center space-y-2 bg-white p-6">
          <img
            src="https://i.pravatar.cc/300"
            height="300"
            width="300"
            alt="sample user"
            class="h-20 w-20 rounded-full"
          />
          <div class="h1 text-2xl">Welcome</div>
          <p class="text-lg">{user.value.name}</p>
          <p class="text-lg">{user.value.email}</p>
        </div>
      </div>
    </div>
  );
});
