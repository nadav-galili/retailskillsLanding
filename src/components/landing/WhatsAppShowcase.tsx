"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Image from "next/image";
import {
  ClipboardList,
  Search,
  AlertTriangle,
  Megaphone,
} from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import ShowcaseMessage from "./ShowcaseMessage";
import FeatureCallout from "./FeatureCallout";
import Button from "@/components/ui/Button";

/* ── Message data ── */
const messages = [
  {
    type: "user" as const,
    content: "/סיכום",
    range: [0.15, 0.18] as [number, number],
  },
  {
    type: "bot" as const,
    content:
      "📋 סיכום יומי — 28.03.2026\n✅ 14 מ-15 חנויות דיווחו\n📈 מכירות: ₪847,000 (↑12%)\n⚠️ חנות ת\"א מרכז: חוסר במלאי\n📋 3 משימות פתוחות",
    range: [0.2, 0.28] as [number, number],
  },
  {
    type: "user" as const,
    content: "מה עושים המתחרים?",
    range: [0.28, 0.31] as [number, number],
  },
  {
    type: "bot" as const,
    content:
      "🔍 עדכון תחרותי\nרמי לוי: מבצע 1+1 על חלב\nשופרסל: הוזלה 15% ירקות\nיוחננוף: קמפיין חדש ברשתות",
    range: [0.33, 0.42] as [number, number],
  },
  {
    type: "alert" as const,
    content:
      "🚨 התראה דחופה\nחוסר במלאי — חנות ת\"א מרכז\nמנהל אזור קיבל התראה",
    range: [0.42, 0.5] as [number, number],
  },
  {
    type: "user" as const,
    content: "תכין קמפיין לסוף שבוע",
    range: [0.56, 0.59] as [number, number],
  },
  {
    type: "bot" as const,
    content:
      '📢 קמפיין סוף שבוע\n🛒 "סוף שבוע = סל מלא!"\nהנחה 20% על מוצרי בסיס\n📱 קופי לוואטסאפ ושילוט — מוכן!',
    range: [0.61, 0.72] as [number, number],
  },
] as const;

/* ── Callout data ── */
const callouts = [
  {
    icon: <ClipboardList className="w-6 h-6" />,
    title: "סיכום אוטומטי",
    description: "קבלו סיכום יומי מפורט של כל הרשת בהודעה אחת",
    range: [0.2, 0.28] as [number, number],
    side: "start" as const,
    accent: "primary" as const,
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "מודיעין תחרותי",
    description: "עדכונים אוטומטיים על מבצעים וקמפיינים של המתחרים",
    range: [0.33, 0.42] as [number, number],
    side: "end" as const,
    accent: "secondary" as const,
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: "התראות בזמן אמת",
    description: "זיהוי אוטומטי של חריגות ודיווח מיידי למנהלים",
    range: [0.42, 0.5] as [number, number],
    side: "start" as const,
    accent: "tertiary" as const,
  },
  {
    icon: <Megaphone className="w-6 h-6" />,
    title: "יצירת קמפיינים",
    description: "הפקת קמפיינים מותאמים לרשת בשניות",
    range: [0.61, 0.72] as [number, number],
    side: "end" as const,
    accent: "secondary" as const,
  },
];

