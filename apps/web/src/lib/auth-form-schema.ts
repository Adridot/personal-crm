import { z } from "zod";

export const userDisplayNameInputSchema = z.string().trim().min(2);

export const userEmailInputSchema = z.string().trim().email();

export const userPasswordInputSchema = z.string().min(8);

export const signInFormSchema = z.object({
  email: userEmailInputSchema,
  password: userPasswordInputSchema,
});

export const signUpFormSchema = z.object({
  email: userEmailInputSchema,
  name: userDisplayNameInputSchema,
  password: userPasswordInputSchema,
  passwordConfirmation: userPasswordInputSchema,
});

export type SignInFormInput = z.input<typeof signInFormSchema>;

export type SignUpFormInput = z.input<typeof signUpFormSchema>;

export type AuthFormFieldName = keyof SignUpFormInput;
