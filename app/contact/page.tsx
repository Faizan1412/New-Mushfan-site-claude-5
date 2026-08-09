import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageHeader, PageSectionHead } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { contact, site } from "@/data/site";
import { faqs, nextSteps } from "@/data/pages";

/**
 * /contact — the enquiry page.
 *
 * The form and the details panel are the same components the homepage section
 * uses, so the studio's channels and the validation rules are written once. What
 * this page adds is everything that would have made the homepage top-heavy: what
 * happens after you press send, and the questions people ask before a first
 * call.
 *
 * The FAQ answers are open where they have to be. "What does a project cost"
 * has no honest fixed answer without a scope, so it says that plainly and
 * points at the budget field rather than inventing a price range — a made-up
 * number is the one thing on this page that could cost someone real money.
 *
 * The h1 is the page's only heading at that level and the form's own labels do
 * the rest; there is no second "Contact" heading above the form, because the
 * page title already said it.
 */

const description =
  "Tell us what you are building and where you need help. Send an enquiry to Mushfan Digital Studio and get a clear next step — scope, cost and timeline in writing before anything starts.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: `${site.url}/contact`,
    title: `Contact — ${site.name}`,
    description,
  },
  twitter: { title: `Contact — ${site.name}`, description },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        titleId="contact-title"
        title={
          <>
            Let&rsquo;s work together
            <span className="text-accent-ink">.</span>
          </>
        }
        lede="Tell us what you’re building, what you’re trying to achieve, and where you need help. We’ll come back with a clear next step — not a brochure."
      >
        <p className="label mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-3">
          <span>Replies within {contact.responseWindow}</span>
          <span className="h-3 w-px bg-rule" aria-hidden="true" />
          <span className="normal-case tracking-normal">{contact.hours}</span>
        </p>
      </PageHeader>

      {/* ── Form + channels ──────────────────────────────────────────────── */}
      <Section tone="paper" labelledBy="enquiry-title">
        <h2 id="enquiry-title" className="sr-only">
          Send an enquiry
        </h2>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <Reveal>
              {/* No top margin: on the homepage the form sits under a section
                  head and carries its own, but here it is the first thing in
                  the section. */}
              <ContactForm className="" />
            </Reveal>
          </div>

          <div className="mt-14 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <Reveal delay={120}>
              <ContactDetails />
            </Reveal>

            <Reveal delay={160}>
              <p className="label-sm mt-6 leading-relaxed text-ink-3">
                <span className="normal-case tracking-normal">
                  Prefer email? Write to us directly and skip the form — the address above reaches
                  the same inbox.
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── What happens next ────────────────────────────────────────────── */}
      <Section tone="paper-2" ruled labelledBy="next-title">
        <PageSectionHead
          eyebrow="After you send"
          titleId="next-title"
          title="What happens next."
          lede="No sales sequence, no drip campaign. Three steps, and you can stop at any of them."
        />

        {/* Flush columns so the three top hairlines resolve into one rule. */}
        <ol className="mt-14 lg:mt-20 lg:grid lg:grid-cols-3">
          {nextSteps.map((step, i) => (
            <Reveal
              key={step.index}
              as="li"
              delay={Math.min(i * 90, 270)}
              className={[
                "relative hairline-t pt-7 pb-9 lg:pb-0",
                i < nextSteps.length - 1 ? "lg:pr-10" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span
                className="absolute top-[-3px] left-0 h-1.5 w-1.5 bg-accent"
                aria-hidden="true"
              />
              <p className="label tnum text-ink-3">
                Step <span className="text-accent-ink">{step.index}</span>
              </p>
              <h3 className="mt-4 text-xl font-display font-semibold tracking-[-0.02em] text-ink">
                {step.title}
              </h3>
              <p className="mt-3 max-w-sm leading-relaxed text-ink-2 lg:max-w-none">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Section tone="paper" ruled labelledBy="faq-title">
        <PageSectionHead
          eyebrow="Before you ask"
          titleId="faq-title"
          title="Questions we get early."
        />

        {/* Answers are open, not folded behind a disclosure. There are six of
            them and they are short — hiding them would add a click to every
            one and keep them out of the page for anyone reading with find. */}
        <dl className="mt-14 lg:mt-20">
          {faqs.map((faq, i) => (
            <Reveal
              key={faq.question}
              as="div"
              delay={Math.min(i * 60, 240)}
              className="hairline-t py-7 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:py-8"
            >
              <dt className="text-lg font-display font-semibold tracking-[-0.02em] text-ink lg:col-span-5 lg:text-xl">
                {faq.question}
              </dt>
              <dd className="mt-3 max-w-2xl leading-relaxed text-ink-2 lg:col-span-7 lg:mt-0">
                {faq.answer}
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={120}>
          <p className="label-sm mt-10 flex items-start gap-2 leading-relaxed text-ink-3">
            <span className="reg-dot mt-1" aria-hidden="true" />
            <span className="normal-case tracking-normal">
              Something not covered here? Put it in the form — an odd question is usually the
              useful one.
            </span>
          </p>
        </Reveal>
      </Section>
    </>
  );
}
