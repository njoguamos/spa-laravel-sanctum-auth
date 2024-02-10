import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { User } from "~/routes/plugin@auth";

export const useUser = routeLoader$(({ sharedMap }) => {
  return sharedMap.get("user") as User;
});

export default component$(() => {
  return <Slot />;
});
