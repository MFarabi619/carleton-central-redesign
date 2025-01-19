import { useActionForm } from "@gadgetinc/react";
import { Link, useLocation, useNavigate, useOutletContext } from "@remix-run/react";
import type { RootOutletContext } from "../root";
import { api } from "../api";

export default function () {
  const { gadgetConfig } = useOutletContext<RootOutletContext>();
  const navigate = useNavigate();
  const {
    register,
    submit,
    formState: { errors, isSubmitting },
  } = useActionForm(api.user.signIn, {
    onSuccess: () =>
      navigate(gadgetConfig.authentication!.redirectOnSuccessfulSignInPath!),
  });
  const { search } = useLocation();

  return (
    <form className="text-3xl custom-form" onSubmit={submit}>
        <a className="google-oauth-button" href={`/auth/google/start${search}`}>
          <img
            src="https://assets.gadget.dev/assets/default-app-assets/google.svg"
            width={22}
            height={22}
          />{" "}
          Continue with Google
        </a>
        {errors?.root?.message && (
          <p className="format-message error">{errors.root.message}</p>
        )}
        <button disabled={isSubmitting} type="submit">
          Sign in
        </button>
    </form>
  );
}
