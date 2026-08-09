import { Section, SectionHead, DemoNote } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import {
  SHOW_TESTIMONIALS_NOTICE,
  testimonials,
  type Testimonial,
} from "@/data/content";

/**
 * Testimonials — a ruled ledger that changes register with the viewport.
 *
 * Three equal columns only work once there is room for them. At tablet width
 * three columns come out around 200px wide, which turns a two-sentence quote
 * into ten ragged lines — so the tablet band runs the first quote full-width as
 * a lead and pairs the other two beneath it. That is a real editorial device
 * rather than a fallback, and it avoids the orphan an even 2-up would leave.
 *
 * Attribution is pinned to a shared bottom edge with `mt-auto` on the equal-height
 * rows, so the three read as one register rather than three floating cards.
 *
 * ── Honesty ──────────────────────────────────────────────────────────────────
 * While `SHOW_TESTIMONIALS_NOTICE` is true these are clearly marked illustrative:
 * each quote carries a visible "Illustrative" tag, the notice under the section
 * says so in plain language, and no avatar is rendered — a stock face beside a
 * placeholder quote would read as a real, identified person. Nothing here claims
 * to be a review, and no review platform is referenced.
 */

/**
 * Column placement per index, written out rather than computed. The lead quote
 * spans the tablet grid and then rejoins the row at `lg`, which no tidy modulo
 * expresses.
 */
const columns = [
  "md:col-span-2 lg:col-span-1 lg:pr-10",
  "md:pr-8 lg:border-l lg:border-rule lg:pr-10 lg:pl-10",
  "md:border-l md:border-rule md:pl-8 lg:border-l lg:pl-10",
];

export function Testimonials() {
  return (
    <Section id="testimonials" tone="paper-3" ruled labelledBy="testimonials-title">
      <SectionHead
        index="05"
        label="Clients"
        titleId="testimonials-title"
        title="What our clients say."
        lede="The reason businesses stay with us is rarely the deliverable. It is knowing what is happening and why."
      />

      <ul className="mt-14 md:grid md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <Reveal
            key={testimonial.id}
            as="li"
            delay={Math.min(i * 80, 240)}
            className={`hairline-t flex flex-col py-8 lg:py-10 ${columns[i] ?? ""}`}
          >
            <QuoteBlock
              testimonial={testimonial}
              index={String(i + 1).padStart(2, "0")}
              lead={i === 0}
            />
          </Reveal>
        ))}
      </ul>

      {SHOW_TESTIMONIALS_NOTICE ? (
        <DemoNote>
          These are illustrative examples written to show the layout — not real client quotes,
          and not sourced from any review platform. Genuine, permitted quotes replace them before
          launch.
        </DemoNote>
      ) : null}
    </Section>
  );
}

function QuoteBlock({
  testimonial,
  index,
  lead,
}: {
  testimonial: Testimonial;
  index: string;
  lead: boolean;
}) {
  return (
    <figure className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-4">
        <span className="label tnum text-accent-ink">{index}</span>
        {SHOW_TESTIMONIALS_NOTICE ? (
          <span className="label-sm border border-rule px-2 py-1 text-ink-3">Illustrative</span>
        ) : null}
      </div>

      {/* The lead quote is set larger only in the tablet band, where it has the
          full width to carry it. At `lg` all three sit at the same size again. */}
      <blockquote
        className={`mt-7 text-[1.0625rem] leading-relaxed text-ink lg:text-lg ${
          lead ? "md:max-w-2xl md:text-xl lg:text-lg" : ""
        }`}
      >
        <p>{testimonial.quote}</p>
      </blockquote>

      <figcaption className="hairline-t mt-8 flex flex-col gap-1 pt-5 lg:mt-auto">
        <span className="text-[0.9375rem] font-semibold text-ink">{testimonial.name}</span>
        <span className="label-sm text-ink-3">
          {[testimonial.role, testimonial.business].filter(Boolean).join(" · ")}
        </span>
      </figcaption>
    </figure>
  );
}
