import type { HeadersInit } from "undici-types";

import type { RequestHandler } from "@builder.io/qwik-city";
import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";

export type User = {
  name: string;
  email: string;
};

export const onRequest: RequestHandler = async ({
  cookie,
  url,
  sharedMap,
  env,
}) => {
  const session_name = env.get("PUBLIC_SESSION_NAME") ?? "";

  const token = cookie.get("XSRF-TOKEN");
  const session = cookie.get(session_name);

  if (token && session) {
    const laravelCookie = `XSRF-TOKEN=${encodeURIComponent(token.value)};${session_name}=${encodeURIComponent(session.value)}`;

    const headers: HeadersInit = {
      "X-XSRF-TOKEN": token.value,
      cookie: laravelCookie,
      origin: url.origin,
    };

    const user = await getAuthenticatedUser(headers, env);

    sharedMap.set("user", user);
  }
};

async function getAuthenticatedUser(headers: HeadersInit, env: EnvGetter) {
  const endpoint = env.get("PUBLIC_API_ENDPOINT");

  return await fetch(`${endpoint}/api/user`, {
    method: "GET",
    // @ts-ignore
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
  })
    .then(async function (res) {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((data) => data as User);
}
