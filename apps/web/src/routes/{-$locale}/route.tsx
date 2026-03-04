import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getPathWithoutLocale, validatePrefix } from "intlayer";

import { LOCALE_ROUTE } from "@/i18n/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ location, params }) => {
    const { isValid } = validatePrefix(params.locale);

    if (!isValid) {
      const pathWithoutLocale = getPathWithoutLocale(location.pathname);
      const to =
        pathWithoutLocale === "/"
          ? `/${LOCALE_ROUTE}`
          : `/${LOCALE_ROUTE}${pathWithoutLocale}`;

      throw redirect({
        hash: true,
        params: { locale: undefined },
        search: true,
        to: to as FileRouteTypes["to"],
      });
    }
  },
  component: Outlet,
});
