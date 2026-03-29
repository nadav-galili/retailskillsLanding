import { streamChat } from "@/lib/claude";
import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 30;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "הגעת למגבלת ההודעות. נסה שוב בעוד מספר דקות." },
        { status: 429 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "מפתח API לא הוגדר. פנה למנהל המערכת." },
        { status: 500 }
      );
    }

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "לא התקבלו הודעות." },
        { status: 400 }
      );
    }

    const stream = await streamChat(messages);

    return new Response(
      new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          stream.on("text", (text) => {
            controller.enqueue(encoder.encode(text));
          });
          stream.on("end", () => {
            controller.close();
          });
          stream.on("error", (error) => {
            console.error("Stream error:", error);
            controller.error(error);
          });
        },
      }),
      {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "שגיאה בעיבוד ההודעה. נסה שוב." },
      { status: 500 }
    );
  }
}
