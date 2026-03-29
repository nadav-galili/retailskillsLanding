import { Plug, Cpu, Eye } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Plug,
    title: "מתחברים למערכות שלכם",
    description: "ERP, WhatsApp, CRM — חיבור פשוט וסינכרון אוטומטי",
  },
  {
    number: 2,
    icon: Cpu,
    title: "הפלטפורמה עובדת",
    description: "ניתוח, סיכומים, התראות, הדרכות — הכל אוטומטי",
  },
  {
    number: 3,
    icon: Eye,
    title: "אתם מקבלים שליטה",
    description: "תובנות, דוחות, צוות מיומן — בלחיצת כפתור",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">איך זה עובד?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="flex flex-col items-center gap-4 mb-4">
                <div className="bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  {step.number}
                </div>
                <step.icon size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
