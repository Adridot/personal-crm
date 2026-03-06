import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Outlet,
  useMatches,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { IntlayerProvider } from "react-intlayer";
import { configureZodLocale } from "@/lib/zod-locale";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootRouteComponent,
});

function RootRouteComponent() {
  const matches = useMatches();
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
    configureZodLocale(locale);
  }, [locale]);

  return (
    <IntlayerProvider
      defaultLocale={defaultLocale}
      disableEditor
      isCookieEnabled
      locale={locale}
    >
      <Outlet />
    </IntlayerProvider>
  );
}
