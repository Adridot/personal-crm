import type { QueryClient } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { getPathWithoutLocale } from "intlayer";

import type { FileRouteTypes } from "@/routeTree.gen";
import {
  accountMeQueryOptions,
  isUnauthorizedSessionError,
} from "./account-session";
import { resolveAuthRedirectPath } from "./auth-redirect";

interface RequireAuthRouteArgs {
  locale: string | undefined;
  pathname: string;
  queryClient: QueryClient;
}

export const requireAuthRoute = async ({
  locale,
  pathname,
  queryClient,
}: RequireAuthRouteArgs): Promise<void> => {
  try {
    await queryClient.ensureQueryData(accountMeQueryOptions);
  } catch (error) {
    if (!isUnauthorizedSessionError(error)) {
      throw error;
    }

    const redirectPath = resolveAuthRedirectPath(
      getPathWithoutLocale(pathname)
    );

    throw redirect({
      params: { locale },
      search: { redirect: redirectPath },
      to: "/{-$locale}/sign-in" as FileRouteTypes["to"],
    });
  }
};
