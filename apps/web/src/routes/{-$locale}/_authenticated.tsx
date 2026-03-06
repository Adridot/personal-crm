import { createFileRoute, Outlet } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";
import { requireAuthRoute } from "@/lib/require-auth";

export const Route = createFileRoute("/{-$locale}/_authenticated")({
  beforeLoad: ({ context, location, params }) =>
    requireAuthRoute({
      locale: params.locale,
      pathname: location.pathname,
      queryClient: context.queryClient,
    }),
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
