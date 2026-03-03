import { Link, useRouterState } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";

import { shellCopy } from "@/copy/shell-copy";
import { cn } from "@/lib/utils";

export const AppShell = ({ children }: PropsWithChildren) => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <aside className="w-full shrink-0 lg:w-72">
          <div className="sticky top-6 space-y-6 rounded-2xl border bg-card p-5 shadow-sm">
            <div className="space-y-2">
              <p className="font-medium text-muted-foreground text-sm">
                {shellCopy.appShell.productName}
              </p>
              <h1 className="font-semibold text-xl tracking-tight">
                {shellCopy.appShell.title}
              </h1>
              <p className="text-muted-foreground text-sm">
                {shellCopy.appShell.description}
              </p>
            </div>
            <nav aria-label="Primary" className="grid gap-2">
              {shellCopy.appShell.navigation.map((item) => {
                const isActive = pathname.startsWith(item.to);

                return (
                  <Link
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
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>
        <main className="min-w-0 flex-1 rounded-3xl border bg-card/60 p-5 shadow-sm sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
