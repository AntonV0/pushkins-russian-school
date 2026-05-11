type Metric = {
  label: string;
  value: string | number;
};

type MetricStripProps = {
  metrics: Metric[];
  tone?: "light" | "dark";
  variant?: "default" | "quiet";
};

export function MetricStrip({
  metrics,
  tone = "light",
  variant = "default",
}: MetricStripProps) {
  const isDark = tone === "dark";
  const isQuiet = variant === "quiet";
  const gridClassName =
    metrics.length === 4
      ? "sm:grid-cols-2"
      : "sm:[grid-template-columns:repeat(auto-fit,minmax(9rem,1fr))]";

  return (
    <dl
      className={`grid grid-cols-1 gap-px overflow-hidden rounded-lg border ${gridClassName} ${
        isQuiet ? "" : "premium-panel"
      } ${
        isDark
          ? "border-white/15 bg-white/15"
          : isQuiet
            ? "border-border-soft bg-border-soft/70"
            : "border-border-soft bg-border-soft"
      }`}
    >
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className={
            isDark
              ? "bg-white/10 p-4 sm:p-5"
              : isQuiet
                ? "bg-background/80 p-4"
                : "bg-surface p-4 sm:p-5"
          }
        >
          <dt
            className={`text-xs font-semibold uppercase tracking-[0.14em] ${
              isDark ? "text-white/60" : "text-muted"
            }`}
          >
            {metric.label}
          </dt>
          <dd
            className={`mt-2 font-semibold ${
              isQuiet ? "text-2xl" : "text-2xl sm:text-3xl"
            } ${
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
