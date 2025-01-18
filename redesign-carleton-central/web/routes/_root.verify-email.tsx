import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useOutletContext } from "@remix-run/react";
import type { RootOutletContext } from "../root";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  try {
    await context.api.user.verifyEmail({ code });
    return json({ success: true, error: null });
  } catch (error) {
    return json({
      error: { message: (error as Error).message },
      success: false,
    });
  }
};

export default function () {
  const { gadgetConfig } = useOutletContext<RootOutletContext>();
  const { success, error } = useLoaderData<typeof loader>();

  if (error) {
    return <p className="format-message error">{error.message}</p>;
  }

  return success ? (
    <p className="format-message success">
      Email has been verified successfully.{" "}
      <Link to={gadgetConfig.authentication!.signInPath}>Sign in now</Link>
    </p>
  ) : null;
}
