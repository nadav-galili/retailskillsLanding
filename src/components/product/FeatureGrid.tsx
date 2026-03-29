import type { Feature } from "@/types";

interface FeatureGridProps {
  features: Feature[];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-surface-card border border-border rounded-2xl p-8 hover:border-accent/50 transition-colors"
          >
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-text-secondary">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
