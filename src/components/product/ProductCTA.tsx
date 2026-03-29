import Button from "@/components/ui/Button";

interface ProductCTAProps {
  headline: string;
  ctaText: string;
  ctaHref: string;
  secondaryText?: string;
  secondaryHref?: string;
}

export default function ProductCTA({
  headline,
  ctaText,
  ctaHref,
  secondaryText,
  secondaryHref,
}: ProductCTAProps) {
  return (
    <section className="py-28 bg-surface-elevated">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{headline}</h2>
        <div className="flex flex-col items-center gap-4">
          <Button href={ctaHref} variant="primary" size="lg">
            {ctaText}
          </Button>
          {secondaryText && secondaryHref && (
            <Button href={secondaryHref} variant="tertiary">
              {secondaryText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
