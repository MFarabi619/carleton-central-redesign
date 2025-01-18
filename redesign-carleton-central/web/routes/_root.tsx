import { json, redirect, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useOutletContext } from "@remix-run/react";
import type { RootOutletContext } from "../root";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { session, gadgetConfig } = context;

  const signedIn = !!session?.get("user");

  if (signedIn) {
    return redirect(
      gadgetConfig.authentication!.redirectOnSuccessfulSignInPath!
    );
  }

  return json({});
};

export default function () {
  const context = useOutletContext<RootOutletContext>();

  return (
    <>
      <Header />
      <div className="app">
        <div className="app-content">
          <div className="main">
            <Outlet context={context} />
          </div>
        </div>
      </div>
    </>
  );
}

const Header = () => {
  const { gadgetConfig } = useOutletContext<RootOutletContext>();

  return (
    <div className="header">
      <a
        href="/"
        target="_self"
        rel="noreferrer"
        style={{ textDecoration: "none" }}
      >
        <div className="logo">{gadgetConfig.env.GADGET_APP}</div>
      </a>
      <div className="header-content">
        <Link to="/sign-in" style={{ color: "black" }}>
          Sign in
        </Link>
        <Link to="/sign-up" style={{ color: "black" }}>
          Sign up
        </Link>
      </div>
    </div>
  );
};

