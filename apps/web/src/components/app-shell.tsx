import { useRouterState } from "@tanstack/react-router";
import { getPathWithoutLocale } from "intlayer";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import { useIntlayer } from "react-intlayer";

import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/i18n/locale-switcher";
import { LocalizedLink } from "@/i18n/localized-link";
import { useLocalizedNavigate } from "@/i18n/use-localized-navigate";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export const AppShell = ({ children }: PropsWithChildren) => {
  const content = useIntlayer("app-shell");
  const navigate = useLocalizedNavigate();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const { data: session } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathWithoutLocale = getPathWithoutLocale(pathname);
  const navigationItems = [
    { label: content.dashboardLabel, to: "/dashboard" },
    { label: content.contactsLabel, to: "/contacts" },
  ] as const;
  const accountLabel =
    session?.user?.name?.trim() ||
    session?.user?.email ||
    content.loadingAccountLabel;

  const handleSignOut = async (): Promise<void> => {
    setIsSigningOut(true);

    try {
      const response = await authClient.signOut();

      if (response.error) {
        return;
      }

      await navigate({
        replace: true,
        to: "/sign-in",
      });
    } finally {
      setIsSigningOut(false);
    }
  };

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
            <div className="space-y-3 rounded-xl border border-border/70 bg-background/80 p-3">
              <div className="space-y-1">
                <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
                  {content.accountLabel}
                </p>
                <p className="font-medium text-sm">{accountLabel}</p>
              </div>
              <Button
                className="w-full"
                disabled={isSigningOut}
                onClick={handleSignOut}
                type="button"
                variant="outline"
              >
                {isSigningOut
                  ? content.signOutPendingLabel
                  : content.signOutLabel}
              </Button>
            </div>
          </div>
        </aside>
        <main className="min-w-0 flex-1 rounded-3xl border bg-card/60 p-5 shadow-sm sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
