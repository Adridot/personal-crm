import { createFileRoute, redirect } from "@tanstack/react-router";

import { getLocalizedAppPath, getSessionOrNull } from "@/lib/auth-session";

export const Route = createFileRoute("/{-$locale}/")({
  beforeLoad: async ({ params }) => {
    const session = await getSessionOrNull();

    throw redirect({
      href: session
        ? getLocalizedAppPath("/dashboard", params.locale)
        : getLocalizedAppPath("/sign-in", params.locale),
      replace: true,
    });
  },
});
