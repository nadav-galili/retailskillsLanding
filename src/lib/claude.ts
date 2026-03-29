import Anthropic from "@anthropic-ai/sdk";
import { getSystemPrompt } from "./prompts";

const anthropic = new Anthropic();

export async function streamChat(
  messages: { role: string; content: string }[]
) {
  const stream = anthropic.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: getSystemPrompt(),
    messages: messages as { role: "user" | "assistant"; content: string }[],
  });

  return stream;
}
