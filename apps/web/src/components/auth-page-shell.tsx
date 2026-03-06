import type { PropsWithChildren, ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthPageShellProps {
  description: ReactNode;
  footer?: ReactNode;
  title: ReactNode;
}

export const AuthPageShell = ({
  children,
  description,
  footer,
  title,
}: PropsWithChildren<AuthPageShellProps>) => (
  <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
        {footer ? <div className="mt-5">{footer}</div> : null}
      </CardContent>
    </Card>
  </div>
);
