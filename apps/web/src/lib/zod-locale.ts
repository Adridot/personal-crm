import { z } from "zod";

const resolveZodLocale = (locale: string) =>
  locale.startsWith("fr") ? z.locales.fr() : z.locales.en();

export const configureZodLocale = (locale: string): void => {
  z.config(resolveZodLocale(locale));
};
