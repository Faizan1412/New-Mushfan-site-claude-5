import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Section shell + the drafting margin rail.
 *
 * The rail is the site's structural spine: a mono index and label sit in the
 * left margin on large screens and collapse to an eyebrow above the heading on
 * small ones. Same markup either way — only the grid changes.
 */

type SectionProps = {
  id?: string;
  children: ReactNode;
  /** Surface tone. Dark adds `on-carbon`, which re-tints hairlines and frames. */
  tone?: "paper" | "paper-2" | "paper-3" | "carbon";
  /** Hairline above the section. */
  ruled?: boolean;
  /** Tighter vertical rhythm, for bands rather than full sections. */
  compact?: boolean;
  className?: string;
  /** `aria-labelledby` target, so each landmark has an accessible name. */
  labelledBy?: string;
};

const toneClass: Record<NonNullable<SectionProps["tone"]>, string> = {
  paper: "bg-paper",
  "paper-2": "bg-paper-2",
  "paper-3": "bg-paper-3",
  carbon: "bg-carbon text-chalk on-carbon",
};

export function Section({
  id,
  children,
  tone = "paper",
  ruled = false,
  compact = false,
  className = "",
  labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={[
        toneClass[tone],
        ruled ? "hairline-t" : "",
        compact ? "py-section-sm" : "py-section",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

type SectionHeadProps = {
  /** Two-digit section index shown in the rail. */
  index: string;
  /** Short rail label, e.g. "Services". */
  label: string;
  /** The section heading. Rendered as h2 by default. Optional — when omitted,
      a visually-hidden heading carrying the label is rendered instead so the
      section's aria-labelledby target still resolves. Used by sections whose
      content carries its own headings (e.g. Services, whose rows are display-3
      h3s) and would otherwise compete with another display-2 at the top. */
  title?: ReactNode;
  /** Supporting paragraph under the heading. */
  lede?: string;
  /** Element id for the heading, referenced by Section's labelledBy. */
  titleId?: string;
  as?: "h1" | "h2";
  /** Optional slot rendered under the lede — a CTA, a note, a stat. */
  aside?: ReactNode;
  /** Widen the heading measure for short titles. */
  align?: "split" | "stack";
};

export function SectionHead({
  index,
  label,
  title,
  lede,
  titleId,
  as: Heading = "h2",
  aside,
  align = "split",
}: SectionHeadProps) {
  return (
    <header className="lg:grid lg:grid-cols-[var(--spacing-rail)_1fr] lg:gap-x-10">
      <Reveal>
        <div className="flex items-center gap-3 lg:sticky lg:top-28 lg:block">
          <span className="label text-ink-3 tnum lg:block">{index}</span>
          <span className="rail-rule rule-draw-scroll lg:my-3" aria-hidden="true" />
          <span className="label text-ink-2 lg:block">{label}</span>
        </div>
      </Reveal>

      <div className={align === "split" ? "mt-7 lg:mt-0" : "mt-7 lg:mt-0 max-w-4xl"}>
        <Reveal delay={60}>
          {title ? (
            <Heading id={titleId} className={Heading === "h1" ? "display-1" : "display-2 max-w-3xl"}>
              {title}
            </Heading>
          ) : (
            /* sr-only keeps the labelledBy target live for assistive tech while
               leaving the visual hierarchy to the rail label and the lede. */
            <Heading id={titleId} className="sr-only">
              {label}
            </Heading>
          )}
        </Reveal>

        {lede ? (
          <Reveal delay={title ? 120 : 60}>
            <p className="lede mt-6 max-w-xl">{lede}</p>
          </Reveal>
        ) : null}

        {aside ? <Reveal delay={title ? 180 : 120}>{aside}</Reveal> : null}
      </div>
    </header>
  );
}

/**
 * Small mono note used to mark illustrative placeholder data. Kept visually
 * quiet but never hidden — honesty about demo figures is not fine print.
 */
export function DemoNote({ children }: { children: ReactNode }) {
  return (
    <p className="label-sm mt-6 flex items-start gap-2 leading-relaxed text-ink-3">
      <span className="reg-dot mt-1" aria-hidden="true" />
      <span className="normal-case tracking-normal">{children}</span>
    </p>
  );
}
