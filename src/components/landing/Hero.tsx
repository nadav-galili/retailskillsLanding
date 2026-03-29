import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-surface">
      {/* Decorative neon glow orbs */}
      <div className="absolute top-20 start-1/4 w-96 h-96 rounded-full bg-primary/8 blur-[80px]" />
      <div className="absolute bottom-10 end-1/4 w-80 h-80 rounded-full bg-secondary/6 blur-[80px]" />
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute bottom-1/3 start-1/3 w-64 h-64 rounded-full bg-tertiary/4 blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <span className="inline-block text-[0.6875rem] uppercase tracking-[0.1em] font-semibold text-tertiary mb-4">
          פלטפורמת AI לקמעונאות
        </span>
        <h1 className="text-[3.5rem] leading-tight tracking-[-0.04em] font-bold text-text-primary mb-6">
          הטכנולוגיה שמנהלת רשתות קמעונאיות
        </h1>
        <p className="text-sm text-text-secondary max-w-[60ch] mx-auto mb-10">
          בוט AI לוואטסאפ, דשבורדים חכמים ופורטל הדרכות — הכל במקום אחד. בעברית.
          לקמעונאות.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/demo" variant="primary" size="lg">
            נסה את הבוט בחינם &larr;
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            קבע הדגמה
          </Button>
        </div>
      </div>
    </section>
  );
}
