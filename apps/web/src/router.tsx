import { createRouter } from "@tanstack/react-router";

import {
  RouterErrorFallback,
  RouterNotFoundFallback,
  RouterPendingFallback,
} from "@/components/router-fallbacks";
import { queryClient } from "@/lib/query-client";
import { routeTree } from "@/routeTree.gen";

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultErrorComponent: RouterErrorFallback,
  defaultNotFoundComponent: RouterNotFoundFallback,
  defaultPendingComponent: RouterPendingFallback,
  defaultPendingMinMs: 300,
  defaultPendingMs: 400,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  notFoundMode: "fuzzy",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
