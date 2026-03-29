"use client";

import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputAsInput = InputHTMLAttributes<HTMLInputElement> & {
  as?: "input";
  error?: string;
  label?: string;
};

type InputAsTextarea = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  as: "textarea";
  error?: string;
  label?: string;
};

type InputProps = InputAsInput | InputAsTextarea;

const baseStyles = cn(
  "w-full bg-surface-lowest border border-border rounded-md px-4 py-3",
  "text-text-primary placeholder:text-text-secondary/50",
  "focus:border-primary focus:shadow-[0_0_8px_rgba(153,247,255,0.15)] focus:outline-none",
  "transition-all"
);

export default function Input(props: InputProps) {
  const { as = "input", error, label, className, ...rest } = props;

  const fieldClasses = cn(baseStyles, error && "border-tertiary", className);

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}
      {as === "textarea" ? (
        <textarea
          className={fieldClasses}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={fieldClasses}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <p className="text-tertiary text-sm mt-1">{error}</p>}
    </div>
  );
}
