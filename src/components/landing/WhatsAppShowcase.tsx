"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Image from "next/image";
import {
  ClipboardList,
  Search,
  AlertTriangle,
  Megaphone,
  ChevronDown,
} from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import ShowcaseMessage from "./ShowcaseMessage";
import FeatureCallout from "./FeatureCallout";
import RainingLetters, { ScrambledText } from "./RainingLetters";
import Button from "@/components/ui/Button";

const heroScramblePhrases = [
  "הטכנולוגיה שמנהלת רשתות קמעונאיות",
  "בוט AI שעובד ישירות בוואטסאפ",
  "סיכומים אוטומטיים לכל הרשת",
  "מודיעין תחרותי בזמן אמת",
  "הטכנולוגיה שמנהלת רשתות קמעונאיות",
];

/* ── Message data (ranges shifted to make room for hero at 0–0.10) ── */
const messages = [
  {
    type: "user" as const,
    content: "/סיכום",
    range: [0.18, 0.21] as [number, number],
  },
  {
    type: "bot" as const,
    content:
      "📋 סיכום יומי — 28.03.2026\n✅ 14 מ-15 חנויות דיווחו\n📈 מכירות: ₪847,000 (↑12%)\n⚠️ חנות ת\"א מרכז: חוסר במלאי\n📋 3 משימות פתוחות",
    range: [0.23, 0.30] as [number, number],
  },
  {
    type: "user" as const,
    content: "מה עושים המתחרים?",
    range: [0.30, 0.33] as [number, number],
  },
  {
    type: "bot" as const,
    content:
      "🔍 עדכון תחרותי\nרמי לוי: מבצע 1+1 על חלב\nשופרסל: הוזלה 15% ירקות\nיוחננוף: קמפיין חדש ברשתות",
    range: [0.35, 0.43] as [number, number],
  },
  {
    type: "alert" as const,
    content:
      "🚨 התראה דחופה\nחוסר במלאי — חנות ת\"א מרכז\nמנהל אזור קיבל התראה",
    range: [0.45, 0.52] as [number, number],
  },
  {
    type: "user" as const,
    content: "תכין קמפיין לסוף שבוע",
    range: [0.58, 0.61] as [number, number],
  },
  {
    type: "bot" as const,
    content:
      '📢 קמפיין סוף שבוע\n🛒 "סוף שבוע = סל מלא!"\nהנחה 20% על מוצרי בסיס\n📱 קופי לוואטסאפ ושילוט — מוכן!',
    range: [0.63, 0.73] as [number, number],
  },
] as const;

