import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";
import { buttonVariants } from "@/components/ui/button";
import { LocalizedLink, type To } from "@/i18n/localized-link";
import { cn } from "@/lib/utils";

interface LocaleSwitcherProps {
  label: string;
}

export const LocaleSwitcher: FC<LocaleSwitcherProps> = ({ label }) => {
  const { pathname } = useLocation();
  const { availableLocales, locale, setLocale } = useLocale();
  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <section aria-label={label} className="grid gap-2">
      <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
        {label}
      </p>
      <ol className="grid gap-2 sm:grid-cols-2">
        {availableLocales.map((localeOption) => {
          const localeValue = String(localeOption) as typeof locale;
          const isActive = localeValue === locale;

          return (
            <li key={localeValue}>
              <LocalizedLink
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: isActive ? "default" : "outline",
                  }),
                  "w-full justify-start"
                )}
                hash={true}
                locale={localeValue}
                onClick={() => setLocale(localeValue)}
                search={true}
                to={pathWithoutLocale as To}
              >
                <span className="min-w-8 font-semibold">
                  {localeValue.toUpperCase()}
                </span>
                <span
                  className="truncate"
                  dir={getHTMLTextDir(localeValue)}
                  lang={localeValue}
                >
                  {getLocaleName(localeValue, locale)}
                </span>
                <span className="sr-only" dir="ltr" lang={Locales.ENGLISH}>
                  {getLocaleName(localeValue, Locales.ENGLISH)}
                </span>
              </LocalizedLink>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
