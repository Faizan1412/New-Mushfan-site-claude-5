import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageHeader, PageSectionHead } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/sections/CTA";
import { NavLink } from "@/components/layout/NavLink";
import { ArrowRight } from "@/components/ui/Icons";
import { contact, site } from "@/data/site";
import { services } from "@/data/services";
import { audiences, principles } from "@/data/pages";
import { processSteps } from "@/data/content";

/**
 * /about — the studio in full.
 *
 * The homepage About section is the summary; this is the argument. It says what
 * the studio does, how it works, what it covers and who it is for — in that
 * order, because that is the order the questions arrive in.
 *
 * What it deliberately does not contain: a founding date, a headcount, a team
 * wall, client logos, awards or performance figures. None of those are known to
 * be true here, and an About page is exactly where an invented one would be
 * believed. Everything on the page is a statement of approach or scope, which
 * the studio can stand behind without a case study to prove it.
 *
 * Surfaces alternate paper → paper-2 so the four bands read as separate
 * arguments, and the page closes on the shared CTA pointed at /contact rather
 * than at a form anchor that only exists on the homepage.
 */

const description =
  "Mushfan Digital Studio is a digital partner for businesses that want marketing, design and technology pulling in the same direction. How we work, what we cover and who we work with.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: `${site.url}/about`,
    title: `About — ${site.name}`,
    description,
  },
  twitter: { title: `About — ${site.name}`, description },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        titleId="about-title"
        title={
          <>
            We build the whole system, not one piece of it
            <span className="text-accent-ink">.</span>
          </>
        }
        lede="Mushfan Digital Studio combines strategy, creative design, technology and digital marketing — run by one team, measured against the same goal."
      />

      {/* ── The studio ───────────────────────────────────────────────────── */}
      <Section tone="paper" labelledBy="studio-title">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <PageSectionHead
              eyebrow="The studio"
              titleId="studio-title"
              title="Most businesses buy their digital work in pieces."
            />

            <div className="mt-8 space-y-6 lg:mt-10">
              <Reveal delay={160}>
                <p className="lede">
                  A website from one vendor, campaigns from another, creative from a third. Each
                  piece is fine in isolation and disconnected in practice.
                </p>
              </Reveal>

              <Reveal delay={200}>
                <p className="max-w-xl leading-relaxed text-ink-2">
                  The cost of that is rarely visible on any single invoice. It shows up as a
                  campaign pointing at a page nobody designed for it, a brand that shifts between
                  channels, and tracking that was never anyone&rsquo;s job — so the question of what
                  actually worked never gets a straight answer.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <p className="max-w-xl leading-relaxed text-ink-2">
                  We build the whole system instead — the site, the campaigns, the creative and the
                  automation behind them — so each part makes the others work harder. That is the
                  entire reason the studio covers marketing, design and technology together rather
                  than picking one and outsourcing the rest.
                </p>
              </Reveal>

              <Reveal delay={280}>
                <p className="max-w-xl leading-relaxed text-ink-2">
                  We work with founders and marketing teams across {contact.serviceArea[0]} and
                  remotely, on projects that range from a single campaign to a full digital rebuild.
                  Small enough to stay close to the work, structured enough to run it properly.
                </p>
              </Reveal>
            </div>
          </div>

          {/* At a glance. Every row is read from data/site.ts, so nothing here
              can quietly disagree with the footer or the contact page. */}
          <Reveal delay={200} className="mt-14 lg:col-span-4 lg:col-start-9 lg:mt-24">
            <div className="frame frame-marked p-7 lg:p-8">
              <p className="label text-ink-3">At a glance</p>
              <dl className="mt-2 sm:grid sm:grid-cols-2 sm:gap-x-8 lg:block">
                {[
                  { dt: "Studio", dd: site.name },
                  { dt: "Based in", dd: contact.location },
                  { dt: "Working", dd: contact.serviceArea.join(" · ") },
                  { dt: "Hours", dd: contact.hours },
                ].map(({ dt, dd }) => (
                  <div key={dt} className="hairline-t py-4">
                    <dt className="label text-ink-3">{dt}</dt>
                    <dd className="mt-2 text-[0.9375rem] text-ink-2">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── How we work ──────────────────────────────────────────────────── */}
      <Section tone="paper-2" ruled labelledBy="principles-title">
        <PageSectionHead
          eyebrow="How we work"
          titleId="principles-title"
          title="Four things we do not negotiate on."
          lede="Not a manifesto — these are the four decisions that shape every project, written down so you can hold us to them."
        />

        {/* No grid gap, spacing from internal padding: the four top hairlines
            then resolve into one unbroken rule per row instead of being chopped
            into dashes by the gutter. Same device the Process track uses. */}
        <ol className="mt-14 sm:grid sm:grid-cols-2 lg:mt-20">
          {principles.map((principle, i) => (
            <Reveal
              key={principle.index}
              as="li"
              delay={Math.min(i * 80, 240)}
              className={[
                "hairline-t pt-7 pb-9 sm:pb-10",
                // Right column starts a fresh pair, so only one side of each
                // cell is padded — otherwise the gutter would be doubled.
                i % 2 === 0 ? "sm:pr-10" : "sm:pl-10",
              ].join(" ")}
            >
              <p className="label tnum text-accent-ink">{principle.index}</p>
              <h3 className="mt-4 text-xl font-display font-semibold tracking-[-0.02em] text-ink lg:text-[1.375rem]">
                {principle.title}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-ink-2">{principle.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ── What we cover ────────────────────────────────────────────────── */}
      <Section tone="paper" ruled labelledBy="cover-title">
        <PageSectionHead
          eyebrow="What we cover"
          titleId="cover-title"
          title="Five disciplines, run as one."
          lede="Each is offered on its own. They are listed together because most projects need two or three of them to work at all."
        />

        <ol className="mt-14 lg:mt-20">
          {services.map((service, i) => (
            <Reveal
              key={service.index}
              as="li"
              delay={Math.min(i * 70, 280)}
              className="hairline-t py-7 lg:grid lg:grid-cols-12 lg:items-baseline lg:gap-x-10 lg:py-8"
            >
              <p className="label tnum text-ink-3 lg:col-span-1">{service.index}</p>
              <h3 className="mt-3 text-xl font-display font-semibold tracking-[-0.02em] text-ink lg:col-span-4 lg:mt-0">
                {service.title}
              </h3>
              <p className="mt-3 max-w-xl leading-relaxed text-ink-2 lg:col-span-7 lg:mt-0">
                {service.summary}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <NavLink
            href="/#services"
            className="label mt-10 inline-flex items-center gap-2 text-ink-2 transition-colors duration-200 hover:text-ink"
          >
            <span className="link-draw">See what each one includes</span>
            <ArrowRight size={13} aria-hidden="true" />
          </NavLink>
        </Reveal>
      </Section>

      {/* ── Who we work with ─────────────────────────────────────────────── */}
      <Section tone="paper-2" ruled labelledBy="audience-title">
        <PageSectionHead
          eyebrow="Who we work with"
          titleId="audience-title"
          title="Businesses that have outgrown doing it themselves."
        />

        <ul className="mt-14 lg:mt-20 lg:grid lg:grid-cols-3">
          {audiences.map((audience, i) => (
            <Reveal
              key={audience.title}
              as="li"
              delay={Math.min(i * 90, 270)}
              className={[
                "hairline-t pt-7 pb-9 last:pb-0",
                i < audiences.length - 1 ? "lg:pr-10" : "",
                "lg:pb-0",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <h3 className="text-xl font-display font-semibold tracking-[-0.02em] text-ink">
                {audience.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-2">{audience.body}</p>
            </Reveal>
          ))}
        </ul>

        {/* The process lives on the homepage; repeating all five stages here
            would be the same content twice. The stage names are enough to say
            what the shape is, and the link goes to the full version. */}
        <Reveal delay={160}>
          <div className="hairline-t mt-16 pt-8 lg:mt-24 lg:flex lg:items-baseline lg:justify-between lg:gap-8">
            <div>
              <h3 className="label text-ink-3">How a project runs</h3>
              <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.9375rem] text-ink-2">
                {processSteps.map((step, i) => (
                  <span key={step.index} className="inline-flex items-center gap-3">
                    {i > 0 ? (
                      <span className="h-3 w-px bg-rule" aria-hidden="true" />
                    ) : null}
                    {step.title}
                  </span>
                ))}
              </p>
            </div>

            <NavLink
              href="/#process"
              className="label mt-6 inline-flex items-center gap-2 text-ink-2 transition-colors duration-200 hover:text-ink lg:mt-0 lg:shrink-0"
            >
              <span className="link-draw">The five stages in full</span>
              <ArrowRight size={13} aria-hidden="true" />
            </NavLink>
          </div>
        </Reveal>
      </Section>

      <CTA />
    </>
  );
}
