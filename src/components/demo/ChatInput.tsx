"use client";

import { useState, useRef, useCallback } from "react";
import { Send, Camera, Mic } from "lucide-react";

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

  const hasText = value.trim().length > 0;

  return (
    <div className="flex items-end gap-2 px-3 py-2 bg-wa-header">
      <Camera className="w-5 h-5 text-text-secondary shrink-0 mb-2" />
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="כתבו הודעה..."
        rows={1}
        className="flex-1 bg-surface-highest/60 rounded-xl px-4 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 resize-none focus:outline-none transition-all disabled:opacity-50 disabled:pointer-events-none"
      />
      {hasText ? (
        <button
          onClick={handleSend}
          disabled={disabled}
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/20 text-primary transition-colors hover:bg-primary/30 disabled:opacity-50 disabled:pointer-events-none shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      ) : (
        <Mic className="w-5 h-5 text-text-secondary shrink-0 mb-2" />
      )}
    </div>
  );
}
