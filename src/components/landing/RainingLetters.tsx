"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface Character {
  char: string;
  x: number;
  y: number;
  speed: number;
}

const CHARS = "אבגדהוזחטיכלמנסעפצקרשת0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export function ScrambledText({
  phrases,
  className,
}: {
  phrases: string[];
  className?: string;
}) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef(0);
  const queueRef = useRef<
    Array<{ from: string; to: string; start: number; end: number; char?: string }>
  >([]);
  const resolveRef = useRef<() => void>(() => {});
  const rafRef = useRef(0);
  const scrambleChars = "!<>-_\\/[]{}—=+*^?#אבגדהוזחט";

  const update = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;

    let output = "";
    let complete = 0;
    const queue = queueRef.current;

    for (let i = 0; i < queue.length; i++) {
      const { from, to, start, end } = queue[i];
      let { char } = queue[i];

      if (frameRef.current >= end) {
        complete++;
        output += to;
      } else if (frameRef.current >= start) {
        if (!char || Math.random() < 0.28) {
          char = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          queue[i].char = char;
        }
        output += `<span class="scramble-dud">${char}</span>`;
      } else {
        output += from;
      }
    }

    el.innerHTML = output;
    if (complete === queue.length) {
      resolveRef.current();
    } else {
      rafRef.current = requestAnimationFrame(update);
      frameRef.current++;
    }
  }, [scrambleChars]);

  const setText = useCallback(
    (newText: string) => {
      const el = elementRef.current;
      if (!el) return Promise.resolve();

      const oldText = el.innerText;
      const length = Math.max(oldText.length, newText.length);

      const promise = new Promise<void>((resolve) => {
        resolveRef.current = resolve;
      });

      queueRef.current = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        queueRef.current.push({ from, to, start, end });
      }

      cancelAnimationFrame(rafRef.current);
      frameRef.current = 0;
      update();
      return promise;
    },
    [update]
  );

  useEffect(() => {
    let counter = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const next = () => {
      setText(phrases[counter]).then(() => {
        timeout = setTimeout(next, 2500);
      });
      counter = (counter + 1) % phrases.length;
    };

    // Small delay before starting
    timeout = setTimeout(next, 600);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [phrases, setText]);

  return <span ref={elementRef} className={className} />;
}

export default function RainingLetters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());

  const createCharacters = useCallback(() => {
    const charCount = 200;
    const newCharacters: Character[] = [];

    for (let i = 0; i < charCount; i++) {
      newCharacters.push({
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.05 + Math.random() * 0.15,
      });
    }

    return newCharacters;
  }, []);

  useEffect(() => {
    setCharacters(createCharacters());
  }, [createCharacters]);

  useEffect(() => {
    const updateActiveIndices = () => {
      const newActiveIndices = new Set<number>();
      const numActive = Math.floor(Math.random() * 2) + 2;
      for (let i = 0; i < numActive; i++) {
        newActiveIndices.add(Math.floor(Math.random() * characters.length));
      }
      setActiveIndices(newActiveIndices);
    };

    const flickerInterval = setInterval(updateActiveIndices, 80);
    return () => clearInterval(flickerInterval);
  }, [characters.length]);

  useEffect(() => {
    let animationFrameId: number;

    const updatePositions = () => {
      setCharacters((prevChars) =>
        prevChars.map((char) => ({
          ...char,
          y: char.y + char.speed,
          ...(char.y >= 100 && {
            y: -5,
            x: Math.random() * 100,
            char: CHARS[Math.floor(Math.random() * CHARS.length)],
          }),
        }))
      );
      animationFrameId = requestAnimationFrame(updatePositions);
    };

    animationFrameId = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {characters.map((char, index) => {
        const isActive = activeIndices.has(index);
        return (
          <span
            key={index}
            className="absolute text-xs font-light"
            style={{
              left: `${char.x}%`,
              top: `${char.y}%`,
              transform: `translate(-50%, -50%) ${isActive ? "scale(1.2)" : "scale(1)"}`,
              color: isActive ? "#00f1fe" : "rgba(153, 247, 255, 0.08)",
              textShadow: isActive
                ? "0 0 8px rgba(0, 241, 254, 0.6), 0 0 16px rgba(0, 241, 254, 0.3)"
                : "none",
              opacity: isActive ? 1 : 0.3,
              transition: "color 0.1s, transform 0.1s, text-shadow 0.1s",
              willChange: "transform, top",
              fontSize: "1.2rem",
            }}
          >
            {char.char}
          </span>
        );
      })}
    </div>
  );
}
