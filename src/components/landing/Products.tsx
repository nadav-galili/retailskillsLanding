import Link from "next/link";
import { MessageSquare, BarChart3, GraduationCap } from "lucide-react";
import Card from "@/components/ui/Card";

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
    <section className="max-w-7xl mx-auto px-4 py-28">
      <h2 className="text-3xl font-bold text-center mb-12">
        הפתרון המלא לניהול רשתות קמעונאיות
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.href} interactive>
            <product.icon size={40} className="text-primary mb-4" />
            <h3 className="text-xl font-bold mb-3">{product.title}</h3>
            {product.badge && (
              <span className="inline-block bg-tertiary/15 text-tertiary text-[0.6875rem] uppercase tracking-[0.1em] font-semibold px-3 py-1 rounded-lg mb-3">
                {product.badge}
              </span>
            )}
            <p className="text-text-secondary mb-6">{product.description}</p>
            <Link
              href={product.href}
              className="text-primary hover:text-primary-light font-semibold transition-colors"
            >
              למד עוד &larr;
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
