import { useForm } from "@tanstack/react-form";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useIntlayer } from "react-intlayer";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LocalizedLink } from "@/i18n/localized-link";
import { useLocalizedNavigate } from "@/i18n/use-localized-navigate";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import {
  getLocalizedAppPath,
  getSafeRedirectPath,
  getSessionOrNull,
  validateAuthRedirectSearch,
} from "@/lib/auth-session";

export const Route = createFileRoute("/{-$locale}/sign-in")({
  validateSearch: validateAuthRedirectSearch,
  beforeLoad: async ({ params, search }) => {
    const session = await getSessionOrNull();

    if (session) {
      throw redirect({
        href:
          getSafeRedirectPath(search.redirect) ??
          getLocalizedAppPath("/dashboard", params.locale),
        replace: true,
      });
    }
  },
  component: SignInRouteComponent,
});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SignInRouteComponent() {
  const content = useIntlayer("sign-in-page");
  const navigate = useNavigate();
  const localizedNavigate = useLocalizedNavigate();
  const search = Route.useSearch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const redirectTarget = getSafeRedirectPath(search.redirect);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);

      try {
        const response = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        });

        if (response.error) {
          setErrorMessage(
            getAuthErrorMessage(response.error, content.errorFallback.value)
          );
          return;
        }

        if (redirectTarget) {
          await navigate({
            href: redirectTarget,
            replace: true,
          });
          return;
        }

        await localizedNavigate({
          replace: true,
          to: "/dashboard",
        });
      } catch (error) {
        setErrorMessage(
          getAuthErrorMessage(error, content.errorFallback.value)
        );
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">{content.title}</CardTitle>
          <CardDescription>{content.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-5"
            onSubmit={async (event) => {
              event.preventDefault();
              event.stopPropagation();
              await form.handleSubmit();
            }}
          >
            <form.Field
              name="email"
              validators={{
                onBlur: ({ value }) => {
                  if (value.trim().length === 0) {
                    return content.emailRequiredError.value;
                  }

                  if (!EMAIL_PATTERN.test(value)) {
                    return content.emailInvalidError.value;
                  }

                  return undefined;
                },
              }}
            >
              {(field) => {
                const fieldError =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0
                    ? field.state.meta.errors.join(", ")
                    : null;

                return (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>{content.emailLabel}</Label>
                    <Input
                      aria-invalid={fieldError ? true : undefined}
                      autoComplete="email"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        field.handleChange(event.target.value);
                        if (errorMessage) {
                          setErrorMessage(null);
                        }
                      }}
                      required
                      type="email"
                      value={field.state.value}
                    />
                    {fieldError ? (
                      <p className="text-destructive text-sm" role="alert">
                        {fieldError}
                      </p>
                    ) : null}
                  </div>
                );
              }}
            </form.Field>
            <form.Field
              name="password"
              validators={{
                onBlur: ({ value }) =>
                  value.trim().length === 0
                    ? content.passwordRequiredError.value
                    : undefined,
              }}
            >
              {(field) => {
                const fieldError =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0
                    ? field.state.meta.errors.join(", ")
                    : null;

                return (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>{content.passwordLabel}</Label>
                    <Input
                      aria-invalid={fieldError ? true : undefined}
                      autoComplete="current-password"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        field.handleChange(event.target.value);
                        if (errorMessage) {
                          setErrorMessage(null);
                        }
                      }}
                      required
                      type="password"
                      value={field.state.value}
                    />
                    {fieldError ? (
                      <p className="text-destructive text-sm" role="alert">
                        {fieldError}
                      </p>
                    ) : null}
                  </div>
                );
              }}
            </form.Field>
            {errorMessage ? (
              <p className="text-destructive text-sm" role="alert">
                {errorMessage}
              </p>
            ) : null}
            <form.Subscribe<boolean> selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting
                    ? content.submitPendingLabel
                    : content.submitLabel}
                </Button>
              )}
            </form.Subscribe>
          </form>
          <p className="mt-6 text-muted-foreground text-sm">
            {content.noAccountPrompt}{" "}
            <LocalizedLink
              className="font-medium text-foreground underline-offset-4 hover:underline"
              search={redirectTarget ? { redirect: redirectTarget } : undefined}
              to="/sign-up"
            >
              {content.noAccountAction}
            </LocalizedLink>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
