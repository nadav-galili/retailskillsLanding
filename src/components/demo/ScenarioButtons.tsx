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
          className="whitespace-nowrap bg-surface-card rounded-lg px-4 py-2 text-sm text-text-secondary hover:text-secondary hover:bg-secondary/5 transition-colors disabled:opacity-50"
        >
          {scenario.label}
        </button>
      ))}
    </div>
  );
}
