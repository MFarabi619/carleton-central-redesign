import { useActionForm } from "@gadgetinc/react";
import { Link, useOutletContext } from "@remix-run/react";
import type { AuthOutletContext } from "./_auth._index";
import { api } from "../api";

export default function () {
  const { user } = useOutletContext<AuthOutletContext>();
  const {
    submit,
    register,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useActionForm(api.user.changePassword, { defaultValues: user });

  return isSubmitSuccessful ? (
    <p className="format-message success">
      Password changed successfully.{" "}
      <Link to="/signed-in">Back to profile</Link>
    </p>
  ) : (
    <form className="custom-form" onSubmit={submit}>
      <h1 className="form-title">Change password</h1>
      <input
        className="custom-input"
        type="password"
        placeholder="Current password"
        {...register("currentPassword")}
      />
      <input
        className="custom-input"
        type="password"
        placeholder="New password"
        {...register("newPassword")}
      />
      {errors?.user?.password?.message && (
        <p className="format-message error">
          Password: {errors.user.password.message}
        </p>
      )}
      {errors?.root?.message && (
        <p className="format-message error">{errors.root.message}</p>
      )}
      <Link to="/signed-in">Back to profile</Link>
      <button disabled={isSubmitting} type="submit">
        Change password
      </button>
    </form>
  );
}
