import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useUser } from "~/routes/layout";

export default component$(() => {
  const user = useUser();

  return (
    <section class="flex min-h-dvh items-center justify-center bg-gray-50 p-10">
      <div class="flex max-w-sm flex-col items-center justify-center space-y-2 bg-white p-6">
        {!user.value && (
          <div class="grid gap-5">
            <p class="text-2xl">Welcome Guest</p>
            <a
              href="/login"
              class={[
                "mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white",
                "hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300",
              ]}
            >
              Click here to login
            </a>
          </div>
        )}
        {user.value && (
          <>
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
          </>
        )}
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
