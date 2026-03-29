"use client";

import Link from "next/link";
import ChatWindow from "@/components/demo/ChatWindow";

export default function DemoPage() {
  return (
    <div className="fixed inset-0 z-[100] bg-surface flex flex-col">
      {/* Top bar */}
      <div className="glass px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-primary text-sm hover:underline transition-colors"
        >
          &larr; חזרה לאתר
        </Link>
        <span className="text-lg font-bold text-primary">Retail-Skillz</span>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-hidden">
        <ChatWindow />
      </div>

      {/* Bottom disclaimer */}
      <div className="bg-surface-elevated px-4 py-2 text-center text-xs text-text-secondary">
        🔬 זהו דמו עם נתונים מדומים | Powered by Claude AI
      </div>
    </div>
  );
}
