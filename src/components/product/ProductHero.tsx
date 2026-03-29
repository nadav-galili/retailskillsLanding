import Button from "@/components/ui/Button";

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
    <section className="relative min-h-[50vh] flex items-center bg-surface overflow-hidden">
      {/* Neon glow orbs */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[80px]" />
      <div className="absolute bottom-1/4 end-1/4 w-64 h-64 rounded-full bg-secondary/5 blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.04em] mb-6">{title}</h1>
        <p className="text-sm text-text-secondary mb-8 max-w-[60ch] mx-auto">
          {subtitle}
        </p>
        {ctaText && ctaHref && (
          <Button href={ctaHref} variant="primary" size="lg">
            {ctaText}
          </Button>
        )}
      </div>
    </section>
  );
}
