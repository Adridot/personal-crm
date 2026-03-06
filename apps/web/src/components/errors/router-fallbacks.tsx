import type { ErrorComponentProps } from "@tanstack/react-router";
import { AlertTriangle, LoaderCircle, SearchX } from "lucide-react";
import { useIntlayer } from "react-intlayer";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocalizedNavigate } from "@/i18n/use-localized-navigate";

const FALLBACK_WRAPPER_CLASS =
  "flex min-h-[40vh] w-full items-center justify-center px-4 py-8";

const getErrorMessage = (error: unknown, fallbackMessage: string): string => {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  if (typeof error === "string" && error.trim().length > 0) {
    return error;
  }

  return fallbackMessage;
};

export const RouterPendingFallback = () => {
  const content = useIntlayer("router-fallbacks");

  return (
    <div aria-live="polite" className={FALLBACK_WRAPPER_CLASS}>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <div className="inline-flex size-10 items-center justify-center rounded-full border">
            <LoaderCircle aria-hidden className="size-5 animate-spin" />
          </div>
          <CardTitle>{content.loadingTitle.value}</CardTitle>
          <CardDescription>{content.loadingDescription.value}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export const RouterNotFoundFallback = () => {
  const content = useIntlayer("router-fallbacks");
  const navigate = useLocalizedNavigate();

  return (
    <div className={FALLBACK_WRAPPER_CLASS}>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <div className="inline-flex size-10 items-center justify-center rounded-full border">
            <SearchX aria-hidden className="size-5" />
          </div>
          <CardTitle>{content.notFoundTitle.value}</CardTitle>
          <CardDescription>{content.notFoundDescription.value}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            onClick={async () => {
              await navigate("/");
            }}
            type="button"
          >
            {content.goHomeLabel.value}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export const RouterErrorFallback = ({ error, reset }: ErrorComponentProps) => {
  const content = useIntlayer("router-fallbacks");
  const navigate = useLocalizedNavigate();

  return (
    <div className={FALLBACK_WRAPPER_CLASS}>
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-3">
          <div className="inline-flex size-10 items-center justify-center rounded-full border">
            <AlertTriangle aria-hidden className="size-5 text-destructive" />
          </div>
          <CardTitle>{content.errorTitle.value}</CardTitle>
          <CardDescription>{content.errorDescription.value}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="rounded-md border bg-muted/50 px-3 py-2 font-mono text-sm">
            {getErrorMessage(error, content.unexpectedErrorMessage.value)}
          </p>
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button onClick={reset} type="button" variant="default">
            {content.retryLabel.value}
          </Button>
          <Button
            onClick={async () => {
              await navigate("/");
            }}
            type="button"
            variant="outline"
          >
            {content.goHomeLabel.value}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
