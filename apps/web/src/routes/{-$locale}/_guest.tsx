import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import {
  fetchFreshAccountSession,
  isUnauthorizedSessionError,
} from "@/features/auth/lib/account-session";
import { resolveAuthRedirectPath } from "@/features/auth/lib/auth-redirect";
import type { FileRouteTypes } from "@/routeTree.gen";

export const Route = createFileRoute("/{-$locale}/_guest")({
  beforeLoad: async ({ context, params, search }) => {
    try {
      await fetchFreshAccountSession(context.queryClient);
    } catch (error) {
      if (isUnauthorizedSessionError(error)) {
        return;
      }

      throw error;
    }

    const redirectPath = resolveAuthRedirectPath(
      (search as Record<string, unknown>).redirect
    );

    throw redirect({
      params: { locale: params.locale },
      to: `/{-$locale}${redirectPath}` as FileRouteTypes["to"],
    });
  },
  component: Outlet,
});
