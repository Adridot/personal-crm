import { z } from "zod";

const userDisplayNameInputSchema = z.string().trim().min(2);

const userEmailInputSchema = z.string().trim().email();

const userPasswordInputSchema = z.string().min(8);

export const signInFormSchema = z.object({
  email: userEmailInputSchema,
  password: userPasswordInputSchema,
});

export const signUpFormSchema = z
  .object({
    email: userEmailInputSchema,
    name: userDisplayNameInputSchema,
    password: userPasswordInputSchema,
    passwordConfirmation: userPasswordInputSchema,
  })
  .refine((value) => value.password === value.passwordConfirmation, {
    message: "Passwords do not match.",
    path: ["passwordConfirmation"],
  });

export type SignInFormInput = z.input<typeof signInFormSchema>;

export type SignUpFormInput = z.input<typeof signUpFormSchema>;
