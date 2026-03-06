import type { SignInFormInput, SignUpFormInput } from "./auth-form-schema";
import {
  type AuthFormFieldName,
  userDisplayNameInputSchema,
  userEmailInputSchema,
  userPasswordInputSchema,
} from "./auth-form-schema";

export const AUTH_FORM_ERROR_CODES = {
  authFailed: "auth_failed",
  invalidCredentials: "invalid_credentials",
  invalidEmail: "invalid_email",
  nameTooShort: "name_too_short",
  passwordMismatch: "password_mismatch",
  passwordTooShort: "password_too_short",
  required: "required",
} as const;

export type AuthFormErrorCode =
  (typeof AUTH_FORM_ERROR_CODES)[keyof typeof AUTH_FORM_ERROR_CODES];

export interface AuthFormError {
  code: AuthFormErrorCode;
  fallbackMessage?: string;
  field?: AuthFormFieldName;
  source: "auth" | "validation";
}

interface UnknownAuthFieldErrorMap {
  onBlur?: unknown;
  onChange?: unknown;
  onDynamic?: unknown;
  onServer?: unknown;
  onSubmit?: unknown;
}

interface UnknownAuthFormErrorMap {
  onDynamic?: unknown;
  onServer?: unknown;
  onSubmit?: unknown;
}

interface BetterAuthErrorLike {
  message?: string;
  status?: number;
}

interface FormValidationResult {
  fields: Partial<Record<AuthFormFieldName, AuthFormError>>;
}

export type AuthFormErrorMessages = Partial<Record<AuthFormErrorCode, string>>;

const createValidationError = (
  code: AuthFormErrorCode,
  field: AuthFormFieldName
): AuthFormError => ({
  code,
  field,
  source: "validation",
});

const createAuthError = (
  code: AuthFormErrorCode,
  fallbackMessage?: string
): AuthFormError => ({
  code,
  fallbackMessage,
  source: "auth",
});

const isAuthFormError = (value: unknown): value is AuthFormError => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.code === "string" &&
    (candidate.source === "auth" || candidate.source === "validation")
  );
};

const isBlank = (value: string): boolean => value.trim().length === 0;

const toBetterAuthErrorLike = (value: unknown): BetterAuthErrorLike => {
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

const toFieldValidationError = (
  value: string,
  field: AuthFormFieldName
): AuthFormError | undefined => {
  if (isBlank(value)) {
    return createValidationError(AUTH_FORM_ERROR_CODES.required, field);
  }

  switch (field) {
    case "email": {
      return userEmailInputSchema.safeParse(value).success
        ? undefined
        : createValidationError(AUTH_FORM_ERROR_CODES.invalidEmail, field);
    }
    case "name": {
      return userDisplayNameInputSchema.safeParse(value).success
        ? undefined
        : createValidationError(AUTH_FORM_ERROR_CODES.nameTooShort, field);
    }
    case "password":
    case "passwordConfirmation": {
      return userPasswordInputSchema.safeParse(value).success
        ? undefined
        : createValidationError(AUTH_FORM_ERROR_CODES.passwordTooShort, field);
    }
    default: {
      return undefined;
    }
  }
};

const toValidationResult = (
  fields: Partial<Record<AuthFormFieldName, AuthFormError | undefined>>
): FormValidationResult | undefined => {
  const resolvedFields = Object.fromEntries(
    Object.entries(fields).filter(([, error]) => error !== undefined)
  ) as Partial<Record<AuthFormFieldName, AuthFormError>>;

  return Object.keys(resolvedFields).length > 0
    ? { fields: resolvedFields }
    : undefined;
};

export const validateEmailField = ({
  value,
}: {
  value: string;
}): AuthFormError | undefined => toFieldValidationError(value, "email");

export const validateNameField = ({
  value,
}: {
  value: string;
}): AuthFormError | undefined => toFieldValidationError(value, "name");

export const validatePasswordField = ({
  value,
}: {
  value: string;
}): AuthFormError | undefined => toFieldValidationError(value, "password");

export const validatePasswordConfirmationField = ({
  value,
}: {
  value: string;
}): AuthFormError | undefined =>
  toFieldValidationError(value, "passwordConfirmation");

export const validateSignInForm = ({
  value,
}: {
  value: SignInFormInput;
}): FormValidationResult | undefined =>
  toValidationResult({
    email: validateEmailField({ value: value.email }),
    password: validatePasswordField({ value: value.password }),
  });

export const validateSignUpForm = ({
  value,
}: {
  value: SignUpFormInput;
}): FormValidationResult | undefined => {
  const passwordError = validatePasswordField({ value: value.password });
  const passwordConfirmationError = validatePasswordConfirmationField({
    value: value.passwordConfirmation,
  });

  const fieldErrors: Partial<
    Record<AuthFormFieldName, AuthFormError | undefined>
  > = {
    email: validateEmailField({ value: value.email }),
    name: validateNameField({ value: value.name }),
    password: passwordError,
    passwordConfirmation: passwordConfirmationError,
  };

  if (
    !(passwordError || passwordConfirmationError) &&
    value.password !== value.passwordConfirmation
  ) {
    fieldErrors.passwordConfirmation = createValidationError(
      AUTH_FORM_ERROR_CODES.passwordMismatch,
      "passwordConfirmation"
    );
  }

  return toValidationResult(fieldErrors);
};

export const normalizeSignInAuthError = (value: unknown): AuthFormError => {
  const error = toBetterAuthErrorLike(value);

  if (error.status === 401) {
    return createAuthError(AUTH_FORM_ERROR_CODES.invalidCredentials);
  }

  return createAuthError(AUTH_FORM_ERROR_CODES.authFailed, error.message);
};

export const normalizeSignUpAuthError = (value: unknown): AuthFormError => {
  const error = toBetterAuthErrorLike(value);

  return createAuthError(AUTH_FORM_ERROR_CODES.authFailed, error.message);
};

export const getVisibleFieldError = (
  errorMap: UnknownAuthFieldErrorMap
): AuthFormError | undefined => {
  const resolvedError =
    errorMap.onDynamic ??
    errorMap.onBlur ??
    errorMap.onSubmit ??
    errorMap.onChange ??
    errorMap.onServer;

  return isAuthFormError(resolvedError) ? resolvedError : undefined;
};

export const getVisibleFormError = (
  errorMap: UnknownAuthFormErrorMap
): AuthFormError | undefined => {
  if (isAuthFormError(errorMap.onServer)) {
    return errorMap.onServer;
  }

  if (isAuthFormError(errorMap.onDynamic)) {
    return errorMap.onDynamic;
  }

  return isAuthFormError(errorMap.onSubmit) ? errorMap.onSubmit : undefined;
};

export const getAuthFormErrorMessage = (
  error: AuthFormError | null | undefined,
  messages: AuthFormErrorMessages,
  defaultMessage: string
): string => {
  if (!error) {
    return defaultMessage;
  }

  return messages[error.code] ?? defaultMessage;
};
