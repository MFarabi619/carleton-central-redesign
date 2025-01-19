import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import type { RootOutletContext } from "../root";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { session, gadgetConfig } = context;

  const userId = session?.get("user");
  const user = userId ? await context.api.user.findOne(userId) : undefined;

  if (!user) {
    return redirect(gadgetConfig.authentication!.signInPath);
  }

  return json({
    user,
  });
};

export type AuthOutletContext = RootOutletContext & {
  user: any;
};

export default function () {
  const { user } = useLoaderData<typeof loader>();
  const rootOutletContext = useOutletContext<RootOutletContext>();

  return (
    <div className="app">
      <div className="app-content">
        <div className="main">
          <Outlet
            context={{ ...rootOutletContext, user } as AuthOutletContext}
          />
        </div>
      </div>
    </div>
  );
}
