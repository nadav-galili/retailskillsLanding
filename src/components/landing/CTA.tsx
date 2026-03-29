import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="w-full py-28 bg-surface-high">
      <div className="max-w-3xl mx-auto text-center px-4">
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
