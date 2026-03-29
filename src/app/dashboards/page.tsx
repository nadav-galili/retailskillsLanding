import type { Metadata } from "next";
import ProductHero from "@/components/product/ProductHero";
import FeatureGrid from "@/components/product/FeatureGrid";
import ProductCTA from "@/components/product/ProductCTA";
import type { Feature } from "@/types";

export const metadata: Metadata = {
  title: "דשבורדים לקמעונאות | Retail-Skillz",
  description:
    "דשבורדים חכמים לקמעונאות — מכירות, מלאי, עובדים וביצועים בזמן אמת. מתחבר ל-Comax, Priority, SAP.",
};

const features: Feature[] = [
  {
    icon: "📈",
    title: "מכירות בזמן אמת",
    description:
      "ראה מכירות לפי חנות, מוצר, קטגוריה ועובד — מתעדכן אוטומטית",
  },
  {
    icon: "📦",
    title: "ניהול מלאי",
    description:
      "התראות על מוצרים שנגמרים, ניתוח מגמות, המלצות להזמנה",
  },
  {
    icon: "👤",
    title: "ביצועי עובדים",
    description: "מעקב אחרי יעדים, מכירות פר עובד, נוכחות",
  },
  {
    icon: "🏪",
    title: "השוואת חנויות",
    description: "השוואה צולבת בין סניפים על כל מדד",
  },
  {
    icon: "🔗",
    title: "חיבור ל-ERP",
    description: "Comax, Priority, SAP, חשבשבת — מתחברים בקליק",
  },
  {
    icon: "📱",
    title: "מובייל",
    description: "נגיש מכל מקום, מכל מכשיר",
  },
];

const integrations = ["Comax", "Priority", "SAP", "חשבשבת"];

export default function DashboardsPage() {
  return (
    <main>
      <ProductHero
        title="כל הנתונים של הרשת — במסך אחד"
        subtitle="מתחבר ישירות ל-Comax, Priority, SAP ומערכות ERP אחרות. מכירות, מלאי, עובדים — בזמן אמת."
      />

      <FeatureGrid features={features} />

      {/* Integrations */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          מתחבר למערכות המובילות בישראל
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {integrations.map((name) => (
            <div
              key={name}
              className="border border-border rounded-2xl p-6 text-center font-semibold text-lg bg-surface-card hover:border-accent/50 transition-colors"
            >
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Mockup */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          ראו את הנתונים שלכם
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Mockup Card 1 — Sales */}
          <div className="bg-surface-card border border-border rounded-2xl p-8">
            <h3 className="font-semibold text-lg mb-2">מכירות יומיות</h3>
            <p className="text-3xl font-bold text-accent mb-6">₪48,230</p>
            <div className="flex items-end gap-2 h-32">
              <div className="flex-1 bg-accent/30 rounded-t-md" style={{ height: "40%" }} />
              <div className="flex-1 bg-accent/30 rounded-t-md" style={{ height: "65%" }} />
              <div className="flex-1 bg-accent/30 rounded-t-md" style={{ height: "50%" }} />
              <div className="flex-1 bg-accent/30 rounded-t-md" style={{ height: "80%" }} />
              <div className="flex-1 bg-accent/30 rounded-t-md" style={{ height: "70%" }} />
              <div className="flex-1 bg-accent rounded-t-md" style={{ height: "95%" }} />
              <div className="flex-1 bg-accent/50 rounded-t-md" style={{ height: "60%" }} />
            </div>
          </div>

          {/* Mockup Card 2 — Metrics */}
          <div className="bg-surface-card border border-border rounded-2xl p-8">
            <h3 className="font-semibold text-lg mb-2">ביצועי סניפים</h3>
            <p className="text-3xl font-bold text-accent mb-6">12 סניפים</p>
            <div className="flex items-end gap-2 h-32">
              <div className="flex-1 bg-primary/40 rounded-t-md" style={{ height: "90%" }} />
              <div className="flex-1 bg-primary/40 rounded-t-md" style={{ height: "75%" }} />
              <div className="flex-1 bg-primary/40 rounded-t-md" style={{ height: "85%" }} />
              <div className="flex-1 bg-primary/40 rounded-t-md" style={{ height: "60%" }} />
              <div className="flex-1 bg-primary/40 rounded-t-md" style={{ height: "70%" }} />
              <div className="flex-1 bg-primary rounded-t-md" style={{ height: "100%" }} />
              <div className="flex-1 bg-primary/40 rounded-t-md" style={{ height: "55%" }} />
            </div>
          </div>
        </div>
      </section>

      <ProductCTA
        headline="מוכנים לראות את הנתונים שלכם?"
        ctaText="קבע הדגמה"
        ctaHref="/contact"
      />
    </main>
  );
}
