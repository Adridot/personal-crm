import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouterState } from "@tanstack/react-router";
import { getPathWithoutLocale } from "intlayer";
import { type PropsWithChildren, useState } from "react";
import { useIntlayer } from "react-intlayer";
import { Button } from "@/components/ui/button";
import {
  accountMeQueryKey,
  accountMeQueryOptions,
} from "@/features/auth/lib/account-session";
import { authClient } from "@/features/auth/lib/auth-client";
import { LocaleSwitcher } from "@/i18n/locale-switcher";
import { LocalizedLink } from "@/i18n/localized-link";
import { useLocalizedNavigate } from "@/i18n/use-localized-navigate";
import { cn } from "@/lib/utils";

const SIGN_OUT_ERROR_FALLBACK_MESSAGE =
  "Unable to sign out right now. Please try again.";

const readErrorMessage = (value: unknown): string | null => {
  if (value instanceof Error && value.message.trim().length > 0) {
    return value.message;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (typeof value === "object" && value !== null && "message" in value) {
    const { message } = value as { message?: unknown };

    if (typeof message === "string" && message.trim().length > 0) {
      return message;
    }
  }

  return null;
};

export const AppShell = ({ children }: PropsWithChildren) => {
  const content = useIntlayer("app-shell");
  const queryClient = useQueryClient();
  const navigate = useLocalizedNavigate();
  const [signOutError, setSignOutError] = useState<string | null>(null);
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const pathWithoutLocale = getPathWithoutLocale(pathname);
  const navigationItems = [
    { label: content.dashboardLabel, to: "/dashboard" },
    { label: content.contactsLabel, to: "/contacts" },
  ] as const;
  const accountSessionQuery = useQuery({
    ...accountMeQueryOptions,
  });
  const signOutMutation = useMutation({
    mutationFn: async () => {
      const response = await authClient.signOut();

      if (response.error) {
        throw new Error(
          readErrorMessage(response.error) ?? SIGN_OUT_ERROR_FALLBACK_MESSAGE
        );
      }
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: accountMeQueryKey });
    },
  });

  const accountName =
    accountSessionQuery.data?.user.name?.trim() ||
    accountSessionQuery.data?.user.email ||
    null;

  const accountEmail = accountSessionQuery.data?.user.email ?? null;

  const handleSignOut = async (): Promise<void> => {
    setSignOutError(null);

    try {
      await signOutMutation.mutateAsync();
      await navigate("/sign-in");
    } catch (error) {
      setSignOutError(
        readErrorMessage(error) ?? content.signOutErrorLabel.value
      );
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
            {accountSessionQuery.data ? (
              <section className="space-y-3 rounded-xl border bg-background/80 p-3">
                <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                  {content.accountLabel}
                </p>
                <div className="space-y-1">
                  <p className="font-medium text-sm">{accountName}</p>
                  {accountEmail && accountEmail !== accountName ? (
                    <p className="text-muted-foreground text-xs">
                      {accountEmail}
                    </p>
                  ) : null}
                </div>
                <Button
                  className="w-full"
                  disabled={signOutMutation.isPending}
                  onClick={handleSignOut}
                  type="button"
                  variant="outline"
                >
                  {signOutMutation.isPending
                    ? content.signingOutLabel
                    : content.signOutLabel}
                </Button>
                {signOutError ? (
                  <p className="text-destructive text-sm" role="alert">
                    {signOutError}
                  </p>
                ) : null}
              </section>
            ) : null}
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
