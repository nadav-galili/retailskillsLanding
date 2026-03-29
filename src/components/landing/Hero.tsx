import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-dark to-surface">
      {/* Decorative gradient orbs */}
      <div className="absolute top-20 start-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-10 end-1/4 w-80 h-80 rounded-full bg-primary-light/20 blur-3xl" />
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cta/5 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
          הטכנולוגיה שמנהלת רשתות קמעונאיות
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
          בוט AI לוואטסאפ, דשבורדים חכמים ופורטל הדרכות — הכל במקום אחד. בעברית.
          לקמעונאות.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/demo"
            className="bg-cta hover:bg-cta-hover text-white rounded-xl px-8 py-4 text-lg font-semibold transition-colors"
          >
            נסה את הבוט בחינם &larr;
          </Link>
          <Link
            href="/contact"
            className="border border-accent text-accent hover:bg-accent/10 rounded-xl px-8 py-4 text-lg transition-colors"
          >
            קבע הדגמה
          </Link>
        </div>
      </div>
    </section>
  );
}
