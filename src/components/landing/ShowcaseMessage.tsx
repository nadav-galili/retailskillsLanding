"use client";

import { motion, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface ShowcaseMessageProps {
  content: string;
  type: "user" | "bot" | "alert";
  scrollProgress: MotionValue<number>;
  showRange: [number, number];
}

function formatContent(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const formatted = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={j} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });

    return (
      <span key={i}>
        {i > 0 && <br />}
        {formatted}
      </span>
    );
  });
}

export default function ShowcaseMessage({
  content,
  type,
  scrollProgress,
  showRange,
}: ShowcaseMessageProps) {
  const opacity = useTransform(scrollProgress, showRange, [0, 1]);
  const y = useTransform(scrollProgress, showRange, [16, 0]);

  const isUser = type === "user";
  const isAlert = type === "alert";

  return (
    <motion.div
      style={{ opacity, y }}
      className={cn(
        "flex mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
      dir="rtl"
    >
      <div className="max-w-[80%]">
        <div
          className={cn(
            "px-4 py-3 rounded-xl text-sm leading-relaxed",
            isUser && "bg-wa-bubble-user text-text-primary rounded-bl-sm",
            type === "bot" && "bg-surface-card text-text-primary rounded-br-sm",
            isAlert && "bg-tertiary/10 border border-tertiary/20"
          )}
        >
          {formatContent(content)}
        </div>
      </div>
    </motion.div>
  );
}
