import { Provider as GadgetProvider } from "@gadgetinc/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { GadgetConfig } from "gadget-server";
import { Suspense } from "react";
import { api } from "./api";
import appStylesHref from "./app.css?url";

export const links = () => [
  { rel: "stylesheet", href: appStylesHref },
  { rel: "stylesheet", href: "https://assets.gadget.dev/assets/reset.min.css" },
];

export const meta = () => [
  { charset: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { title: "Gadget Remix app" },
];

export type RootOutletContext = {
  gadgetConfig: GadgetConfig;
};

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { gadgetConfig } = context;

  return json({
    gadgetConfig,
  });
};

export default function App() {
  const { gadgetConfig } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Suspense>
          <GadgetProvider api={api}>
            <Outlet context={{ gadgetConfig }} />
          </GadgetProvider>
        </Suspense>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

