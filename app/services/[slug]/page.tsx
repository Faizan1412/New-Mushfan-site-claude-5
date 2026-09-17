import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { PageHeader, PageSectionHead } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { DemoNote } from "@/components/ui/Section";
import { CTA } from "@/components/sections/CTA";
import { NavLink } from "@/components/layout/NavLink";
import { ArrowRight } from "@/components/ui/Icons";
import {
  getServiceBySlug,
  services,
  SHOW_CASE_STUDIES_NOTICE,
  type CaseStudy,
  type Service,
} from "@/data/services";
import { site } from "@/data/site";

/**
 * /services/[slug] — one page per service.
 *
 * The five services are static (the list lives in data/services.ts), so the
 * routes are pre-built with generateStaticParams and `dynamicParams = false`
 * rejects unknown slugs with a real 404 instead of running the page through
 * with no data.
 *
 * Two layouts share the page:
 *
 *   - Default — every service except Digital Marketing uses the original
 *     three sections: "What it includes" (overview + deliverables), "How we
 *     run it" (approach), "What you walk away with" (outcomes).
 *
 *   - Expanded — opted into by populating `channels` on the service. The
 *     page renders five sections in order: "What We Do" (channels), "Our
 *     Approach" (approach), "What You Get" (deliverables), "Results"
 *     (result categories), "Case Studies" (illustrative campaigns). Both
 *     layouts close on the shared "Other services" list and a CTA, with the
 *     CTA's headline overrideable per service.
 *
 * Page surfaces alternate paper → paper-2 → paper so the bands read as
 * separate arguments; the same rhythm the homepage services section uses.
 */

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

