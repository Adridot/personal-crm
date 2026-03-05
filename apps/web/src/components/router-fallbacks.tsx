import type { ErrorComponentProps } from "@tanstack/react-router";
import { AlertTriangle, LoaderCircle, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FALLBACK_WRAPPER_CLASS =
  "flex min-h-[40vh] w-full items-center justify-center px-4 py-8";

export const RouterPendingFallback = () => (
  <div aria-live="polite" className={FALLBACK_WRAPPER_CLASS}>
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-3">
        <div className="inline-flex size-10 items-center justify-center rounded-full border">
          <LoaderCircle aria-hidden className="size-5 animate-spin" />
        </div>
        <CardTitle>Loading route...</CardTitle>
        <CardDescription>
          The page is preparing the next screen and data.
        </CardDescription>
      </CardHeader>
    </Card>
  </div>
);

export const RouterNotFoundFallback = () => (
  <div className={FALLBACK_WRAPPER_CLASS}>
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-3">
        <div className="inline-flex size-10 items-center justify-center rounded-full border">
          <SearchX aria-hidden className="size-5" />
        </div>
        <CardTitle>Page not found</CardTitle>
        <CardDescription>
          The route does not exist, or it was moved to a different path.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          onClick={() => {
            window.location.assign("/");
          }}
          type="button"
        >
          Go to home
        </Button>
      </CardFooter>
    </Card>
  </div>
);

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  if (typeof error === "string" && error.trim().length > 0) {
    return error;
  }

  return "An unexpected error happened while rendering this route.";
};

export const RouterErrorFallback = ({ error, reset }: ErrorComponentProps) => (
  <div className={FALLBACK_WRAPPER_CLASS}>
    <Card className="w-full max-w-lg">
      <CardHeader className="space-y-3">
        <div className="inline-flex size-10 items-center justify-center rounded-full border">
          <AlertTriangle aria-hidden className="size-5 text-destructive" />
        </div>
        <CardTitle>Route error</CardTitle>
        <CardDescription>
          The current page crashed before it could finish loading.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="rounded-md border bg-muted/50 px-3 py-2 font-mono text-sm">
          {getErrorMessage(error)}
        </p>
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button onClick={reset} type="button" variant="default">
          Retry
        </Button>
        <Button
          onClick={() => {
            window.location.assign("/");
          }}
          type="button"
          variant="outline"
        >
          Go to home
        </Button>
      </CardFooter>
    </Card>
  </div>
);
