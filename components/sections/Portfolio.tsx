import Image from "next/image";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectVisual } from "@/components/ui/Visuals";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { SHOW_PLACEHOLDER_NOTICE, projects, type Project } from "@/data/projects";

/**
 * Portfolio — a two-up work grid.
 *
 * Two projects per row from `md` up, one below. What keeps it from reading as a
 * generic card wall is that the cards are not cards: no panel, no radius, no
 * shadow. Each entry is a framed plate with a mono spec line under it, sitting
 * directly on the section's paper, which is the same drafting language the rest
 * of the site uses.
 *
 * Every plate is 16:10 — the ratio the generated compositions in Visuals.tsx are
 * drawn at, so they fill their frame exactly instead of letterboxing. A uniform
 * plate is also what makes a grid look deliberate: mixed ratios in two columns
 * leave one side of each row hanging. The per-project `ratio` in the data still
 * types the artwork; it no longer drives layout.
 *
 * On links: case-study pages do not exist yet, so a project is only a link when
 * `href` is set in the data. Where it is, the title carries the link and covers
 * the plate, so the card is one target and one tab stop rather than the two
 * duplicate links to the same page this section used to ship. Where it is not,
 * the card is inert and only the enquiry line at the bottom is clickable — a
 * dead "View project" would be both a poor experience and a self-referencing
 * internal link, and a whole plate that silently jumps to a form is worse.
 */

export function Portfolio() {
  return (
    <Section id="work" tone="paper" ruled labelledBy="work-title">
      <SectionHead
        index="03"
        label="Work"
        titleId="work-title"
        title="Work that speaks for itself."
        lede="Selected digital experiences, campaigns and creative work."
      />

      <ol className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:mt-20 lg:gap-x-12 lg:gap-y-20">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </ol>

      {SHOW_PLACEHOLDER_NOTICE ? (
        <Reveal className="mt-16 lg:mt-20">
          <p className="label-sm flex items-start gap-2 leading-relaxed text-ink-3">
            <span className="reg-dot mt-1" aria-hidden="true" />
            <span className="normal-case tracking-normal">
              Illustrative placeholders while real projects are prepared — scope only, with no
              invented results or metrics.
            </span>
          </p>
        </Reveal>
      ) : null}
    </Section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const hasCaseStudy = Boolean(project.href);
  const number = String(index + 1).padStart(2, "0");

  return (
    <Reveal
      as="li"
      // Staggered by column, not by position, so both cards in a row arrive
      // together. A running index would ramp the last row a third of a second
      // behind the first for no reason — each row reveals on its own scroll.
      delay={(index % 2) * 90}
      // `group` only when the card is a link. globals.css lets any `.group`
      // hover draw a descendant `.link-draw` underline, which on an inert card
      // would light up the enquiry line from anywhere on the plate.
      className={`relative flex flex-col ${hasCaseStudy ? "group" : ""}`}
    >
      {/* Plate. The frame keeps its crop marks outside the clip: the zoom is
          contained by the middle element, so `.frame` itself never needs
          overflow-hidden and the corner marks render whole. */}
      <div className={`frame bg-paper ${index === 0 ? "frame-marked" : ""}`}>
        <div className="aspect-[16/10] overflow-hidden">
          <div
            className={`relative h-full w-full transition-transform duration-500 ease-[var(--ease-out-quart)] ${
              hasCaseStudy ? "group-hover:scale-[1.02] group-focus-within:scale-[1.02]" : ""
            }`}
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={project.imageAlt ?? ""}
                fill
                sizes="(min-width: 1408px) 628px, (min-width: 768px) 46vw, 100vw"
                className="object-cover"
              />
            ) : (
              <ProjectVisual visual={project.visual} ratio={project.ratio} />
            )}
          </div>
        </div>
      </div>

      {/* Spec line. Reads as one mono string — index, sector, year — divided by
          hairlines rather than punctuation. */}
      <p className="label mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-3">
        <span className="tnum text-accent-ink">{number}</span>
        <span className="h-3 w-px bg-rule" aria-hidden="true" />
        <span>{project.industry}</span>
        <span className="h-3 w-px bg-rule" aria-hidden="true" />
        <span className="tnum">{project.year}</span>
      </p>

      <h3 className="mt-4 text-2xl leading-snug font-display font-semibold tracking-[-0.02em] text-ink">
        {hasCaseStudy ? (
          <a href={project.href} className="no-underline">
            <span className="link-draw">{project.name}</span>
            {/* Stretches the title's hit area over the whole card. Empty and
                aria-hidden, so the link's accessible name stays the project
                name. */}
            <span className="absolute inset-0" aria-hidden="true" />
          </a>
        ) : (
          project.name
        )}
      </h3>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {project.services.map((service) => (
          <li key={service} className="label-sm text-ink-2">
            {service}
          </li>
        ))}
      </ul>

      <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-2">{project.description}</p>

      {/* `mt-auto` pulls the action to the bottom of the tallest card in the
          row, so the actions line up across the grid even though the
          descriptions do not run to the same depth. */}
      <div className="mt-auto pt-7">
        {hasCaseStudy ? (
          // Not a link: the title above already covers the whole card. A second
          // anchor to the same page would be a duplicate tab stop.
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
            View project
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-[3px]"
            />
          </span>
        ) : (
          <a
            href="/contact"
            className="group/cta inline-flex items-center gap-2 text-sm font-semibold text-ink no-underline"
            data-cta="work-enquiry"
          >
            <span className="link-draw">Ask about work like this</span>
            <ArrowRight
              size={15}
              className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover/cta:translate-x-[3px] group-focus-visible/cta:translate-x-[3px]"
            />
          </a>
        )}
      </div>
    </Reveal>
  );
}
