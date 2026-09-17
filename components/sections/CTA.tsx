import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { contact } from "@/data/site";
import { heroDisciplines } from "@/data/content";

/**
 * Closing CTA — the pivot band between the argument and the form.
 *
 * Deliberately light. The brief rules out a giant orange banner, and the only
 * dark surface on the page is the footer directly below, so this sits on the
 * soft paper tone and earns its weight through scale and space instead of
 * colour. The only orange is the full stop and the registration dot.
 *
 * The two actions are genuinely different rather than the same link twice:
 * the primary goes to the enquiry form, "Talk to Us" opens a mail client
 * addressed to the studio. The phone number in `data/site.ts` is still a
 * placeholder, so a `tel:` link here would be a dead action dressed as a live
 * one — email is the channel that actually works today.
 *
 * `title` and `primaryLabel` are props so callers can re-tune the headline
 * and primary action per page. The default copy is the shared one used by
 * /about and the homepage; service detail pages override it when they want
 * a CTA that speaks to a specific engagement.
 */

type CTAProps = {
  href?: string;
  /** Optional custom headline. */
  title?: ReactNode;
  /** Optional custom primary button label. */
  primaryLabel?: string;
};

export function CTA({ href = "/contact", title, primaryLabel = "Start a Project" }: CTAProps) {
  return (
    <Section tone="paper-3" ruled compact labelledBy="cta-title">
      <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-12">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="label flex items-center gap-3 text-ink-2">
              <span className="reg-dot" aria-hidden="true" />
              Next step
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h2 id="cta-title" className="display-2 mt-8 max-w-2xl">
              {title ?? (
                <>
                  Have a business ready to grow
                  <span className="text-accent-ink">?</span>
                </>
              )}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="lede mt-6 max-w-xl">
              Let&rsquo;s turn your next idea into something people notice, remember and act on.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={href} variant="primary" arrow data-cta="cta-primary">
                {primaryLabel}
              </ButtonLink>
              <ButtonLink
                href={`mailto:${contact.email}`}
                variant="secondary"
                data-cta="cta-secondary"
              >
                Talk to Us
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* Discipline stack. On large screens it sits on the baseline of the
            button row as a quiet right-hand column; below that it lies down
            into a single ruled strip rather than stacking four tall rows. */}
        <Reveal delay={240} className="mt-14 lg:col-span-3 lg:col-start-10 lg:mt-0">
          <ul className="grid grid-cols-2 gap-x-8 lg:grid-cols-1 lg:gap-x-0">
            {heroDisciplines.map((discipline) => (
              <li key={discipline} className="hairline-t label py-3.5 text-ink-2">
                {discipline}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
