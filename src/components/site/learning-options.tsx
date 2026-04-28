import Link from "next/link";
import type { LearningOption } from "@/data/learning-options";
import { learningOptions } from "@/data/learning-options";
import { SectionIntro } from "./section-intro";

type LearningOptionsProps = {
  options?: LearningOption[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  highlightId?: LearningOption["id"];
  tone?: "light" | "dark";
  compact?: boolean;
};

const cardAccent = {
  "pushkins-school": "border-brand-blue/25",
  "volna-online": "border-brand-red/25",
  "gcse-russian": "border-brand-gold/70",
};

function LearningOptionAction({
  cta,
  tone,
}: {
  cta: LearningOption["primaryCta"];
  tone: "light" | "dark";
}) {
  const className =
    tone === "dark"
      ? "inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-blue-strong transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-white/40"
      : "inline-flex items-center justify-center rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-blue/30";

  if (cta.external) {
    return (
      <a href={cta.href} target="_blank" rel="noreferrer" className={className}>
        {cta.label}
      </a>
    );
  }

  return (
    <Link href={cta.href} className={className}>
      {cta.label}
    </Link>
  );
}

export function LearningOptions({
  options = learningOptions,
  eyebrow = "Learning network",
  title = "Three connected ways to learn Russian",
  intro,
  highlightId,
  tone = "light",
  compact = false,
}: LearningOptionsProps) {
  const isDark = tone === "dark";
  const cardBase = isDark
    ? "border-white/15 bg-white/10 text-white"
    : "border-border-soft bg-surface";
  const bodyColor = isDark ? "text-white/75" : "text-slate-600";
  const mutedColor = isDark ? "text-white/65" : "text-slate-500";
  const titleColor = isDark ? "text-white" : "text-brand-blue-strong";

  return (
    <div>
      <SectionIntro eyebrow={eyebrow} title={title} tone={tone}>
        {intro ? <p>{intro}</p> : null}
      </SectionIntro>
      <div
        className={`mt-8 grid gap-5 ${
          compact ? "md:grid-cols-3" : "lg:grid-cols-3"
        }`}
      >
        {options.map((option) => {
          const isHighlighted = option.id === highlightId;

          return (
            <article
              key={option.id}
              className={`rounded-lg border p-6 ${
                isHighlighted ? cardAccent[option.id] : ""
              } ${cardBase}`}
            >
              <div className="flex min-h-24 flex-col justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-red">
                    {option.label}
                  </p>
                  <h2 className={`mt-3 text-xl font-semibold ${titleColor}`}>
                    {option.name}
                  </h2>
                </div>
                <p className={`text-sm font-semibold ${mutedColor}`}>
                  {option.delivery}
                </p>
              </div>

              <p className={`mt-5 text-sm leading-6 ${bodyColor}`}>
                {option.summary}
              </p>

              {!compact ? (
                <ul className={`mt-5 space-y-2 text-sm leading-6 ${bodyColor}`}>
                  {option.bestFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}

              <p className={`mt-5 text-xs leading-5 ${mutedColor}`}>
                {option.relationship}
              </p>

              {option.verificationNote ? (
                <p className={`mt-4 text-xs leading-5 ${mutedColor}`}>
                  {option.verificationNote}
                </p>
              ) : null}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <LearningOptionAction cta={option.primaryCta} tone={tone} />
                {option.secondaryCta ? (
                  option.secondaryCta.external ? (
                    <a
                      href={option.secondaryCta.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 ${
                        isDark
                          ? "border-white/25 text-white hover:bg-white/10 focus:ring-white/30"
                          : "border-brand-blue/20 text-brand-blue-strong hover:border-brand-red hover:text-brand-red focus:ring-brand-red/30"
                      }`}
                    >
                      {option.secondaryCta.label}
                    </a>
                  ) : (
                    <Link
                      href={option.secondaryCta.href}
                      className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 ${
                        isDark
                          ? "border-white/25 text-white hover:bg-white/10 focus:ring-white/30"
                          : "border-brand-blue/20 text-brand-blue-strong hover:border-brand-red hover:text-brand-red focus:ring-brand-red/30"
                      }`}
                    >
                      {option.secondaryCta.label}
                    </Link>
                  )
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
