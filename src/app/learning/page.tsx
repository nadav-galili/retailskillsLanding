import type { Metadata } from "next";
import ProductHero from "@/components/product/ProductHero";
import FeatureGrid from "@/components/product/FeatureGrid";
import ProductCTA from "@/components/product/ProductCTA";
import type { Feature } from "@/types";

export const metadata: Metadata = {
  title: "פורטל הדרכות | Retail-Skillz",
  description:
    "פלטפורמת הדרכות וידאו חכמה לקמעונאות — קליטה, הכשרה ופיתוח עובדים עם מעקב התקדמות ומבחנים.",
};

const features: Feature[] = [
  {
    icon: "🎥",
    title: "ספריית וידאו",
    description:
      "העלו סרטוני הדרכה, סדרו בקורסים, הוסיפו כתוביות אוטומטיות",
  },
  {
    icon: "📝",
    title: "מבחנים והערכות",
    description:
      "בדקו ידע עם שאלונים אוטומטיים אחרי כל שיעור",
  },
  {
    icon: "📊",
    title: "מעקב התקדמות",
    description:
      "ראו מי סיים מה, מי תקוע, ומי מצטיין — ברמת עובד, חנות ורשת",
  },
  {
    icon: "🏆",
    title: "תעודות ואישורים",
    description: "הפקת תעודות אוטומטית בסיום קורס",
  },
  {
    icon: "📱",
    title: "נגיש מהנייד",
    description:
      "עובדים לומדים מהטלפון, בהפסקה או בדרך הביתה",
  },
  {
    icon: "🤖",
    title: "ניתוח AI",
    description:
      "הבינה המלאכותית מזהה פערי ידע ומציעה תוכנית למידה מותאמת",
  },
];

export default function LearningPage() {
  return (
    <main>
      <ProductHero
        title="הכשרת עובדים שעובדת"
        subtitle="פלטפורמת וידאו חכמה לקליטה, הדרכה ופיתוח עובדים. עם מעקב התקדמות, מבחנים ותעודות."
      />

      <FeatureGrid features={features} />

      <ProductCTA
        headline="מוכנים לשדרג את ההכשרה?"
        ctaText="קבע הדגמה"
        ctaHref="/contact"
      />
    </main>
  );
}
