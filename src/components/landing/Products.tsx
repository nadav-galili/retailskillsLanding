import Link from "next/link";
import { MessageSquare, BarChart3, GraduationCap } from "lucide-react";

const products = [
  {
    icon: MessageSquare,
    title: "בוט AI לוואטסאפ",
    description:
      "ניתוח אוטומטי של קבוצות וואטסאפ, סיכומים יומיים, התראות חריגות ומענה חכם — ישירות לנייד של המנהלים.",
    href: "/whatsapp-bot",
    badge: "נסה דמו חי",
  },
  {
    icon: BarChart3,
    title: "דשבורדים לקמעונאות",
    description:
      "דשבורדים אינטראקטיביים שמחברים נתוני מכירות, מלאי ותפעול לתמונה אחת ברורה — בזמן אמת.",
    href: "/dashboards",
    badge: null,
  },
  {
    icon: GraduationCap,
    title: "פורטל הדרכות",
    description:
      "מערכת הדרכות דיגיטלית לעובדי קמעונאות — קליטה, הכשרה מקצועית ומעקב התקדמות אוטומטי.",
    href: "/learning",
    badge: null,
  },
];

export default function Products() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center mb-12">
        הפתרון המלא לניהול רשתות קמעונאיות
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.href}
            className="bg-surface-card border border-border rounded-2xl p-8 hover:border-accent/50 transition-colors"
          >
            <product.icon size={40} className="text-accent mb-4" />
            <h3 className="text-xl font-bold mb-3">{product.title}</h3>
            {product.badge && (
              <span className="inline-block bg-cta/20 text-cta text-sm font-semibold px-3 py-1 rounded-full mb-3">
                {product.badge}
              </span>
            )}
            <p className="text-text-secondary mb-6">{product.description}</p>
            <Link
              href={product.href}
              className="text-accent hover:text-accent-light font-semibold transition-colors"
            >
              למד עוד &larr;
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
