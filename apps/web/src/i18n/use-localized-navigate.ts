import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";

import { LOCALE_ROUTE } from "@/i18n/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type StripLocalePrefix<T extends string> = T extends
  | `/${typeof LOCALE_ROUTE}`
  | `/${typeof LOCALE_ROUTE}/`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : never;

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

type LocalizedNavigateArgs =
  | LocalizedTo
  | ({
      to: LocalizedTo;
      params?: Record<string, unknown>;
    } & Record<string, unknown>);

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
    const navigateOptions = rest as Record<string, unknown>;

    return navigate({
      ...navigateOptions,
      params: {
        locale: localePrefix,
        ...(params ?? {}),
      } as never,
      to: `/${LOCALE_ROUTE}${to}` as FileRouteTypes["to"],
    });
  };
};
