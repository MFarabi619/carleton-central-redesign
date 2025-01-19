import { useActionForm } from "@gadgetinc/react";
import { Link, useLocation, useNavigate, useOutletContext } from "@remix-run/react";
import type { RootOutletContext } from "../root";
import { api } from "../api";
import { GlassmorphicCard } from '../components/ui/glassmorphic-card'
import { Button } from '@/components/ui/button'
import CarletonBackground from '@/assets/CarletonBackground.webp'

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
    <div className="relative h-screen w-screen">
      <div className="absolute inset-0">
        <img
          src={CarletonBackground}
          alt="Carleton Background"
          className="h-full w-full object-cover"
        />
      </div>
      <main className="relative px-7 py-7 lg:w-1/2 mx-auto h-screen flex flex-col justify-center">
        <GlassmorphicCard className="flex flex-col gap-y-3 px-7 py-7 md:px-10 md:py-10 lg:px-12 lg:py-12">
          <div className="text-right">
            <div className="text-3xl">Carleton</div>
            <div className="text-xl">University</div>
          </div>
          <div className="text-base">
            Welcome to the Carleton SSO Federated Portal. Sign in with your Google account to continue.
          </div>
          <Button className="w-1/2 mx-auto">
            <a className="flex gap-3 " href={`/auth/google/start${search}`}>
              <img
                src="https://assets.gadget.dev/assets/default-app-assets/google.svg"
                width={22}
                height={22}
              />{" "}
              Continue with Google
            </a>
          </Button>

        </GlassmorphicCard>
      </main>
    </div>

  );
}
