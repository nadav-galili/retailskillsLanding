import Image from "next/image";
import { Camera, ChevronRight, Mic, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "lg";
}

const sizeClasses = {
  sm: "w-[280px] md:w-[320px] h-[540px] md:h-[580px]",
  lg: "w-[340px] md:w-[400px] h-[640px] md:h-[720px]",
};

export default function PhoneMockup({
  children,
  className,
  size = "sm",
}: PhoneMockupProps) {
  return (
    <div
      dir="rtl"
      className={cn(
        "relative",
        sizeClasses[size],
        "rounded-[2.5rem] p-[2px]",
        "bg-gradient-to-b from-white/10 to-white/5",
        "neon-glow",
        className
      )}
    >
      {/* Inner bezel */}
      <div className="flex flex-col h-full w-full rounded-[2.4rem] bg-surface-highest overflow-hidden">
        {/* Dynamic island notch */}
        <div className="flex justify-center pt-3 pb-1 bg-surface-highest">
          <div className="w-20 h-5 rounded-xl bg-black" />
        </div>

        {/* WhatsApp header */}
        <div className="flex items-center gap-2 px-3 py-2 bg-wa-header">
          <ChevronRight className="w-5 h-5 text-text-secondary shrink-0" />
          <Image
            src="/images/group-avatar.png"
            alt="Group avatar"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-text-primary truncate">
              מנהלי חנויות — רשת שוק+
            </span>
            <span className="text-[10px] text-text-secondary">
              15 משתתפים
            </span>
          </div>
        </div>

        {/* Messages container */}
        <div className="flex-1 overflow-hidden bg-surface-card">
          {children}
        </div>

        {/* Input bar placeholder */}
        <div className="flex items-center gap-2 px-3 py-2 bg-wa-header">
          <button
            type="button"
            aria-label="Send"
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
          <div className="flex-1 flex items-center rounded-lg bg-surface-highest/60 px-3 py-1.5">
            <span className="text-xs text-text-secondary">הקלד הודעה...</span>
          </div>
          <Camera className="w-5 h-5 text-text-secondary shrink-0" />
          <Mic className="w-5 h-5 text-text-secondary shrink-0" />
        </div>
      </div>
    </div>
  );
}
