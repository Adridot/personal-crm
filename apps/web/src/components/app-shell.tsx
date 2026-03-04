import { useRouterState } from "@tanstack/react-router";
import { getPathWithoutLocale } from "intlayer";
import type { PropsWithChildren } from "react";
import { useIntlayer } from "react-intlayer";

import { LocaleSwitcher } from "@/i18n/locale-switcher";
import { LocalizedLink } from "@/i18n/localized-link";
import { cn } from "@/lib/utils";

export const AppShell = ({ children }: PropsWithChildren) => {
  const content = useIntlayer("app-shell");
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const pathWithoutLocale = getPathWithoutLocale(pathname);
  const navigationItems = [
    { label: content.dashboardLabel, to: "/dashboard" },
    { label: content.contactsLabel, to: "/contacts" },
  ] as const;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <aside className="w-full shrink-0 lg:w-72">
          <div className="sticky top-6 space-y-6 rounded-2xl border bg-card p-5 shadow-sm">
            <div className="space-y-2">
              <p className="font-medium text-muted-foreground text-sm">
                {content.productName}
              </p>
              <h1 className="font-semibold text-xl tracking-tight">
                {content.title}
              </h1>
              <p className="text-muted-foreground text-sm">
                {content.description}
              </p>
            </div>
            <nav aria-label="Primary" className="grid gap-2">
              {navigationItems.map((item) => {
                const isActive = pathWithoutLocale.startsWith(item.to);

                return (
                  <LocalizedLink
                    className={cn(
                      "rounded-xl px-3 py-2 font-medium text-sm transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    key={item.to}
                    to={item.to}
                  >
                    {item.label}
                  </LocalizedLink>
                );
              })}
            </nav>
            <LocaleSwitcher label={content.localeSwitcherLabel.value} />
          </div>
        </aside>
        <main className="min-w-0 flex-1 rounded-3xl border bg-card/60 p-5 shadow-sm sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
