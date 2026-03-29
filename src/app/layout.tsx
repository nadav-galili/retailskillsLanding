import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heebo",
});

export const metadata: Metadata = {
  title: "Retail-Skillz — הטכנולוגיה שמנהלת רשתות קמעונאיות",
  description:
    "בוט AI לוואטסאפ, דשבורדים חכמים ופורטל הדרכות — הכל במקום אחד. בעברית. לקמעונאות.",
  openGraph: {
    title: "Retail-Skillz — הטכנולוגיה שמנהלת רשתות קמעונאיות",
    description:
      "בוט AI לוואטסאפ, דשבורדים חכמים ופורטל הדרכות — הכל במקום אחד. בעברית. לקמעונאות.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} font-[family-name:var(--font-heebo)] antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
