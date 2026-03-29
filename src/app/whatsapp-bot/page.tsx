import type { Metadata } from "next";
import ProductHero from "@/components/product/ProductHero";
import FeatureGrid from "@/components/product/FeatureGrid";
import ProductCTA from "@/components/product/ProductCTA";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import type { Feature } from "@/types";

export const metadata: Metadata = {
  title: "בוט AI לוואטסאפ | Retail-Skillz",
  description:
    "בוט AI חכם שמצטרף לקבוצות הוואטסאפ שלכם — סיכומים, מודיעין תחרותי, קמפיינים, התראות ועוד.",
};

const features: Feature[] = [
  {
    icon: "📋",
    title: "סיכום קבוצות אוטומטי",
    description:
      "קורא את כל ההודעות ב-15+ קבוצות ומפיק סיכום יומי עם משימות ואחראים",
  },
  {
    icon: "🔍",
    title: "מודיעין תחרותי",
    description:
      "מעקב אוטומטי אחרי מחירים, מבצעים ושינויים אצל המתחרים — מדווח ישירות לוואטסאפ",
  },
  {
    icon: "📢",
    title: "יצירת קמפיינים",
    description:
      'קופי מוכן לוואטסאפ, אינסטגרם ושילוט חנויות. אומרים לבוט מה המבצע — הוא מכין את הכל',
  },
  {
    icon: "👥",
    title: "מעקב השתתפות",
    description:
      "יודע מי לא הגיב להודעה חשובה. שולח תזכורות עדינות אוטומטית",
  },
  {
    icon: "🚨",
    title: "התראות דחופות",
    description:
      "מזהה הודעות קריטיות (תקלות, תלונות) ומעביר אוטומטית לקבוצת ההנהלה + מייל",
  },
  {
    icon: "📊",
    title: "דוחות למייל",
    description:
      "סיכום שבועי מפורט עם גרפים ונתונים — ישירות לתיבת המייל של ההנהלה",
  },
];

const useCases = [
  {
    role: "מנהל שיווק",
    description:
      "שואל את הבוט מה עושים המתחרים, מקבל תשובה תוך שניות",
  },
  {
    role: "מנהל תפעול",
    description:
      "מקבל סיכום יומי של כל 15 הקבוצות בלי לקרוא הודעה אחת",
  },
  {
    role: 'סמנכ"ל',
    description:
      "מקבל התראה מיידית כשיש בעיה קריטית בחנות",
  },
];

export default function WhatsAppBotPage() {
  return (
    <main>
      <ProductHero
        title="בוט AI שיושב בקבוצות הוואטסאפ שלכם"
        subtitle="לא צריך אפליקציה חדשה. לא צריך הדרכה. הבוט פשוט מצטרף לקבוצות ומתחיל לעבוד."
        ctaText="נסה דמו חי ←"
        ctaHref="/demo"
      />

      <FeatureGrid features={features} />

      {/* Use Cases */}
      <section className="max-w-7xl mx-auto px-4 py-28">
        <h2 className="text-3xl font-bold text-center mb-12">למי זה מתאים?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase) => (
            <Card key={useCase.role}>
              <h3 className="font-bold text-lg mb-2">{useCase.role}</h3>
              <p className="text-text-secondary">{useCase.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Hint */}
      <section className="bg-surface-elevated py-28">
        <div className="text-center max-w-3xl mx-auto px-4">
          <p className="text-lg text-text-secondary mb-6">
            מתחיל מ-₪499 לחודש. המחיר נקבע לפי מספר קבוצות וחנויות.
          </p>
          <Button href="/contact" variant="primary" size="lg">
            קבל הצעת מחיר
          </Button>
        </div>
      </section>

      <ProductCTA
        headline="מוכנים לחסוך שעות ביום?"
        ctaText="קבע הדגמה"
        ctaHref="/contact"
        secondaryText="או נסה את הדמו עכשיו ←"
        secondaryHref="/demo"
      />
    </main>
  );
}
