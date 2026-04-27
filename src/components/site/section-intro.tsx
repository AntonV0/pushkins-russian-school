import type { ReactNode } from "react";

type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionIntro({
  eyebrow,
  title,
  children,
  align = "left",
  tone = "light",
}: SectionIntroProps) {
  const isCenter = align === "center";
  const titleColor = tone === "dark" ? "text-white" : "text-brand-blue-strong";
  const bodyColor = tone === "dark" ? "text-white/75" : "text-slate-600";

  return (
    <div className={isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`mt-3 text-3xl font-semibold sm:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {children ? (
        <div className={`mt-4 text-base leading-7 ${bodyColor}`}>{children}</div>
      ) : null}
    </div>
  );
}
