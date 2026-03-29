"use client";

import { scenarios } from "@/lib/seed-data";

interface ScenarioButtonsProps {
  onSelect: (message: string) => void;
  disabled: boolean;
}

export default function ScenarioButtons({
  onSelect,
  disabled,
}: ScenarioButtonsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 px-4">
      {scenarios.map((scenario) => (
        <button
          key={scenario.label}
          onClick={() => onSelect(scenario.message)}
          disabled={disabled}
          className="whitespace-nowrap bg-surface-card border border-border rounded-full px-4 py-2 text-sm text-text-primary hover:border-accent/50 transition-colors disabled:opacity-50"
        >
          {scenario.label}
        </button>
      ))}
    </div>
  );
}
