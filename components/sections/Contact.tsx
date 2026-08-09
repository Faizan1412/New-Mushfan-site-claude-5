import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "./ContactForm";
import { ContactDetails } from "./ContactDetails";

/**
 * Contact — ARCHIVED VARIANT, not rendered anywhere.
 *
 * The homepage enquiry section: form on the left, channels on the right. Kept
 * verbatim so it can be restored by importing `Contact` in app/page.tsx below
 * `<CTA />` — pass `href="#contact"` to CTA at the same time so the band above
 * scrolls to the form again instead of routing to /contact.
 *
 * Retired because the same form now lives on /contact, which also carries what
 * would have made the homepage top-heavy: what happens after you send, and the
 * questions people ask before a first call. Running both meant the studio's
 * conversion point existed twice, and the homepage ended on a second copy of a
 * page the nav already points at.
 *
 * ── original notes ───────────────────────────────────────────────────────────
 * Two-pane at `lg`: form on the left, contact details on the right. The details
 * panel is shared with the /contact page (see ContactDetails.tsx), so the
 * studio's channels are written once.
 *
 * White, not the soft tone: the CTA band immediately above is paper-3, and two
 * tinted sections running together would read as one long grey slab and break
 * the page's alternation. It also puts the form's white fields on white paper,
 * where the hairline borders do the defining.
 */

export function Contact() {
  return (
    <Section id="contact" tone="paper" ruled labelledBy="contact-title">
      <SectionHead
        index="07"
        label="Contact"
        titleId="contact-title"
        title="Let’s work together."
        lede="Tell us what you’re building, what you’re trying to achieve, and where you need help. We’ll come back with a clear next step."
      />

      <div className="mt-14 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-x-12">
        {/* Form */}
        <div className="lg:col-span-7">
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>

        {/* Details */}
        <div className="mt-14 lg:col-span-4 lg:col-start-9 lg:mt-3">
          <Reveal delay={180}>
            <ContactDetails />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
