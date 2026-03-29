import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
};

export default function Card({ children, className, interactive = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface-card rounded-xl p-8",
        interactive && [
          "transition-all duration-200",
          "hover:bg-surface-highest",
          "hover:shadow-[0_0_32px_rgba(153,247,255,0.08)]",
          "border border-transparent hover:border-primary-dark",
        ],
        className
      )}
    >
      {children}
    </div>
  );
}
