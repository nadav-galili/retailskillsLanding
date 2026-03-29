"use client";

import { cn } from "@/lib/utils";

type ChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function Chip({
  label,
  selected = false,
  onClick,
  disabled = false,
  className,
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-3 py-1.5 text-sm rounded-lg transition-colors whitespace-nowrap",
        selected
          ? "bg-secondary/20 text-secondary"
          : "bg-surface-card text-text-secondary hover:text-text-primary",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {label}
    </button>
  );
}
