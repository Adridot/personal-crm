import {
  createFileRoute,
  isRedirect,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import {
  accountMeQueryOptions,
  isUnauthorizedSessionError,
} from "@/lib/account-session";
import { resolveAuthRedirectPath } from "@/lib/auth-redirect";
import type { FileRouteTypes } from "@/routeTree.gen";

export const Route = createFileRoute("/{-$locale}/_guest")({
  beforeLoad: async ({ context, params, search }) => {
    try {
      await context.queryClient.ensureQueryData(accountMeQueryOptions);

      const redirectPath = resolveAuthRedirectPath(
        (search as Record<string, unknown>).redirect
      );

      throw redirect({
        params: { locale: params.locale },
        to: `/{-$locale}${redirectPath}` as FileRouteTypes["to"],
      });
    } catch (error) {
      if (isRedirect(error)) {
        throw error;
      }

      if (isUnauthorizedSessionError(error)) {
        return;
      }

      throw error;
    }
  },
  component: Outlet,
});
