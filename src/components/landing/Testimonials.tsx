import { Quote } from "lucide-react";
import Card from "@/components/ui/Card";

const testimonials = [
  {
    quote: "מאז שהתחלנו עם הבוט, חסכנו שעתיים ביום על קריאת קבוצות",
    author: "יוסי כ.",
    role: "מנהל שיווק, רשת אופנה",
  },
  {
    quote:
      "הדשבורד חיבר לנו את כל הנתונים למקום אחד. סוף סוף רואים את התמונה המלאה",
    author: "מיכל ל.",
    role: "סמנכ\"לית תפעול",
  },
  {
    quote: "פורטל ההדרכות שינה לנו את הקליטה של עובדים חדשים",
    author: "אורן ש.",
    role: "מנהל משאבי אנוש",
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-surface-elevated">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          מה אומרים הלקוחות שלנו
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author}>
              <Quote size={32} className="text-primary/20 mb-4" />
              <p className="text-text-primary mb-6 text-lg">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <div className="font-bold">{testimonial.author}</div>
                <div className="text-text-secondary">{testimonial.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
