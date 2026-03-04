import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";

import {
  LOCALE_ROUTE,
  type LocalizedParams,
  mergeLocalizedParams,
} from "@/i18n/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type StripLocalePrefix<T extends string> = T extends
  | `/${typeof LOCALE_ROUTE}`
  | `/${typeof LOCALE_ROUTE}/`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : never;

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

type NavigateOptions = Parameters<ReturnType<typeof useNavigate>>[0];

type LocalizedNavigateOptions = Omit<NavigateOptions, "params" | "to"> & {
  params?: LocalizedParams;
  to: LocalizedTo;
};

type LocalizedNavigateArgs = LocalizedTo | LocalizedNavigateOptions;

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  return (args: LocalizedNavigateArgs) => {
    const { localePrefix } = getPrefix(locale);

    if (typeof args === "string") {
      return navigate({
        params: { locale: localePrefix } as never,
        to: `/${LOCALE_ROUTE}${args}` as FileRouteTypes["to"],
      });
    }

    const { params, to, ...rest } = args;

    return navigate({
      ...rest,
      params: mergeLocalizedParams(params, localePrefix) as never,
      to: `/${LOCALE_ROUTE}${to}` as FileRouteTypes["to"],
    });
  };
};
