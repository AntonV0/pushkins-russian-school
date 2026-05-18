type DisabledActionGroupProps = {
  actions: string[];
  size?: "sm" | "md";
  className?: string;
};

export function DisabledActionGroup({
  actions,
  size = "sm",
  className = "flex flex-wrap gap-2",
}: DisabledActionGroupProps) {
  const buttonClassName =
    size === "md"
      ? "cursor-not-allowed rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-400"
      : "cursor-not-allowed rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-400";

  return (
    <div className={className}>
      {actions.map((action) => (
        <button key={action} type="button" disabled className={buttonClassName}>
          {action}
        </button>
      ))}
    </div>
  );
}
