import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "צור קשר | Retail-Skillz",
  description: "צרו קשר עם Retail-Skillz לקבלת הדגמה והצעת מחיר",
};

export default function ContactPage() {
  return (
    <section className="py-20 max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-4">צור קשר</h1>
      <p className="text-text-secondary text-center mb-12">
        נשמח לשמוע מכם ולספר עוד על הפתרונות שלנו
      </p>

      <ContactForm />

      {/* Contact info — always visible */}
      <div className="mt-12 flex flex-col md:flex-row gap-8 justify-center items-center text-center">
        <a
          href="https://wa.me/972500000000"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary"
        >
          💬 שלחו לנו הודעה בוואטסאפ
        </a>
        <span className="text-text-secondary">📧 info@retail-skillz.com</span>
        <span className="text-text-secondary">📞 03-1234567</span>
      </div>
    </section>
  );
}
