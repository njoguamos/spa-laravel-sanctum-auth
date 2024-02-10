import type { QRL } from "@builder.io/qwik";
import { component$, $ } from "@builder.io/qwik";
import type { Input } from "valibot";
import { email, maxLength, minLength, object, string } from "valibot";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import type { SubmitHandler } from "@modular-forms/qwik";
import { setError } from "@modular-forms/qwik";
import { useForm, valiForm$ } from "@modular-forms/qwik";

// noinspection JSUnresolvedReference
const endpoint = import.meta.env.PUBLIC_API_ENDPOINT;

const LoginSchema = object({
  email: string([
    minLength(1, "Please enter an email address."),
    email("Enter a valid email e.g yourname@gmail.com."),
    maxLength(256, "Email too long. Enter an shorter alternative email."),
  ]),
  password: string([minLength(1, "Please enter a password.")]),
});

type LoginForm = Input<typeof LoginSchema>;

export default component$(() => {
  const [loginForm, { Form, Field }] = useForm<LoginForm>({
    loader: { value: { email: "", password: "" } },
    validate: valiForm$(LoginSchema),
  });

  const nav = useNavigate();

  const getBrowserCookieValue = $(function getBrowserCookieValue(
    cname: string,
  ) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  });

  const handleSubmit: QRL<SubmitHandler<LoginForm>> = $(async (values) => {
    await fetch(`${endpoint}/sanctum/csrf-cookie`, { credentials: "include" });

    const token = await getBrowserCookieValue("XSRF-TOKEN");

    const response = await fetch(`${endpoint}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": token,
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      nav("/dash", {
        replaceState: true,
        forceReload: true,
      });
    } else {
      switch (response.status) {
        case 422:
          const json = await response.json();
          const errors = json.errors;

          Object.keys(errors).forEach((key) => {
            setError(loginForm, key as "email" | "password", errors[key]);
          });
          break;
        default:
          // noinspection ExceptionCaughtLocallyJS
          throw new Error(
            "Sorry, there was an error when logging in. Refresh the page and try again.",
          );
      }
    }
  });

  return (
    <section class="bg:white flex min-h-screen items-center justify-around md:bg-gray-100">
      <div class="grid w-full max-w-sm space-y-6 p-4 md:bg-white md:p-8">
        <h1 class="text-4xl font-medium">Login</h1>
        <Form onSubmit$={handleSubmit}>
          <Field name="email">
            {(field, props) => (
              // @ts-ignore
              <div class="mb-5">
                <label
                  for="email"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <input
                  {...props}
                  value={field.value}
                  type="email"
                  autoComplete="current-username"
                  autoFocus
                  id="email"
                  class={[
                    "block w-full rounded-lg border  bg-gray-50 p-3 text-sm text-gray-900 ",
                    field.error
                      ? "border-red-600"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
                  ]}
                />
                {field.error && (
                  <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                    {field.error}
                  </p>
                )}
              </div>
            )}
          </Field>

          <Field name="password">
            {(field, props) => (
              // @ts-ignore
              <div class="mb-5">
                <label
                  for="email"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  {...props}
                  value={field.value}
                  type="password"
                  autoComplete="current-password"
                  id="password"
                  class={[
                    "block w-full rounded-lg border  bg-gray-50 p-3 text-sm text-gray-900 ",
                    field.error
                      ? "border-red-600"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
                  ]}
                />
                {field.error && (
                  <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                    {field.error}
                  </p>
                )}
              </div>
            )}
          </Field>

          <button
            class={[
              "mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white",
              "hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300",
            ]}
            disabled={loginForm.submitting}
          >
            {!loginForm.submitting && <span>Login</span>}

            {loginForm.submitting && <span>Logging in ... </span>}
          </button>
        </Form>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Login",
  meta: [
    {
      name: "description",
      content: "Welcome back to my application",
    },
  ],
};
