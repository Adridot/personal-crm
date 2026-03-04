import { createFileRoute, redirect } from "@tanstack/react-router";
import { defaultLocale, getPrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  beforeLoad: ({ params }) => {
    const { localePrefix } = getPrefix(params.locale ?? defaultLocale);

    throw redirect({
      params: { locale: localePrefix },
      to: "/{-$locale}/dashboard",
    });
  },
});
