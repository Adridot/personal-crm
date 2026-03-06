import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Label } from "./label";

const fieldVariants = cva(
  "group/field flex w-full gap-2 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        horizontal: "flex-row items-start gap-3",
        responsive:
          "flex-col @md/field-group:flex-row @md/field-group:items-start",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
);

export const FieldGroup = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn("group/field-group flex w-full flex-col gap-5", className)}
    data-slot="field-group"
    {...props}
  />
);

export const Field = ({
  className,
  orientation = "vertical",
  ...props
}: ComponentProps<"fieldset"> & VariantProps<typeof fieldVariants>) => (
  <fieldset
    className={cn(fieldVariants({ orientation }), className)}
    data-orientation={orientation}
    data-slot="field"
    {...props}
  />
);

export const FieldLabel = ({
  className,
  ...props
}: ComponentProps<typeof Label>) => (
  <Label
    className={cn(
      "w-fit leading-snug group-data-[disabled=true]/field:opacity-50",
      className
    )}
    data-slot="field-label"
    {...props}
  />
);

export const FieldDescription = ({
  className,
  ...props
}: ComponentProps<"p">) => (
  <p
    className={cn("text-muted-foreground text-sm leading-normal", className)}
    data-slot="field-description"
    {...props}
  />
);

const getFieldErrorContent = (
  children: ReactNode,
  errors?: Array<{ message?: string } | undefined>
): ReactNode => {
  if (children) {
    return children;
  }

  const uniqueMessages = [...new Set(errors?.flatMap((error) => error?.message))]
    .filter((message): message is string => typeof message === "string");

  if (uniqueMessages.length === 0) {
    return null;
  }

  if (uniqueMessages.length === 1) {
    return uniqueMessages[0];
  }

  return (
    <ul className="ml-4 flex list-disc flex-col gap-1">
      {uniqueMessages.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
};

export const FieldError = ({
  children,
  className,
  errors,
  ...props
}: ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) => {
  const content = getFieldErrorContent(children, errors);

  if (!content) {
    return null;
  }

  return (
    <div
      className={cn("text-destructive text-sm leading-normal", className)}
      data-slot="field-error"
      role="alert"
      {...props}
    >
      {content}
    </div>
  );
};
