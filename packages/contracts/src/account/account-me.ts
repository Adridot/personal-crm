import { z } from "zod";

export const accountSessionSummarySchema = z.object({
  expiresAt: z.string(),
  id: z.string(),
});

export const accountUserSummarySchema = z.object({
  email: z.email(),
  emailVerified: z.boolean(),
  id: z.string(),
  image: z.string().nullable(),
  name: z.string().nullable(),
});

export const accountMeResponseSchema = z.object({
  session: accountSessionSummarySchema,
  user: accountUserSummarySchema,
});

export type AccountMeResponse = z.infer<typeof accountMeResponseSchema>;
