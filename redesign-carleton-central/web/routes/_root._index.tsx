import { useOutletContext } from "@remix-run/react";
import type { RootOutletContext } from "../root";

export default function () {
  const { gadgetConfig } = useOutletContext<RootOutletContext>();

  return (
    <>
      <div className="app-link">
        <img
          src="https://assets.gadget.dev/assets/default-app-assets/react-logo.svg"
          className="app-logo"
          alt="logo"
        />
        <span>You are now signed out of {gadgetConfig.env.GADGET_APP} &nbsp;</span>
      </div>
      <div>
        <p className="text-xl description">
          building your app&apos;s signed out area
        </p>
        <a
          href="/edit/files/web/routes/_root._index.tsx"
          target="_blank"
          rel="noreferrer"
          style={{ fontWeight: 500 }}
        >
          web/routes/_root._index.tsx
        </a>
      </div>
    </>
  );
}
