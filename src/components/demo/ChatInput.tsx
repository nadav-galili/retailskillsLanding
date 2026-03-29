"use client";

import { useState, useRef, useCallback } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    const maxHeight = 3 * 24; // approx 3 rows
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  };

  return (
    <div className="bg-surface-elevated p-4 flex gap-3 items-end">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="כתבו הודעה..."
        rows={1}
        className="bg-surface-lowest border border-border rounded-md px-4 py-3 flex-1 text-text-primary placeholder:text-text-secondary/50 resize-none focus:outline-none focus:border-primary focus:shadow-[0_0_8px_rgba(153,247,255,0.15)] transition-all disabled:opacity-50 disabled:pointer-events-none"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className="bg-gradient-to-r from-primary-light to-primary text-on-primary rounded-md p-3 transition-shadow hover:neon-glow disabled:opacity-50 disabled:pointer-events-none"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}
