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
      className={cn("flex mb-3", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed",
          isUser
            ? "bg-wa-bubble-user text-text-primary rounded-bl-sm"
            : "bg-surface-elevated text-text-primary rounded-br-sm"
        )}
      >
        {formatContent(content)}
        <span
          className={cn(
            "float-end text-[10px] ms-3 mt-1 leading-none translate-y-1",
            isUser ? "text-text-primary/50" : "text-text-secondary/50"
          )}
        >
          {timestamp.toLocaleTimeString("he-IL", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
