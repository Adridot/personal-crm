const FALLBACK_AUTH_ERROR_MESSAGE = "Something went wrong. Please try again.";

export const getAuthErrorMessage = (
  error: unknown,
  fallback = FALLBACK_AUTH_ERROR_MESSAGE
): string => {
  if (typeof error === "object" && error !== null && "message" in error) {
    const { message } = error as { message?: unknown };

    if (typeof message === "string" && message.trim().length > 0) {
      return message;
    }
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return fallback;
};
