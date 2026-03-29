"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface FeatureCalloutProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  scrollProgress: MotionValue<number>;
  progressRange: [number, number];
  className?: string;
}

export default function FeatureCallout({
  icon,
  title,
  description,
  scrollProgress,
  progressRange,
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
      <div className="mb-3 text-primary">{icon}</div>
      <h3 className="text-sm font-semibold text-primary mb-1">{title}</h3>
      <p className="text-xs leading-relaxed text-text-secondary">
        {description}
      </p>
    </motion.div>
  );
}
