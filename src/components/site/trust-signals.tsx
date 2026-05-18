import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import type { ComponentProps } from "react";
import { SectionIntro } from "@/components/site/section-intro";
import {
  pendingTrustSignals,
  publishableTrustSignals,
  trustHistoryNotes,
  type TrustSignal,
} from "@/data/public/trust";

type TrustSignalsProps = {
  intro?: string;
  align?: "left" | "center";
  includeReviewQueue?: boolean;
};

function TrustSignalCard({ signal }: { signal: TrustSignal }) {
  const content = (
    <article className="flex h-full flex-col border-l border-brand-gold bg-background px-5 py-4 transition group-hover:border-brand-red">
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-sm font-semibold text-brand-red">
          {signal.value}
        </p>
        <TrustSignalIcon
          kind={signal.kind}
          aria-hidden="true"
          className="size-5 shrink-0 text-brand-red"
        />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-brand-blue-strong">
        {signal.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
        {signal.summary}
      </p>
      {signal.href ? (
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue-strong underline decoration-brand-red/40">
          <span>Explore this area</span>
          <ArrowRight aria-hidden="true" className="size-4" />
        </span>
      ) : null}
    </article>
  );

  if (!signal.href) {
    return content;
  }

  return (
    <Link href={signal.href} className="group block h-full focus:outline-none focus:ring-2 focus:ring-brand-red/30">
      {content}
    </Link>
  );
}

function TrustSignalIcon({
  kind,
  ...props
}: ComponentProps<typeof ShieldCheck> & { kind: TrustSignal["kind"] }) {
  if (kind === "location-scale") {
    return <MapPin {...props} />;
  }

  if (kind === "curriculum-structure") {
    return <BookOpen {...props} />;
  }

  if (kind === "policy-transparency") {
    return <FileText {...props} />;
  }

  return <ShieldCheck {...props} />;
}

export function TrustSignals({
  intro = "Parents can check the school locations, curriculum structure, and policy library before they enquire.",
  align = "left",
  includeReviewQueue = false,
}: TrustSignalsProps) {
  return (
    <div>
      <SectionIntro
        eyebrow="Trust signals"
        title="Credibility parents can check"
        align={align}
      >
        <p>{intro}</p>
      </SectionIntro>

      <div className="premium-panel mt-10 overflow-hidden rounded-lg border border-border-soft bg-background">
        <div className="grid lg:grid-cols-[1.05fr_1.2fr]">
          {publishableTrustSignals[0] ? (
            <Link
              href={publishableTrustSignals[0].href ?? "/schools"}
              className="group block bg-brand-blue-strong p-8 text-white focus:outline-none focus:ring-2 focus:ring-brand-red/30 sm:p-10"
            >
              <p className="break-words font-mono text-3xl font-semibold text-brand-gold sm:text-5xl">
                {publishableTrustSignals[0].value}
              </p>
              <span
                aria-hidden="true"
                className="mt-6 inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-white/15 bg-white/10 text-brand-gold"
              >
                <TrustSignalIcon
                  kind={publishableTrustSignals[0].kind}
                  className="size-5"
                  strokeWidth={1.9}
                />
              </span>
              <h3 className="mt-6 max-w-md text-3xl font-semibold leading-tight">
                {publishableTrustSignals[0].title}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/75">
                {publishableTrustSignals[0].summary}
              </p>
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-white/30">
                <span>Explore school locations</span>
                <ArrowRight aria-hidden="true" className="size-4" />
              </span>
            </Link>
          ) : null}
          <div className="grid divide-y divide-border-soft">
            {publishableTrustSignals.slice(1).map((signal) => (
              <TrustSignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        </div>
      </div>

      {includeReviewQueue ? (
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="border-l-4 border-brand-gold bg-surface px-6 py-5">
            <h3 className="text-lg font-semibold text-brand-blue-strong">
              What families can expect
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {trustHistoryNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {pendingTrustSignals.map((signal) => (
              <article
                key={signal.id}
                className="rounded-lg border border-border-soft bg-background p-5"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-brand-gold/40 bg-brand-gold/10 px-3 py-1 text-xs font-semibold text-brand-blue-strong">
                    Being prepared
                  </span>
                  <CheckCircle2 aria-hidden="true" className="size-4 text-brand-red" />
                  <span className="font-mono text-xs font-semibold text-slate-500">
                    {signal.value}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-brand-blue-strong">
                  {signal.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {signal.summary}
                </p>
                {signal.reviewNote ? (
                  <p className="mt-4 border-t border-border-soft pt-4 text-xs leading-5 text-slate-500">
                    {signal.reviewNote}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
