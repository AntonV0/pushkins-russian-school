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
      ? "inline-flex min-h-10 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-brand-blue-strong transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-white/40"
      : "inline-flex min-h-10 items-center justify-center rounded-md bg-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue-strong focus:outline-none focus:ring-2 focus:ring-brand-blue/30";

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
  eyebrow = "Learning options",
  title = "Choose the right Russian-learning path",
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

  if (compact) {
    return (
      <div>
        <SectionIntro eyebrow={eyebrow} title={title} tone={tone}>
          {intro ? <p>{intro}</p> : null}
        </SectionIntro>
        <div
          className={`premium-panel mt-8 overflow-hidden rounded-lg border ${
            isDark ? "border-white/15 bg-white/10" : "border-border-soft bg-surface"
          }`}
        >
          {options.map((option) => (
            <article
              key={option.id}
              className={`grid gap-5 border-b p-6 last:border-b-0 lg:grid-cols-[0.55fr_1fr_auto] lg:items-center ${
                isDark ? "border-white/15" : "border-border-soft"
              }`}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
                  {option.label}
                </p>
                <h2 className={`mt-2 text-xl font-semibold ${titleColor}`}>
                  {option.name}
                </h2>
                <p className={`mt-2 text-sm font-semibold ${mutedColor}`}>
                  {option.delivery}
                </p>
              </div>
              <p className={`text-sm leading-6 ${bodyColor}`}>
                {option.summary}
              </p>
              <div className="flex flex-col gap-3 lg:justify-self-end">
                <LearningOptionAction cta={option.primaryCta} tone={tone} />
                {option.secondaryCta ? (
                  option.secondaryCta.external ? (
                    <a
                      href={option.secondaryCta.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex min-h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 ${
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
                      className={`inline-flex min-h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 ${
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
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <SectionIntro eyebrow={eyebrow} title={title} tone={tone}>
        {intro ? <p>{intro}</p> : null}
      </SectionIntro>
      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        {options.map((option, index) => {
          const isHighlighted = option.id === highlightId;

          return (
            <article
              key={option.id}
              className={`premium-panel rounded-lg border p-6 ${
                isHighlighted ? cardAccent[option.id] : ""
              } ${cardBase} ${
                index === 0 ? "lg:row-span-2 lg:p-8" : ""
              }`}
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

              <ul className={`mt-5 space-y-2 text-sm leading-6 ${bodyColor}`}>
                {option.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className={`mt-5 text-xs leading-5 ${mutedColor}`}>
                {option.relationship}
              </p>

              {option.verificationNote ? (
                <p className={`mt-4 text-xs leading-5 ${mutedColor}`}>
                  {option.verificationNote}
                </p>
              ) : null}

              <div
                className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"
              >
                <LearningOptionAction cta={option.primaryCta} tone={tone} />
                {option.secondaryCta ? (
                  option.secondaryCta.external ? (
                    <a
                      href={option.secondaryCta.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex min-h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 ${
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
                      className={`inline-flex min-h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 ${
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
