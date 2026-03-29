"use client";

import Link from "next/link";
import ChatWindow from "@/components/demo/ChatWindow";

export default function DemoPage() {
  return (
    <div className="fixed inset-0 z-[100] bg-surface-lowest flex flex-col items-center justify-center overflow-hidden">
      {/* Neon glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 start-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 end-1/3 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px]" />
        <div className="absolute top-2/3 start-1/2 w-[250px] h-[250px] rounded-full bg-tertiary/3 blur-[100px]" />
      </div>

      {/* Back link + brand */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-lg px-4 mx-4 mb-3">
        <Link
          href="/"
          className="text-primary text-sm hover:underline transition-colors"
        >
          &larr; חזרה לאתר
        </Link>
        <span className="text-lg font-bold text-primary">Retail-Skillz</span>
      </div>

      {/* Chat container */}
      <div className="relative z-10 w-full max-w-lg mx-4 max-md:max-w-full max-md:mx-4 flex-1 min-h-0 max-h-[700px] rounded-xl overflow-hidden bg-surface-card">
        <ChatWindow />
      </div>

      {/* Disclaimer */}
      <div className="relative z-10 mt-3 text-center text-xs text-text-secondary/60">
        דמו עם נתונים מדומים | Powered by Claude AI
      </div>
    </div>
  );
}
