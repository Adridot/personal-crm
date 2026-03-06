import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, isRedirect, redirect } from "@tanstack/react-router";
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
import {
  accountMeQueryKey,
  accountMeQueryOptions,
  isUnauthorizedSessionError,
} from "@/lib/account-session";
import { authClient } from "@/lib/auth-client";
import { signInFormSchema } from "@/lib/auth-form-schema";
import {
  type AuthRedirectPath,
  parseAuthRedirectPath,
  resolveAuthRedirectPath,
} from "@/lib/auth-redirect";
import type { FileRouteTypes } from "@/routeTree.gen";

interface SignInSearch {
  redirect?: AuthRedirectPath;
}

interface ErrorLike {
  message?: string;
  status?: number;
}

const readValidationMessage = (value: unknown): string | null => {
  if (typeof value === "string" && value.length > 0) {
    return value;
  }

  if (value instanceof Error && value.message.length > 0) {
    return value.message;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof value.message === "string" &&
    value.message.length > 0
  ) {
    return value.message;
  }

  if (Array.isArray(value)) {
    for (const entry of value) {
      const message = readValidationMessage(entry);

      if (message) {
        return message;
      }
    }
  }

  return null;
};

const getFieldError = (errors: unknown[]): string | null => {
  for (const error of errors) {
    const message = readValidationMessage(error);

    if (message) {
      return message;
    }
  }

  return null;
};

const readErrorLike = (value: unknown): ErrorLike => {
  if (typeof value !== "object" || value === null) {
    return {};
  }

  const candidate = value as Record<string, unknown>;

  return {
    message:
      typeof candidate.message === "string" ? candidate.message : undefined,
    status: typeof candidate.status === "number" ? candidate.status : undefined,
  };
};

export const Route = createFileRoute("/{-$locale}/sign-in")({
  validateSearch: (search): SignInSearch => ({
    redirect: parseAuthRedirectPath(search.redirect),
  }),
  beforeLoad: async ({ context, params, search }) => {
    try {
      await context.queryClient.ensureQueryData(accountMeQueryOptions);

      const redirectPath = resolveAuthRedirectPath(search.redirect);

      throw redirect({
        params: { locale: params.locale },
        to: `/{-$locale}${redirectPath}` as FileRouteTypes["to"],
      });
    } catch (error) {
      if (isRedirect(error)) {
        throw error;
      }

      if (isUnauthorizedSessionError(error)) {
        return;
      }

      throw error;
    }
  },
  component: SignInRouteComponent,
});

function SignInRouteComponent() {
  const content = useIntlayer("sign-in-page");
  const navigate = useLocalizedNavigate();
  const queryClient = useQueryClient();
  const search = Route.useSearch();
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: signInFormSchema,
    },
    onSubmit: async ({ value }) => {
      setAuthError(null);

      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onError: (context) => {
            const error = readErrorLike(context.error);

            if (error.status === 401) {
              setAuthError(content.invalidCredentialsMessage.value);
              return;
            }

            setAuthError(error.message ?? content.unknownErrorMessage.value);
          },
          onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: accountMeQueryKey,
            });
            await navigate(resolveAuthRedirectPath(search.redirect));
          },
        }
      );
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle>{content.title}</CardTitle>
          <CardDescription>{content.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-5"
            onSubmit={async (event) => {
              event.preventDefault();
              event.stopPropagation();
              await form.handleSubmit();
            }}
          >
            <form.Field
              name="email"
              validators={{
                onBlur: signInFormSchema.shape.email,
              }}
            >
              {(field) => {
                const fieldError = getFieldError(field.state.meta.errors);

                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>{content.emailLabel}</Label>
                    <Input
                      autoComplete="email"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        field.handleChange(event.target.value);
                      }}
                      placeholder={content.emailPlaceholder.value}
                      type="email"
                      value={field.state.value}
                    />
                    {field.state.meta.isTouched && fieldError ? (
                      <p className="text-destructive text-sm">{fieldError}</p>
                    ) : null}
                  </div>
                );
              }}
            </form.Field>

            <form.Field
              name="password"
              validators={{
                onBlur: signInFormSchema.shape.password,
              }}
            >
              {(field) => {
                const fieldError = getFieldError(field.state.meta.errors);

                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>{content.passwordLabel}</Label>
                    <Input
                      autoComplete="current-password"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        field.handleChange(event.target.value);
                      }}
                      placeholder={content.passwordPlaceholder.value}
                      type="password"
                      value={field.state.value}
                    />
                    {field.state.meta.isTouched && fieldError ? (
                      <p className="text-destructive text-sm">{fieldError}</p>
                    ) : null}
                  </div>
                );
              }}
            </form.Field>

            {authError ? (
              <p className="text-destructive text-sm">{authError}</p>
            ) : null}

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button className="w-full" disabled={!canSubmit} type="submit">
                  {isSubmitting ? content.submittingLabel : content.submitLabel}
                </Button>
              )}
            </form.Subscribe>

            <p className="text-muted-foreground text-sm">
              {content.signUpPrompt}{" "}
              <LocalizedLink
                className="text-primary hover:underline"
                search={
                  search.redirect ? { redirect: search.redirect } : undefined
                }
                to="/sign-up"
              >
                {content.signUpLinkLabel}
              </LocalizedLink>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
