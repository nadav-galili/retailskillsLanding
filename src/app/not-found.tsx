import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">הדף לא נמצא</h2>
      <p className="text-text-secondary mb-8">
        מצטערים, העמוד שחיפשתם לא קיים או שהוסר.
      </p>
      <Button href="/" variant="primary" size="lg">
        חזרה לדף הבית
      </Button>
    </div>
  );
}
