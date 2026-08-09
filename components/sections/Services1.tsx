"use client";

import { useState } from "react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Frame } from "@/components/ui/Frame";
import { ArrowRight } from "@/components/ui/Icons";
import { services } from "@/data/services";

/**
 * Services1 — ARCHIVED VARIANT, not rendered anywhere.
 *
 * The original two-pane index: numbered list on the left, one sticky detail
 * panel on the right that swapped content on hover and focus. Kept verbatim so
 * the approach can be restored by importing `Services1` in app/page.tsx in
 * place of `Services`.
 *
 * Its trade-off, and the reason the live section moved on: the detail panel is
 * hover-driven, so it only exists from `lg` up and every touch visitor reads a
 * different, plainer section. It is also a client component purely to track
 * which row the pointer is over.
 *
 * ── original notes ───────────────────────────────────────────────────────────
 * Left: the numbered list, set as an index with hairline rows. Right: one
 * detail panel that swaps content as the pointer or keyboard focus moves down
 * the list. Because the panel is a single fixed element, nothing reflows on
 * hover — the only thing that changes is the copy inside it.
 *
 * Accessibility notes:
 * - The list is real content, so it renders as an <ol> with links to /contact;
 *   the panel is supplementary and marked aria-hidden, since everything in it
 *   is already read out from the list row itself.
 * - Selection follows focus as well as hover, so a keyboard user gets the same
 *   information a mouse user does.
 * - Below `lg` the panel is dropped entirely and each row shows its own summary
 *   inline. Hover-only content has no place on a touch screen.
 */

export function Services1() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex];

  return (
    <Section id="services" tone="paper-2" ruled labelledBy="services-title">
      <SectionHead
        index="01"
        label="Services"
        titleId="services-title"
        title="Everything you need to grow digitally."
        lede="From strategy and creative to technology and performance, we bring the pieces of your digital presence together."
      />

      <div className="mt-14 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-x-10">
        {/* Index. The panel keeps the last-selected service rather than
            resetting on mouse-leave: a reset makes the panel snap back to 01
            whenever the page scrolls under a parked pointer. */}
        <ol className="lg:col-span-7">
          {services.map((service, i) => {
            const isActive = i === activeIndex;
            return (
              <Reveal
                key={service.index}
                as="li"
                delay={Math.min(i * 40, 200)}
                className="hairline-b first:hairline-t"
              >
                <a
                  href="/contact"
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  className="group flex items-baseline gap-5 py-6 no-underline sm:gap-8 lg:py-7"
                  aria-describedby={`service-summary-${service.index}`}
                >
                  <span
                    className={`label tnum shrink-0 transition-colors duration-200 ${
                      isActive ? "text-accent-ink" : "text-ink-3"
                    }`}
                  >
                    {service.index}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="display-3 block text-ink transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1 lg:group-focus-visible:translate-x-1">
                      {service.title}
                    </span>
                    {/* The summary is the row's own content on small screens,
                        where there is no detail panel to carry it. */}
                    <span
                      id={`service-summary-${service.index}`}
                      className="mt-3 block max-w-md text-[0.9375rem] leading-relaxed text-ink-2 lg:hidden"
                    >
                      {service.summary}
                    </span>
                  </span>

                  <ArrowRight
                    className="btn-arrow mt-2 shrink-0 text-ink-3 transition-colors duration-200 group-hover:text-accent-ink"
                    size={18}
                  />
                </a>
              </Reveal>
            );
          })}
        </ol>

        {/* Detail panel — desktop only, aria-hidden because the list rows
            already carry every word of it. */}
        <div className="hidden lg:col-span-4 lg:col-start-9 lg:block" aria-hidden="true">
          <div className="lg:sticky lg:top-28">
            {/* The frame is pinned to a constant height, so its width — not the
                panel's height — carries the ratio. A ratio-driven height would
                swing from 228px at 16:9 to ~720px at 9:16 and shove the whole
                panel around on every hover.

                The height steps with the breakpoint because the widest ratio is
                what has to fit: at 16:9 the frame is 1.78× as wide as it is
                tall, and the panel column is only ~288px at 1024px. A single
                h-56 would compute 398px wide there and break out of the grid. */}
            <div className="flex h-36 items-end xl:h-48">
              <Frame
                ratio={ratioValue(active.ratio)}
                marked
                className="grid h-full place-items-center"
              >
                <span className="label-sm text-ink-3">{active.ratio}</span>
              </Frame>
            </div>

            <p className="label mt-6 text-accent-ink">{active.index}</p>
            <p className="mt-4 text-lg leading-snug font-display font-semibold tracking-[-0.02em] text-ink">
              {active.title}
            </p>
            {/* Reserved height for the two variable-length blocks below, so the
                panel is a fixed object that swaps contents rather than one that
                resizes under the pointer. */}
            <p className="mt-3 min-h-16 text-[0.9375rem] leading-relaxed text-ink-2">
              {active.summary}
            </p>

            <ul className="mt-6">
              {active.deliverables.map((item) => (
                <li
                  key={item}
                  className="hairline-t flex items-start gap-3 py-2.5 text-sm text-ink-2"
                >
                  <span className="reg-dot mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

/** Maps the data's display tag ("16:9") to a CSS aspect-ratio. */
function ratioValue(ratio: string) {
  return ratio.replace(":", " / ");
}
