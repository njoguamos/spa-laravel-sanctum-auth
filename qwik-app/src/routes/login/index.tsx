import { component$ } from "@builder.io/qwik";
import type { Input } from "valibot";
import { email, maxLength, minLength, object, string } from "valibot";
import { useNavigate } from "@builder.io/qwik-city";

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
  const nav = useNavigate();

  return <div>New route works.</div>;
});
