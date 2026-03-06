import type { AnyFieldApi } from "@tanstack/react-form";
import type { ReactNode } from "react";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface AuthTextFieldProps {
  autoComplete?: string;
  errorMessage?: string;
  field: AnyFieldApi;
  label: ReactNode;
  placeholder?: string;
  type: "email" | "password" | "text";
}

export const AuthTextField = ({
  autoComplete,
  errorMessage,
  field,
  label,
  placeholder,
  type,
}: AuthTextFieldProps) => {
  const errorId = `${field.name}-error`;

  return (
    <Field className="gap-2" data-invalid={errorMessage ? true : undefined}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        aria-describedby={errorMessage ? errorId : undefined}
        aria-invalid={errorMessage ? true : undefined}
        autoComplete={autoComplete}
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(event) => {
          field.handleChange(event.target.value);
        }}
        placeholder={placeholder}
        type={type}
        value={typeof field.state.value === "string" ? field.state.value : ""}
      />
      <FieldError id={errorId}>{errorMessage}</FieldError>
    </Field>
  );
};
