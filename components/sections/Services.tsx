import Image from "next/image";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import { services } from "@/data/services";

/**
 * Services — five editorial spreads on one ruled sheet.
 *
 * Each service takes a full row of the artboard grid and alternates which side
 * carries the specimen frame, so the eye zig-zags down the section instead of
 * scanning a column of equal cards. The hairline at the top of every row is the
 * only divider; with no grid gaps the rows read as one continuous ruled sheet,
 * the same device the process track uses.
 *
 * Why this rather than the hover-swap index it replaces (kept in Services1.tsx):
 * - Nothing is hover-only, so a touch visitor gets the whole section. The old
 *   detail panel existed only from `lg` up, and phones saw a plainer variant
 *   with no deliverables at all.
 * - No client JavaScript. The old version was a client component purely to
 *   track which row the pointer was over; this one is fully server-rendered,
 *   which takes the whole section off the hydration path.
 *
 * Layout notes:
 * - Reading order is fixed: copy first, frame second. The frame is decorative,
 *   so moving it across the grid on alternate rows changes nothing for a screen
 *   reader or for keyboard order.
 * - Both columns are pinned to `lg:row-start-1`. Without it, sparse
 *   auto-placement drops the reversed frame onto a second row.
 * - The frame is a fixed height with a ratio-driven width, so a 9:16 reel and a
 *   16:9 site occupy the same band and the rows stay level.
 */

export function Services() {
  return (
    <Section id="services" tone="paper-2" ruled labelledBy="services-title">
      <SectionHead
        index="01"
        label="Services"
        titleId="services-title"
        lede="From strategy and creative to technology and performance, we bring the pieces of your digital presence together."
      />

      <ol className="mt-14 lg:mt-20">
        {services.map((service, i) => {
          const framesLeft = i % 2 === 1;

          return (
            <Reveal
              key={service.index}
              as="li"
              delay={Math.min(i * 60, 240)}
              className="hairline-t"
            >
              <div className="group py-10 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:py-14">
                {/* Copy */}
                <div
                  className={`lg:row-start-1 lg:col-span-6 ${
                    framesLeft ? "lg:col-start-7" : "lg:col-start-1"
                  }`}
                >
                  <p className="label tnum flex items-center gap-4 text-accent-ink">
                    {service.index}
                    <span className="rail-rule" aria-hidden="true" />
                  </p>

                  <h3 className="display-2 mt-5">
                    <a
                      href={`/services/${service.slug}`}
                      className="inline-flex items-baseline gap-3 text-ink no-underline transition-[color,transform,translate] duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1 group-hover:text-accent-ink focus-visible:text-accent-ink"
                      data-cta={`service-${service.index}`}
                    >
                      {service.title}
                      <ArrowRight
                        className="btn-arrow shrink-0 self-center text-ink-3 transition-colors duration-200 group-hover:text-accent-ink"
                        size={20}
                      />
                    </a>
                  </h3>

                  <p className="mt-4 max-w-md leading-relaxed text-ink-2">{service.summary}</p>

                  {/* Deliverables. Two columns from `sm` up — each entry is a
                      short phrase, and a single column would leave most of the
                      measure empty. Every row carries its own top rule, so the
                      list needs no first/last special-casing in either count. */}
                  <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="hairline-t py-3 text-[0.875rem] leading-snug text-ink-2"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specimen image */}
                {service.image && (
                  <div
                    className={`hidden lg:row-start-1 lg:col-span-5 lg:flex lg:items-center ${
                      framesLeft ? "lg:col-start-1 lg:justify-start" : "lg:col-start-8 lg:justify-end"
                    }`}
                    aria-hidden="true"
                  >
                    <div className="relative w-4/5 overflow-hidden rounded-xl">
                      <Image
                        src={service.image}
                        alt=""
                        width={600}
                        height={400}
                        className="h-auto w-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}

/** Maps the data's display tag ("16:9") to a CSS aspect-ratio. */
function ratioValue(ratio: string) {
  return ratio.replace(":", " / ");
}
