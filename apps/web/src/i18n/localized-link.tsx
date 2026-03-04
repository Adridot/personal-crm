import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

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

type LocalizedLinkProps = {
  to: To;
} & Omit<LinkComponentProps, "to">;

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();
  const { localePrefix } = getPrefix(locale);

  return (
    <Link
      {...props}
      params={{
        locale: localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps["to"]}
    />
  );
};
