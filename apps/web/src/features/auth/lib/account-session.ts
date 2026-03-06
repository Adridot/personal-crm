import { type QueryClient, queryOptions } from "@tanstack/react-query";
import { z } from "zod";

import { authClient } from "@/features/auth/lib/auth-client";

const accountSessionSchema = z.object({
  expiresAt: z
    .union([z.date(), z.string()])
    .transform((value) =>
      value instanceof Date ? value.toISOString() : value
    ),
  id: z.string(),
});

const accountUserSchema = z.object({
  email: z.string().email(),
  emailVerified: z.boolean(),
  id: z.string(),
  image: z
    .string()
    .nullish()
    .transform((value) => value ?? null),
  name: z
    .string()
    .nullish()
    .transform((value) => value ?? null),
});

const accountMeResponseSchema = z.object({
  session: accountSessionSchema,
  user: accountUserSchema,
});

export type AccountMeResponse = z.infer<typeof accountMeResponseSchema>;

export const accountMeQueryKey = ["account", "me"] as const;

const SESSION_ERROR_STATUSES = [401, 403] as const;

export class SessionRequestError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "SessionRequestError";
    this.status = status;
  }
}

const toSessionRequestError = (
  status: number,
  message?: string
): SessionRequestError => {
  if (
    SESSION_ERROR_STATUSES.includes(
      status as (typeof SESSION_ERROR_STATUSES)[number]
    )
  ) {
    return new SessionRequestError(
      message ?? "The current user is not authenticated.",
      status
    );
  }

  return new SessionRequestError(
    message ?? "Failed to resolve the current account session.",
    status
  );
};

const parseAccountMeResponse = (input: unknown): AccountMeResponse => {
  const parsed = accountMeResponseSchema.safeParse(input);

  if (!parsed.success) {
    throw new SessionRequestError("Malformed account session payload.", 500);
  }

  return parsed.data;
};

export const fetchAccountSession = async (): Promise<AccountMeResponse> => {
  const response = await authClient.getSession();

  if (response.error) {
    throw toSessionRequestError(
      response.error.status ?? 500,
      response.error.message
    );
  }

  if (!response.data) {
    throw toSessionRequestError(401);
  }

  return parseAccountMeResponse(response.data);
};

export const accountMeQueryOptions = queryOptions({
  queryFn: fetchAccountSession,
  queryKey: accountMeQueryKey,
  retry: false,
  staleTime: 60_000,
});

export const fetchFreshAccountSession = (
  queryClient: QueryClient
): Promise<AccountMeResponse> =>
  queryClient.fetchQuery({
    ...accountMeQueryOptions,
    staleTime: 0,
  });

export const isSessionRequestError = (
  value: unknown
): value is SessionRequestError => value instanceof SessionRequestError;

export const isUnauthorizedSessionError = (value: unknown): boolean =>
  isSessionRequestError(value) &&
  SESSION_ERROR_STATUSES.includes(
    value.status as (typeof SESSION_ERROR_STATUSES)[number]
  );
