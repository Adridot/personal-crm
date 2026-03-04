import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";
import { getSessionOrNull } from "@/lib/auth-session";

export const Route = createFileRoute("/{-$locale}/_authenticated")({
  beforeLoad: async ({ location, params }) => {
    const session = await getSessionOrNull();

    if (!session) {
      throw redirect({
        search: {
          redirect: location.href,
        },
        to: "/{-$locale}/sign-in",
        params: { locale: params.locale },
      });
    }

    return { session };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
