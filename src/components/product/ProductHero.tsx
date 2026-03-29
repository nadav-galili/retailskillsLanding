import Link from "next/link";

interface ProductHeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function ProductHero({
  title,
  subtitle,
  ctaText,
  ctaHref,
}: ProductHeroProps) {
  return (
    <section className="min-h-[50vh] flex items-center bg-gradient-to-b from-primary-dark to-surface">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
        <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        {ctaText && ctaHref && (
          <Link
            href={ctaHref}
            className="inline-block bg-cta hover:bg-cta-hover text-white rounded-xl px-8 py-4 text-lg font-semibold transition-colors"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
}
