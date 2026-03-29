import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-bold text-accent mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">הדף לא נמצא</h2>
      <p className="text-text-secondary mb-8">
        מצטערים, העמוד שחיפשתם לא קיים או שהוסר.
      </p>
      <Link
        href="/"
        className="bg-cta hover:bg-cta-hover text-white font-semibold rounded-xl px-8 py-4 transition-colors"
      >
        חזרה לדף הבית
      </Link>
    </div>
  );
}
