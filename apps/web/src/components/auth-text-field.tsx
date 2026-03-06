import type { AnyFieldApi } from "@tanstack/react-form";
import type { ReactNode } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
}: AuthTextFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor={field.name}>{label}</Label>
    <Input
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
    {field.state.meta.isTouched && errorMessage ? (
      <p className="text-destructive text-sm" role="alert">
        {errorMessage}
      </p>
    ) : null}
  </div>
);
