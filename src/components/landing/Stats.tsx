const stats = [
  { value: "50+", label: "חנויות מנוהלות", color: "text-primary" },
  { value: "15,000+", label: "הודעות מנותחות ביום", color: "text-secondary" },
  { value: "3", label: "רשתות קמעונאיות", color: "text-tertiary" },
  { value: "98%", label: "שביעות רצון לקוחות", color: "text-primary" },
];

export default function Stats() {
  return (
    <section className="w-full bg-surface-elevated py-28">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className={`text-4xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-text-secondary mt-2">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
