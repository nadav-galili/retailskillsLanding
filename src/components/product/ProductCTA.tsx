import Link from "next/link";

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
    <section className="py-16 bg-primary/20">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{headline}</h2>
        <div className="flex flex-col items-center gap-4">
          <Link
            href={ctaHref}
            className="inline-block bg-cta hover:bg-cta-hover text-white rounded-xl px-8 py-4 text-lg font-semibold transition-colors"
          >
            {ctaText}
          </Link>
          {secondaryText && secondaryHref && (
            <Link
              href={secondaryHref}
              className="text-accent hover:underline transition-colors"
            >
              {secondaryText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
