import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

function formatContent(text: string) {
  return text.split("\n").map((line, i) => {
    // Handle **bold** formatting
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

export default function MessageBubble({
  content,
  isUser,
  timestamp,
}: MessageBubbleProps) {
  return (
    <div
      className={cn("flex mb-4", isUser ? "justify-end" : "justify-start")}
    >
      <div className="max-w-[80%]">
        <div
          className={cn(
            "px-4 py-3 rounded-2xl text-sm leading-relaxed",
            isUser
              ? "bg-[#005c4b] text-white rounded-bl-sm"
              : "bg-surface-card text-text-primary rounded-br-sm"
          )}
        >
          {formatContent(content)}
        </div>
        <div
          className={cn(
            "text-xs text-text-secondary/60 mt-1",
            isUser ? "text-end" : "text-start"
          )}
        >
          {timestamp.toLocaleTimeString("he-IL", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
