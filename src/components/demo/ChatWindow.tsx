"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import type { ChatMessage } from "@/types";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ScenarioButtons from "./ScenarioButtons";
import ChatInput from "./ChatInput";

const WELCOME_MESSAGE = `👋 שלום! אני הבוט החכם של Retail-Skillz.

אני עוזר למנהלי רשתות קמעונאיות לנהל את היומיום — ישירות מוואטסאפ.

🔹 שאלו אותי כל שאלה בעברית
🔹 או נסו את הכפתורים למטה

מה תרצו לבדוק? 👇`;

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: WELCOME_MESSAGE,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (isLoading) return;

      const userMessage: ChatMessage = {
        role: "user",
        content,
        timestamp: new Date(),
      };

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setIsLoading(true);

      try {
        // Build messages for API: exclude the welcome message (index 0)
        const history = [...messages.slice(1), userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch("/api/demo/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.error || "שגיאה בתקשורת עם השרת"
          );
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("לא ניתן לקרוא את התשובה");

        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          accumulated += decoder.decode(value, { stream: true });
          const currentText = accumulated;

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: currentText,
              timestamp: new Date(),
            };
            return updated;
          });
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "שגיאה לא צפויה";
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: `❌ ${errorMessage}`,
            timestamp: new Date(),
          };
          return updated;
        });
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages]
  );

  return (
    <div className="flex flex-col h-full">
      {/* WhatsApp header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-wa-header">
        <ChevronRight className="w-5 h-5 text-text-secondary shrink-0" />
        <Image
          src="/images/group-avatar.png"
          alt="Group avatar"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover shrink-0"
        />
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-text-primary truncate">
            מנהלי חנויות — רשת שוק+
          </span>
          <span className="text-xs text-text-secondary">15 משתתפים</span>
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto py-4 px-4 bg-surface-card"
      >
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            content={message.content}
            isUser={message.role === "user"}
            timestamp={message.timestamp}
          />
        ))}
        {isLoading &&
          messages.length > 0 &&
          messages[messages.length - 1].content === "" && (
            <TypingIndicator />
          )}
        <div ref={messagesEndRef} />
      </div>

      {/* Scenario buttons - always visible */}
      <ScenarioButtons onSelect={sendMessage} disabled={isLoading} />

      {/* Chat input */}
      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}
