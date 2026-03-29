"use client";

import type { CSSProperties } from "react";
import { useState, useEffect, useCallback, useRef } from "react";

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

const BEAM_COUNT = 50;

export default function BackgroundBeams() {
  const [beams, setBeams] = useState<Array<{ id: number; style: CSSProperties }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: BEAM_COUNT }).map((_, i) => {
      const riseDur = Math.random() * 2 + 4;
      const fadeDur = riseDur;
      const dropDur = Math.random() * 3 + 3;

      return {
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          width: `${Math.floor(Math.random() * 2) + 1}px`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${riseDur}s, ${fadeDur}s, ${dropDur}s`,
        } as CSSProperties,
      };
    });
    setBeams(generated);
  }, []);

  return (
    <div className="beam-scene absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="beam-floor" />
      <div className="beam-column" />
      <div className="beam-container">
        {beams.map((beam) => (
          <div key={beam.id} className="light-beam" style={beam.style} />
        ))}
      </div>
    </div>
  );
}