/* ── useMediaQuery hook (SSR-safe) ── */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/* ── Main component ── */
export default function WhatsAppShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  /* ── Desktop scroll-driven transforms ── */
  const phoneY = useTransform(smoothProgress, [0, 0.1], [100, 0]);
  const phoneOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);
  const headerOpacity = useTransform(smoothProgress, [0.1, 0.15], [0, 1]);
  const phoneScale = useTransform(smoothProgress, [0.85, 1], [1, 0.9]);
  const ctaOpacity = useTransform(smoothProgress, [0.85, 0.95], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.85, 0.95], [30, 0]);
  const glowShadow = useTransform(
    smoothProgress,
    [0.1, 0.72, 0.85],
    [
      "0 0 32px rgba(153, 247, 255, 0.12)",
      "0 0 64px rgba(153, 247, 255, 0.25)",
      "0 0 80px rgba(153, 247, 255, 0.35)",
    ]
  );

  /* ── Mobile: static layout with whileInView ── */
  if (isMobile) {
    return (
      <section
        className="bg-surface-lowest py-28 px-4 showcase-static"
        dir="rtl"
      >
        <h2 className="sr-only">הדגמת בוט הוואטסאפ</h2>

        {/* Hero image for mobile */}
        <div className="flex justify-center mb-12">
          <Image
            src="/images/showcase-hero.png"
            alt="WhatsApp bot showcase"
            width={400}
            height={300}
            className="w-full max-w-[400px] rounded-xl"
          />
        </div>

        {/* Stacked phone + messages */}
        <div className="flex justify-center mb-12">
          <PhoneMockup>
            <div className="p-3 space-y-1">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`flex mb-3 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[80%]">
                    <div
                      className={`px-4 py-3 rounded-xl text-sm leading-relaxed ${
                        msg.type === "user"
                          ? "bg-wa-bubble-user text-text-primary rounded-bl-sm"
                          : msg.type === "alert"
                            ? "bg-tertiary/10 border border-tertiary/20"
                            : "bg-surface-card text-text-primary rounded-br-sm"
                      }`}
                    >
                      {msg.content.split("\n").map((line, li) => (
                        <span key={li}>
                          {li > 0 && <br />}
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </PhoneMockup>
        </div>

        {/* Stacked callouts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
          {callouts.map((callout, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-surface/70 backdrop-blur-[16px] rounded-xl p-5 border border-border neon-glow"
            >
              <div className={`mb-3 ${callout.accent === "secondary" ? "text-secondary" : callout.accent === "tertiary" ? "text-tertiary" : "text-primary"}`}>{callout.icon}</div>
              <h3 className={`text-sm font-semibold mb-1 ${callout.accent === "secondary" ? "text-secondary" : callout.accent === "tertiary" ? "text-tertiary" : "text-primary"}`}>
                {callout.title}
              </h3>
              <p className="text-xs leading-relaxed text-text-secondary">
                {callout.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Button href="/demo" variant="primary" size="lg">
            רוצה לראות את זה בפעולה?
          </Button>
        </motion.div>
      </section>
    );
  }

  /* ── Desktop: scroll-driven layout ── */
  return (
    <section ref={containerRef} className="relative h-[350vh] bg-surface-lowest">
      <h2 className="sr-only">הדגמת בוט הוואטסאפ</h2>

      {/* Background glow image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/showcase-bg.png"
          alt=""
          fill
          className="object-cover opacity-30"
          aria-hidden="true"
        />
      </div>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative flex items-center justify-center" dir="rtl">
          {/* Feature callouts — start side (right in RTL) */}
          <div className="hidden lg:flex flex-col gap-6 absolute end-[calc(50%+180px)] top-1/2 -translate-y-1/2">
            {callouts
              .filter((c) => c.side === "start")
              .map((callout, i) => (
                <FeatureCallout
                  key={i}
                  icon={callout.icon}
                  title={callout.title}
                  description={callout.description}
                  scrollProgress={smoothProgress}
                  progressRange={callout.range}
                  accent={callout.accent}
                />
              ))}
          </div>

          {/* Phone mockup */}
          <motion.div
            style={{
              y: phoneY,
              opacity: phoneOpacity,
              scale: phoneScale,
              boxShadow: glowShadow,
            }}
            aria-hidden="true"
          >
            <motion.div style={{ opacity: headerOpacity }}>
              <PhoneMockup>
                <div className="p-3 space-y-1">
                  {messages.map((msg, i) => (
                    <ShowcaseMessage
                      key={i}
                      content={msg.content}
                      type={msg.type}
                      scrollProgress={smoothProgress}
                      showRange={msg.range}
                    />
                  ))}
                </div>
              </PhoneMockup>
            </motion.div>
          </motion.div>

          {/* Feature callouts — end side (left in RTL) */}
          <div className="hidden lg:flex flex-col gap-6 absolute start-[calc(50%+180px)] top-1/2 -translate-y-1/2">
            {callouts
              .filter((c) => c.side === "end")
              .map((callout, i) => (
                <FeatureCallout
                  key={i}
                  icon={callout.icon}
                  title={callout.title}
                  description={callout.description}
                  scrollProgress={smoothProgress}
                  progressRange={callout.range}
                  accent={callout.accent}
                />
              ))}
          </div>

          {/* Tablet: callouts below phone */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-4 absolute top-[calc(50%+310px)] inset-x-4">
            {callouts.map((callout, i) => (
              <FeatureCallout
                key={i}
                icon={callout.icon}
                title={callout.title}
                description={callout.description}
                scrollProgress={smoothProgress}
                progressRange={callout.range}
                accent={callout.accent}
                className="w-full"
              />
            ))}
          </div>
        </div>

        {/* CTA at end of scroll */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute bottom-16 inset-x-0 text-center"
        >
          <Button href="/demo" variant="primary" size="lg">
            רוצה לראות את זה בפעולה?
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
