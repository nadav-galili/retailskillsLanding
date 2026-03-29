import Link from "next/link";

export default function CTA() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-primary to-primary-dark">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          מוכנים לשדרג את הרשת שלכם?
        </h2>
        <p className="text-text-secondary text-lg mb-8">
          הצטרפו לרשתות שכבר חוסכות זמן, כסף ותפעול עם Retail-Skillz
        </p>
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/contact"
            className="bg-cta hover:bg-cta-hover text-white rounded-xl px-8 py-4 text-lg font-semibold transition-colors"
          >
            קבע הדגמה חינם
          </Link>
          <Link
            href="/demo"
            className="text-accent hover:text-accent-light transition-colors"
          >
            או נסה את הבוט עכשיו &larr;
          </Link>
        </div>
      </div>
    </section>
  );
}
