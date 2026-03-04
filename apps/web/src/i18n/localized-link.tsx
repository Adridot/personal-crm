import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;
type Locale = ReturnType<typeof useLocale>["locale"];
export type LocalizedParams =
  | undefined
  | true
  | Record<string, unknown>
  | ((current: Record<string, unknown>) => Record<string, unknown>);

type RemoveAll<
  Source extends string,
  Fragment extends string,
> = Source extends `${infer Head}${Fragment}${infer Tail}`
  ? RemoveAll<`${Head}${Tail}`, Fragment>
  : Source;

type CollapseDoubleSlashes<Source extends string> =
  Source extends `${infer Head}//${infer Tail}`
    ? CollapseDoubleSlashes<`${Head}/${Tail}`>
    : Source;

type RemoveLocaleFromString<Source extends string> = CollapseDoubleSlashes<
  RemoveAll<Source, typeof LOCALE_ROUTE>
>;

export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

export type To = RemoveLocaleParam<LinkComponentProps["to"]>;

export const mergeLocalizedParams = (
  params: LocalizedParams,
  localePrefix: string | undefined
): LocalizedParams => {
  if (params === true) {
    return (current) => ({
      ...current,
      locale: localePrefix,
    });
  }

  if (typeof params === "function") {
    return (current) => ({
      ...params(current),
      locale: localePrefix,
    });
  }

  return {
    ...(params ?? {}),
    locale: localePrefix,
  };
};

type LocalizedLinkProps = {
  locale?: Locale;
  to: To;
} & Omit<LinkComponentProps, "to">;

export const LocalizedLink: FC<LocalizedLinkProps> = ({
  locale: localeOverride,
  params,
  to,
  ...props
}) => {
  const { locale } = useLocale();
  const { localePrefix } = getPrefix(localeOverride ?? locale);

  return (
    <Link
      {...props}
      params={
        mergeLocalizedParams(
          params as LocalizedParams,
          localePrefix
        ) as LinkComponentProps["params"]
      }
      to={`/${LOCALE_ROUTE}${to}` as LinkComponentProps["to"]}
    />
  );
};
