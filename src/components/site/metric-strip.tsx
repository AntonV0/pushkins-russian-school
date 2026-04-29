type Metric = {
  label: string;
  value: string | number;
};

type MetricStripProps = {
  metrics: Metric[];
  tone?: "light" | "dark";
};

export function MetricStrip({ metrics, tone = "light" }: MetricStripProps) {
  const isDark = tone === "dark";
  const gridClassName =
    metrics.length === 4
      ? "sm:grid-cols-2"
      : "sm:[grid-template-columns:repeat(auto-fit,minmax(9rem,1fr))]";

  return (
    <dl
      className={`premium-panel grid grid-cols-1 gap-px overflow-hidden rounded-lg border ${gridClassName} ${
        isDark
          ? "border-white/15 bg-white/15"
          : "border-border-soft bg-border-soft"
      }`}
    >
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className={isDark ? "bg-white/10 p-4 sm:p-5" : "bg-surface p-4 sm:p-5"}
        >
          <dt
            className={`text-xs font-semibold uppercase tracking-[0.14em] ${
              isDark ? "text-white/60" : "text-muted"
            }`}
          >
            {metric.label}
          </dt>
          <dd
            className={`mt-2 text-2xl font-semibold sm:text-3xl ${
              isDark ? "text-white" : "text-brand-blue-strong"
            }`}
          >
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
