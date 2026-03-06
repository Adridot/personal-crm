import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";

import { Button } from "@/components/ui/button";
import { AuthPageShell } from "@/features/auth/components/auth-page-shell";
import { AuthTextField } from "@/features/auth/components/auth-text-field";
import { accountMeQueryKey } from "@/features/auth/lib/account-session";
import { authClient } from "@/features/auth/lib/auth-client";
import {
  AUTH_FORM_ERROR_CODES,
  getAuthFormErrorMessage,
  getVisibleFieldError,
  getVisibleFormError,
  normalizeSignUpAuthError,
  validateEmailField,
  validateNameField,
  validatePasswordConfirmationField,
  validatePasswordField,
  validateSignUpForm,
} from "@/features/auth/lib/auth-form-errors";
import {
  type AuthRedirectPath,
  parseAuthRedirectPath,
  resolveAuthRedirectPath,
} from "@/features/auth/lib/auth-redirect";
import { LocalizedLink } from "@/i18n/localized-link";
import { useLocalizedNavigate } from "@/i18n/use-localized-navigate";

interface SignUpSearch {
  redirect?: AuthRedirectPath;
}

export const Route = createFileRoute("/{-$locale}/_guest/sign-up")({
  validateSearch: (search): SignUpSearch => ({
    redirect: parseAuthRedirectPath(search.redirect),
  }),
  component: SignUpRouteComponent,
});

function SignUpRouteComponent() {
  const content = useIntlayer("sign-up-page");
  const navigate = useLocalizedNavigate();
  const queryClient = useQueryClient();
  const search = Route.useSearch();
  const defaultErrorMessage = content.unknownErrorMessage.value;
  const errorMessages = {
    [AUTH_FORM_ERROR_CODES.authFailed]: content.unknownErrorMessage.value,
    [AUTH_FORM_ERROR_CODES.invalidEmail]: content.invalidEmailMessage.value,
    [AUTH_FORM_ERROR_CODES.nameTooShort]: content.nameTooShortMessage.value,
    [AUTH_FORM_ERROR_CODES.passwordMismatch]:
      content.passwordMismatchMessage.value,
    [AUTH_FORM_ERROR_CODES.passwordTooShort]:
      content.passwordTooShortMessage.value,
    [AUTH_FORM_ERROR_CODES.required]: content.requiredMessage.value,
  };

  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    },
    validationLogic: revalidateLogic(),
    listeners: {
      onChange: ({ formApi }) => {
        formApi.setErrorMap({ onSubmit: undefined });
      },
    },
    validators: {
      onDynamic: validateSignUpForm,
    },
    onSubmit: async ({ formApi, value }) => {
      formApi.setErrorMap({ onSubmit: undefined });

      await authClient.signUp.email(
        {
          email: value.email,
          name: value.name,
          password: value.password,
        },
        {
          onError: ({ error }) => {
            formApi.setErrorMap({
              onSubmit: {
                fields: {},
                form: normalizeSignUpAuthError(error),
              },
            });
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
    <AuthPageShell
      description={content.description}
      footer={
        <p className="text-muted-foreground text-sm">
          {content.signInPrompt}{" "}
          <LocalizedLink
            className="text-primary hover:underline"
            search={search.redirect ? { redirect: search.redirect } : undefined}
            to="/sign-in"
          >
            {content.signInLinkLabel}
          </LocalizedLink>
        </p>
      }
      title={content.title}
    >
      <form
        className="space-y-5"
        onSubmit={async (event) => {
          event.preventDefault();
          event.stopPropagation();
          await form.handleSubmit();
        }}
      >
        <form.Field
          disableErrorFlat
          name="name"
          validators={{
            onBlur: validateNameField,
          }}
        >
          {(field) => {
            const fieldError = getVisibleFieldError(field.state.meta.errorMap);

            return (
              <AuthTextField
                autoComplete="name"
                errorMessage={
                  fieldError
                    ? getAuthFormErrorMessage(
                        fieldError,
                        errorMessages,
                        defaultErrorMessage
                      )
                    : undefined
                }
                field={field}
                label={content.nameLabel}
                placeholder={content.namePlaceholder.value}
                type="text"
              />
            );
          }}
        </form.Field>

        <form.Field
          disableErrorFlat
          name="email"
          validators={{
            onBlur: validateEmailField,
          }}
        >
          {(field) => {
            const fieldError = getVisibleFieldError(field.state.meta.errorMap);

            return (
              <AuthTextField
                autoComplete="email"
                errorMessage={
                  fieldError
                    ? getAuthFormErrorMessage(
                        fieldError,
                        errorMessages,
                        defaultErrorMessage
                      )
                    : undefined
                }
                field={field}
                label={content.emailLabel}
                placeholder={content.emailPlaceholder.value}
                type="email"
              />
            );
          }}
        </form.Field>

        <form.Field
          disableErrorFlat
          name="password"
          validators={{
            onBlur: validatePasswordField,
          }}
        >
          {(field) => {
            const fieldError = getVisibleFieldError(field.state.meta.errorMap);

            return (
              <AuthTextField
                autoComplete="new-password"
                errorMessage={
                  fieldError
                    ? getAuthFormErrorMessage(
                        fieldError,
                        errorMessages,
                        defaultErrorMessage
                      )
                    : undefined
                }
                field={field}
                label={content.passwordLabel}
                placeholder={content.passwordPlaceholder.value}
                type="password"
              />
            );
          }}
        </form.Field>

        <form.Field
          disableErrorFlat
          name="passwordConfirmation"
          validators={{
            onBlur: validatePasswordConfirmationField,
          }}
        >
          {(field) => {
            const fieldError = getVisibleFieldError(field.state.meta.errorMap);

            return (
              <AuthTextField
                autoComplete="new-password"
                errorMessage={
                  fieldError
                    ? getAuthFormErrorMessage(
                        fieldError,
                        errorMessages,
                        defaultErrorMessage
                      )
                    : undefined
                }
                field={field}
                label={content.passwordConfirmationLabel}
                placeholder={content.passwordConfirmationPlaceholder.value}
                type="password"
              />
            );
          }}
        </form.Field>

        <form.Subscribe
          selector={(state) => getVisibleFormError(state.errorMap)}
        >
          {(formError) =>
            formError ? (
              <p className="text-destructive text-sm" role="alert">
                {getAuthFormErrorMessage(
                  formError,
                  errorMessages,
                  defaultErrorMessage
                )}
              </p>
            ) : null
          }
        </form.Subscribe>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button className="w-full" disabled={!canSubmit} type="submit">
              {isSubmitting ? content.submittingLabel : content.submitLabel}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </AuthPageShell>
  );
}
