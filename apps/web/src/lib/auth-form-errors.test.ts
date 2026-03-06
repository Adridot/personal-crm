import { describe, expect, it } from "vitest";

import {
  AUTH_FORM_ERROR_CODES,
  getVisibleFieldError,
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
});
