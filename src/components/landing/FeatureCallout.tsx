"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface FeatureCalloutProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  scrollProgress: MotionValue<number>;
  progressRange: [number, number];
  accent?: "primary" | "secondary" | "tertiary";
  className?: string;
}

const accentMap = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
};

export default function FeatureCallout({
  icon,
  title,
  description,
  scrollProgress,
  progressRange,
  accent = "primary",
  className,
}: FeatureCalloutProps) {
  const opacity = useTransform(scrollProgress, progressRange, [0, 1]);
  const y = useTransform(scrollProgress, progressRange, [20, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className={cn(
        "w-[220px] bg-surface/70 backdrop-blur-[16px] rounded-xl p-5",
        "border border-border",
        "neon-glow",
        "text-start",
        className
      )}
    >
      <div className={cn("mb-3", accentMap[accent])}>{icon}</div>
      <h3 className={cn("text-sm font-semibold mb-1", accentMap[accent])}>{title}</h3>
      <p className="text-xs leading-relaxed text-text-secondary">
        {description}
      </p>
    </motion.div>
  );
}