/** Reject unknown slugs with a 404 instead of an empty page. */
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service not found",
      description: `The service at /services/${slug} could not be found.`,
    };
  }

  const url = `${site.url}/services/${service.slug}`;
  const title = `${service.title} — ${site.shortName}`;
  const description = service.summary;

  return {
    title: service.title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: "website",
      url,
      title,
      description,
    },
    twitter: { title, description },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  /* Other services — exclude the current one. Stable order: by data index. */
  const otherServices = services.filter((s) => s.slug !== service.slug);
  /* A service opts into the expanded layout by populating `channels`. */
  const expanded = Boolean(service.channels && service.channels.length > 0);

  return (
    <>
      <PageHeader
        label={service.title}
        titleId={`${service.slug}-title`}
        title={
          <>
            {service.title}
            <span className="text-accent-ink">.</span>
          </>
        }
        lede={service.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/#services" },
          { label: service.title },
        ]}
      >
        {/* Specimen image as the header aside. Sits under the lede and
            reads as a quiet preview of the work rather than a hero. */}
        {service.image ? (
          <div className="hairline-t mt-12 pt-10">
            <Reveal>
              <div className="frame frame-marked relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </Reveal>
          </div>
        ) : null}
      </PageHeader>

      {expanded ? (
        <ExpandedSections service={service} />
      ) : (
        <DefaultSections service={service} />
      )}

      {/* ── Other services ───────────────────────────────────────────────── */}
      <Section tone="paper-2" ruled labelledBy={`${service.slug}-related`}>
        <PageSectionHead
          eyebrow="Other services"
          titleId={`${service.slug}-related`}
          title="Often combined with this one."
          lede="Most projects need two or three disciplines to land — each one is offered on its own, but they work harder when run together."
        />

        <ol className="mt-14 lg:mt-20">
          {otherServices.map((other, i) => (
            <Reveal
              key={other.slug}
              as="li"
              delay={Math.min(i * 70, 240)}
              className="hairline-t py-7 lg:grid lg:grid-cols-12 lg:items-baseline lg:gap-x-10 lg:py-8"
            >
              <p className="label tnum text-ink-3 lg:col-span-1">{other.index}</p>
              <h3 className="mt-3 text-xl font-display font-semibold tracking-[-0.02em] text-ink lg:col-span-4 lg:mt-0">
                <NavLink
                  href={`/services/${other.slug}`}
                  className="group inline-flex items-baseline gap-3 text-ink no-underline transition-transform duration-300 ease-[var(--ease-out-quart)] hover:translate-x-1"
                >
                  {other.title}
                  <ArrowRight
                    className="btn-arrow shrink-0 self-center text-ink-3 transition-colors duration-200 group-hover:text-accent-ink"
                    size={18}
                  />
                </NavLink>
              </h3>
              <p className="mt-3 max-w-xl leading-relaxed text-ink-2 lg:col-span-7 lg:mt-0">
                {other.summary}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CTA
        title={service.ctaTitle ? <>{service.ctaTitle}<span className="text-accent-ink">.</span></> : undefined}
        primaryLabel={service.ctaPrimaryLabel}
      />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   DEFAULT LAYOUT
   The original three-section service page. Used by every service except
   Digital Marketing, which opts into the expanded layout below.
   ────────────────────────────────────────────────────────────────────────── */

function DefaultSections({ service }: { service: Service }) {
  return (
    <>
      {/* ── What it includes ─────────────────────────────────────────────── */}
      <Section tone="paper" labelledBy={`${service.slug}-overview`}>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <PageSectionHead
              eyebrow="What it includes"
              titleId={`${service.slug}-overview`}
              title="The scope, in plain language."
            />

            <Reveal delay={160}>
              <p className="lede mt-8 max-w-xl lg:mt-10">{service.overview}</p>
            </Reveal>
          </div>

          {/* Deliverables. Two columns from `sm` up — same device the
              homepage Services section uses, so the detail page reads as
              the same editorial language, scaled up. */}
          <div className="mt-14 lg:col-span-4 lg:col-start-9 lg:mt-2">
            <Reveal delay={200}>
              <h3 className="label text-ink-3">Deliverables</h3>
              <ul className="mt-3">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="hairline-t flex items-start gap-3 py-3 text-[0.9375rem] leading-snug text-ink-2"
                  >
                    <span className="reg-dot mt-2" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── How we run it ────────────────────────────────────────────────── */}
      <Section tone="paper-2" ruled labelledBy={`${service.slug}-approach`}>
        <PageSectionHead
          eyebrow="How we run it"
          titleId={`${service.slug}-approach`}
          title="Four stages, in order."
          lede="Every engagement follows the same shape. What changes between services is the work inside each stage — the rhythm does not."
        />

        <ol className="mt-14 lg:mt-20">
          {service.approach.map((step, i) => (
            <Reveal
              key={step.title}
              as="li"
              delay={Math.min(i * 70, 240)}
              className="hairline-t py-8 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:py-10"
            >
              <p className="label tnum text-accent-ink lg:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-xl font-display font-semibold tracking-[-0.02em] text-ink lg:col-span-4 lg:mt-0">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xl leading-relaxed text-ink-2 lg:col-span-7 lg:mt-0">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ── What you walk away with ──────────────────────────────────────── */}
      <Section tone="paper" ruled labelledBy={`${service.slug}-outcomes`}>
        <PageSectionHead
          eyebrow="What you walk away with"
          titleId={`${service.slug}-outcomes`}
          title="The things that are yours at the end."
        />

        <ul className="mt-14 lg:mt-20 lg:grid lg:grid-cols-2 lg:gap-x-10">
          {service.outcomes.map((outcome, i) => (
            <Reveal
              key={outcome}
              as="li"
              delay={Math.min(i * 70, 240)}
              className="hairline-t py-7 lg:py-8"
            >
              <p className="label tnum text-accent-ink">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-3 max-w-md text-[1.0625rem] leading-relaxed text-ink lg:text-lg">
                {outcome}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   EXPANDED LAYOUT
   ────────────────────────────────────────────────────────────────────────── */

function ExpandedSections({ service }: { service: Service }) {
  const channels = service.channels ?? [];
  const resultCategories = service.resultCategories ?? [];
  const caseStudies = service.caseStudies ?? [];

  return (
    <>
      {/* ── What We Do ───────────────────────────────────────────────────── */}
      <Section tone="paper" labelledBy={`${service.slug}-channels`}>
        <PageSectionHead
          eyebrow="What we do"
          titleId={`${service.slug}-channels`}
          title="Four channels, run together."
          lede="Paid and organic across the surfaces your audience is already on — each with its own mechanics, run as one campaign rather than four siloed ones."
        />

        {/* Hero artboard: the four platforms together, in the form they
            actually live in. Framed with the same `.frame .frame-marked`
            device the rest of the site uses, so the image reads as a
            delivered specimen rather than decoration. */}
        <Reveal className="mt-14 lg:mt-20">
          <div className="frame frame-marked relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10]">
            <Image
              src="/images/services/dm-content.png"
              alt="A phone showing a brand reel, surrounded by the social platforms a campaign runs across."
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-20">
          {channels.map((channel, i) => (
            <Reveal
              key={channel.name}
              as="article"
              delay={Math.min(i * 70, 210)}
              className="hairline-t pt-7 lg:pt-8"
            >
              <p className="label tnum text-accent-ink">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-xl font-display font-semibold tracking-[-0.02em] text-ink lg:text-[1.375rem]">
                {channel.name}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-ink-2">{channel.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Our Approach ─────────────────────────────────────────────────── */}
      <Section tone="paper-2" ruled labelledBy={`${service.slug}-approach`}>
        <PageSectionHead
          eyebrow="Our approach"
          titleId={`${service.slug}-approach`}
          title="Five stages, in order."
          lede="The same rhythm every campaign runs through. What changes is the work inside each stage — the order does not."
        />

        <ol className="mt-14 lg:mt-20">
          {service.approach.map((step, i) => (
            <Reveal
              key={step.title}
              as="li"
              delay={Math.min(i * 60, 240)}
              className="hairline-t py-8 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:py-10"
            >
              <p className="label tnum text-accent-ink lg:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-xl font-display font-semibold tracking-[-0.02em] text-ink lg:col-span-4 lg:mt-0">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xl leading-relaxed text-ink-2 lg:col-span-7 lg:mt-0">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ── What You Get ─────────────────────────────────────────────────── */}
      {/* Asymmetric: the megaphone visual anchors the left rail, the
          deliverables stack on the right. The image pairs with the section
          header because both are about what the engagement amplifies, not
          what it makes. On mobile the two stack and the image comes first. */}
      <Section tone="paper" ruled labelledBy={`${service.slug}-deliverables`}>
        <PageSectionHead
          eyebrow="What you get"
          titleId={`${service.slug}-deliverables`}
          title="The work, in four parts."
        />

        <div className="mt-14 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:items-start">
          <Reveal className="lg:col-span-5">
            <div className="frame frame-marked relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/services/dm-amplify.png"
                alt="A hand holding a megaphone with arrows pointing to reach, leads and sales — what the engagement amplifies."
                fill
                sizes="(min-width: 1024px) 42rem, 100vw"
                className="object-cover"
              />
            </div>
            <p className="label-sm mt-5 text-ink-3">
              Good ideas, made louder — not louder ideas.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-y-2 sm:grid-cols-2 sm:gap-x-6 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:grid-cols-1 lg:gap-x-0">
            {service.deliverables.map((item, i) => (
              <Reveal
                key={item}
                as="li"
                delay={Math.min(i * 70, 210)}
                className="hairline-t py-5 text-[0.9375rem] leading-snug text-ink-2 lg:py-6 lg:text-base"
              >
                <span className="inline-flex items-baseline gap-4">
                  <span className="label-sm tnum text-ink-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── Results ──────────────────────────────────────────────────────── */}
      {resultCategories.length > 0 ? (
        <Section tone="paper-2" ruled labelledBy={`${service.slug}-results`}>
          <PageSectionHead
            eyebrow="Results"
            titleId={`${service.slug}-results`}
            title="What the work moves."
            lede="What every campaign is measured against, agreed before any spend goes out."
          />

          {/* The growth-chart artboard sits above the four categories so
              the visual states the result before the categories spell it
              out. Same `.frame .frame-marked` device as the rest of the
              site. */}
          <Reveal className="mt-14 lg:mt-20">
            <div className="frame frame-marked relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10]">
              <Image
                src="/images/services/dm-results.png"
                alt="An ascending bar chart with reach, traffic, leads, sales and business growth labelled on each bar."
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <ul className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {resultCategories.map((category, i) => (
              <Reveal
                key={category}
                as="li"
                delay={Math.min(i * 70, 210)}
                className="hairline-t pt-7 lg:pt-8"
              >
                <p className="label tnum text-accent-ink">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 text-2xl font-display font-semibold tracking-[-0.02em] text-ink lg:text-[1.75rem]">
                  {category}
                </p>
                <ResultBlurb category={category} />
              </Reveal>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* ── Case Studies ─────────────────────────────────────────────────── */}
      {caseStudies.length > 0 ? (
        <Section tone="paper" ruled labelledBy={`${service.slug}-case-studies`}>
          <PageSectionHead
            eyebrow="Case studies"
            titleId={`${service.slug}-case-studies`}
            title="Three campaigns, in practice."
            lede="Illustrative examples of how the approach runs in the real world — the structure of the work, not invented numbers."
          />

          <ol className="mt-14 lg:mt-20">
            {caseStudies.map((study, i) => (
              <Reveal
                key={study.id}
                as="li"
                delay={Math.min(i * 70, 210)}
                className="hairline-t py-8 lg:py-10"
              >
                <CaseStudyRow study={study} index={i + 1} />
              </Reveal>
            ))}
          </ol>

          {SHOW_CASE_STUDIES_NOTICE ? (
            <DemoNote>
              Illustrative examples written to show the layout — not real client campaigns. Genuine,
              permitted case studies replace them before launch.
            </DemoNote>
          ) : null}
        </Section>
      ) : null}
    </>
  );
}

/**
 * One line of context under each Results category. The user gave just the
 * four category names ("Leads / Sales / Reach / Engagement") — the blurb
 * below each is editorial copy that makes the tile feel finished rather than
 * a naked label, while staying at the level of approach (what the work aims
 * to do) rather than fabricated metrics.
 */
function ResultBlurb({ category }: { category: string }) {
  const blurbs: Record<string, string> = {
    Leads: "Qualified enquiries that reach the sales team, attributed back to the campaign that brought them in.",
    Sales: "Transactions we can trace to a paid touch — not last-click assumptions.",
    Reach: "New audiences reached through paid placement, outside the existing follower base.",
    Engagement: "How the creative is received: saves, shares, watch-through, replies.",
  };
  return (
    <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
      {blurbs[category] ?? ""}
    </p>
  );
}

/**
 * A single case study row. Channel and client sit at the top in the mono
 * register, the three body paragraphs stack underneath as ordinary text — so
 * the section reads as a register of campaigns rather than a card grid.
 */
function CaseStudyRow({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <article>
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="label tnum text-accent-ink">
          Case {String(index).padStart(2, "0")} · {study.channel}
        </p>
        <p className="label-sm text-ink-3">{study.client}</p>
      </header>

      <div className="mt-6 space-y-4 lg:mt-8 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:space-y-0">
        <CaseStudyField label="Goal" body={study.goal} />
        <CaseStudyField label="Approach" body={study.approach} />
        <CaseStudyField label="Outcome" body={study.outcome} />
      </div>
    </article>
  );
}

function CaseStudyField({ label, body }: { label: string; body: string }) {
  return (
    <div className="lg:col-span-4">
      <p className="label-sm text-ink-3">{label}</p>
      <p className="mt-2 max-w-md leading-relaxed text-ink-2">{body}</p>
    </div>
  );
}
