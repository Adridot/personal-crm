import { createFileRoute, redirect } from "@tanstack/react-router";
import { defaultLocale, getBrowserLocale, getPrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  beforeLoad: ({ params }) => {
    const resolvedLocale = params.locale ?? getBrowserLocale() ?? defaultLocale;
    const { localePrefix } = getPrefix(resolvedLocale);

    throw redirect({
      hash: true,
      params: { locale: localePrefix },
      search: true,
      to: "/{-$locale}/dashboard",
    });
  },
});
