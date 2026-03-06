import { describe, expect, it } from "vitest";

import {
  AUTH_FORM_ERROR_CODES,
  getAuthFormErrorMessage,
  getVisibleFieldError,
  getVisibleFormError,
  normalizeSignInAuthError,
  validateEmailField,
  validateSignUpForm,
} from "./auth-form-errors";

describe("auth-form-errors", () => {
  it("maps blank email values to the required code", () => {
    expect(validateEmailField({ value: "   " })).toEqual({
      code: AUTH_FORM_ERROR_CODES.required,
      field: "email",
      source: "validation",
    });
  });

  it("maps mismatched sign-up passwords to passwordConfirmation", () => {
    expect(
      validateSignUpForm({
        value: {
          email: "person@example.com",
          name: "Ada",
          password: "password-1",
          passwordConfirmation: "password-2",
        },
      })
    ).toEqual({
      fields: {
        passwordConfirmation: {
          code: AUTH_FORM_ERROR_CODES.passwordMismatch,
          field: "passwordConfirmation",
          source: "validation",
        },
      },
    });
  });

  it("normalizes unauthorized sign-in responses into invalid credentials", () => {
    expect(
      normalizeSignInAuthError({
        message: "Invalid email or password.",
        status: 401,
      })
    ).toEqual({
      code: AUTH_FORM_ERROR_CODES.invalidCredentials,
      fallbackMessage: undefined,
      source: "auth",
    });
  });

  it("prioritizes onBlur field errors over submit errors", () => {
    expect(
      getVisibleFieldError({
        onBlur: {
          code: AUTH_FORM_ERROR_CODES.invalidEmail,
          field: "email",
          source: "validation",
        },
        onSubmit: {
          code: AUTH_FORM_ERROR_CODES.required,
          field: "email",
          source: "validation",
        },
      })
    ).toEqual({
      code: AUTH_FORM_ERROR_CODES.invalidEmail,
      field: "email",
      source: "validation",
    });
  });

  it("prioritizes dynamic field errors over blur errors", () => {
    expect(
      getVisibleFieldError({
        onBlur: {
          code: AUTH_FORM_ERROR_CODES.required,
          field: "passwordConfirmation",
          source: "validation",
        },
        onDynamic: {
          code: AUTH_FORM_ERROR_CODES.passwordMismatch,
          field: "passwordConfirmation",
          source: "validation",
        },
      })
    ).toEqual({
      code: AUTH_FORM_ERROR_CODES.passwordMismatch,
      field: "passwordConfirmation",
      source: "validation",
    });
  });

  it("prioritizes server form errors over dynamic errors", () => {
    expect(
      getVisibleFormError({
        onDynamic: {
          code: AUTH_FORM_ERROR_CODES.authFailed,
          source: "auth",
        },
        onServer: {
          code: AUTH_FORM_ERROR_CODES.invalidCredentials,
          source: "auth",
        },
      })
    ).toEqual({
      code: AUTH_FORM_ERROR_CODES.invalidCredentials,
      source: "auth",
    });
  });

  it("falls back to the Better Auth message when no localized mapping exists", () => {
    expect(
      getAuthFormErrorMessage(
        {
          code: AUTH_FORM_ERROR_CODES.authFailed,
          fallbackMessage: "Email address is already registered.",
          source: "auth",
        },
        {},
        "Something went wrong."
      )
    ).toBe("Email address is already registered.");
  });
});