/* ── Callout data (ranges shifted for hero) ── */
const callouts = [
  {
    icon: <ClipboardList className="w-6 h-6" />,
    title: "סיכום אוטומטי",
    description: "קבלו סיכום יומי מפורט של כל הרשת בהודעה אחת",
    range: [0.23, 0.30] as [number, number],
    side: "start" as const,
    accent: "primary" as const,
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "מודיעין תחרותי",
    description: "עדכונים אוטומטיים על מבצעים וקמפיינים של המתחרים",
    range: [0.35, 0.43] as [number, number],
    side: "end" as const,
    accent: "secondary" as const,
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: "התראות בזמן אמת",
    description: "זיהוי אוטומטי של חריגות ודיווח מיידי למנהלים",
    range: [0.45, 0.52] as [number, number],
    side: "start" as const,
    accent: "tertiary" as const,
  },
  {
    icon: <Megaphone className="w-6 h-6" />,
    title: "יצירת קמפיינים",
    description: "הפקת קמפיינים מותאמים לרשת בשניות",
    range: [0.63, 0.73] as [number, number],
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

  /* ── Hero text transforms (visible at start, fades out as phone enters) ── */
  const heroOpacity = useTransform(smoothProgress, [0, 0.06, 0.10], [1, 1, 0]);
  const heroY = useTransform(smoothProgress, [0.06, 0.10], [0, -60]);
  const heroScale = useTransform(smoothProgress, [0.06, 0.10], [1, 0.95]);

  /* ── Phone transforms (enters after hero fades) ── */
  const phoneY = useTransform(smoothProgress, [0.08, 0.16], [120, 0]);
  const phoneOpacity = useTransform(smoothProgress, [0.08, 0.16], [0, 1]);
  const headerOpacity = useTransform(smoothProgress, [0.14, 0.18], [0, 1]);
  const phoneScale = useTransform(smoothProgress, [0.85, 1], [1, 0.9]);
  const ctaOpacity = useTransform(smoothProgress, [0.87, 0.95], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.87, 0.95], [30, 0]);
  const glowShadow = useTransform(
    smoothProgress,
    [0.14, 0.73, 0.87],
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
        ref={containerRef}
        className="relative bg-surface-lowest px-4 showcase-static"
        dir="rtl"
      >
        {/* Mobile hero text with staggered entrance */}
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center py-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-[0.6875rem] uppercase tracking-[0.1em] font-semibold text-tertiary mb-4"
          >
            פלטפורמת AI לקמעונאות
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl leading-tight tracking-[-0.04em] font-bold text-text-primary mb-6"
          >
            הטכנולוגיה שמנהלת רשתות קמעונאיות
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-sm text-text-secondary max-w-[60ch] mx-auto mb-10"
          >
            בוט AI לוואטסאפ, דשבורדים חכמים ופורטל הדרכות — הכל במקום אחד. בעברית.
            לקמעונאות.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button href="/demo" variant="primary" size="lg">
              נסה את הבוט בחינם &larr;
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              קבע הדגמה
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 -m-8 rounded-full bg-primary/15 blur-[60px] glow-pulse" aria-hidden="true" />
            <Image
              src="/images/showcase-hero.png"
              alt="WhatsApp bot showcase"
              width={400}
              height={300}
              priority
              className="relative w-full max-w-[400px] rounded-xl hero-float"
            />
          </motion.div>
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

  /* ── Desktop: scroll-driven layout with integrated hero ── */
  return (
    <section ref={containerRef} className="relative h-[420vh] bg-surface-lowest">
      <h1 className="sr-only">הטכנולוגיה שמנהלת רשתות קמעונאיות</h1>

      {/* Background glow image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/showcase-bg.png"
          alt=""
          fill
          className="object-cover opacity-30"
          loading="eager"
          priority
          aria-hidden="true"
        />
      </div>

      {/* Decorative neon glow orbs */}
      <div className="absolute top-[10vh] start-1/4 w-96 h-96 rounded-full bg-primary/8 blur-[80px]" aria-hidden="true" />
      <div className="absolute top-[5vh] end-1/3 w-80 h-80 rounded-full bg-secondary/6 blur-[80px]" aria-hidden="true" />
      <div className="absolute top-[15vh] start-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px]" aria-hidden="true" />

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        {/* Raining letters background — fades with hero */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 z-10"
        >
          <RainingLetters />
        </motion.div>

        {/* Hero — split layout: text + floating illustration */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          dir="rtl"
        >
          <div className="max-w-7xl w-full mx-auto px-8 flex items-center justify-between gap-12 pointer-events-auto">
            {/* Text side */}
            <div className="max-w-xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="inline-block text-[0.6875rem] uppercase tracking-[0.1em] font-semibold text-tertiary mb-4"
              >
                פלטפורמת AI לקמעונאות
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-[3.5rem] leading-tight tracking-[-0.04em] font-bold text-text-primary mb-6"
              >
                <ScrambledText
                  phrases={heroScramblePhrases}
                  className="inline"
                />
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-sm text-text-secondary max-w-[50ch] mb-10"
              >
                בוט AI לוואטסאפ, דשבורדים חכמים ופורטל הדרכות — הכל במקום אחד. בעברית.
                לקמעונאות.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <Button href="/demo" variant="primary" size="lg">
                  נסה את הבוט בחינם &larr;
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  קבע הדגמה
                </Button>
              </motion.div>
            </div>

            {/* Illustration side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hidden lg:block relative"
            >
              {/* Pulsing neon glow behind image */}
              <div className="absolute inset-0 -m-16 rounded-full bg-primary/15 blur-[80px] glow-pulse" aria-hidden="true" />
              <Image
                src="/images/showcase-hero.png"
                alt="WhatsApp bot showcase — isometric phone with data cards"
                width={520}
                height={390}
                priority
                className="relative hero-float w-[480px] xl:w-[520px]"
              />
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-8 inset-x-0 flex justify-center pointer-events-none"
          >
            <ChevronDown className="w-6 h-6 text-primary/50 scroll-hint" />
          </motion.div>
        </motion.div>

        {/* Phone + callouts container */}
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
            className="rounded-[2.5rem]"
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
