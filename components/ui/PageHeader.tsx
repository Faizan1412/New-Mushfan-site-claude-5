import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { NavLink } from "@/components/layout/NavLink";

/**
 * Page header for the routed pages.
 *
 * The homepage's SectionHead carries a numbered rail, because there every
 * section is one station in a run of eight. A page is not a station: it has no
 * position in that sequence, so numbering it would be a false index. This uses
 * the same drafting vocabulary — mono eyebrow, registration dot, hairline — with
 * a breadcrumb in place of the index and an `h1` in place of the `h2`.
 *
 * The breadcrumb is a real nav landmark with `aria-current="page"` on the last
 * crumb, so it is a working orientation device rather than decoration.
 */

type PageHeaderProps = {
  /** Mono eyebrow above the heading. */
  label: string;
  title: ReactNode;
  lede?: string;
  titleId: string;
  /** Optional slot under the lede — actions, a note, a detail strip. */
  children?: ReactNode;
};

export function PageHeader({ label, title, lede, titleId, children }: PageHeaderProps) {
  return (
    <header className="hairline-b bg-paper">
      {/* Slightly shallower than a full section: this sits directly under the
          sticky header, so the usual py-section would push the h1 most of the
          way down a laptop viewport before anything is read. */}
      <div className="shell pt-12 pb-14 sm:pt-16 lg:pt-20 lg:pb-24">
        <Reveal>
          <nav aria-label="Breadcrumb">
            <ol className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-3">
              <li>
                <NavLink href="/" className="transition-colors duration-200 hover:text-ink">
                  Home
                </NavLink>
              </li>
              <li aria-hidden="true" className="text-rule">
                /
              </li>
              <li className="flex items-center gap-2 text-ink-2" aria-current="page">
                <span className="reg-dot" aria-hidden="true" />
                {label}
              </li>
            </ol>
          </nav>
        </Reveal>

        <Reveal delay={60}>
          <h1 id={titleId} className="display-1 mt-8 max-w-[18ch] lg:mt-10">
            {title}
          </h1>
        </Reveal>

        {lede ? (
          <Reveal delay={120}>
            <p className="lede mt-7 max-w-2xl">{lede}</p>
          </Reveal>
        ) : null}

        {children ? <Reveal delay={180}>{children}</Reveal> : null}
      </div>
    </header>
  );
}

/**
 * Section header inside a routed page.
 *
 * Same reasoning as above, one level down: these sections are not stations in
 * the homepage's numbered run, so they take the eyebrow-and-dot form the CTA
 * band already uses rather than the mono index rail.
 */
export function PageSectionHead({
  eyebrow,
  title,
  lede,
  titleId,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  titleId: string;
}) {
  return (
    <>
      <Reveal>
        <p className="label flex items-center gap-3 text-ink-2">
          <span className="reg-dot" aria-hidden="true" />
          {eyebrow}
        </p>
      </Reveal>

      <Reveal delay={60}>
        <h2 id={titleId} className="display-2 mt-8 max-w-3xl">
          {title}
        </h2>
      </Reveal>

      {lede ? (
        <Reveal delay={120}>
          <p className="lede mt-6 max-w-xl">{lede}</p>
        </Reveal>
      ) : null}
    </>
  );
}
