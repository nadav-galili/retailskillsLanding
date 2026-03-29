import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="relative w-full py-28 bg-surface-high overflow-hidden">
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 end-1/4 w-64 h-64 rounded-full bg-tertiary/3 blur-[100px]" />
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
        <span className="inline-block text-[0.6875rem] uppercase tracking-[0.1em] font-semibold text-secondary mb-4">
          הצטרפו היום
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          מוכנים לשדרג את הרשת שלכם?
        </h2>
        <p className="text-text-secondary text-lg mb-8">
          הצטרפו לרשתות שכבר חוסכות זמן, כסף ותפעול עם Retail-Skillz
        </p>
        <div className="flex flex-col items-center gap-4">
          <Button href="/contact" variant="primary" size="lg">
            קבע הדגמה חינם
          </Button>
          <Button href="/demo" variant="tertiary">
            או נסה את הבוט עכשיו &larr;
          </Button>
        </div>
      </div>
    </section>
  );
}
