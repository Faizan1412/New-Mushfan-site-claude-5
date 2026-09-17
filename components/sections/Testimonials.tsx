import { Section, SectionHead, DemoNote } from "@/components/ui/Section";
import { Marquee } from "@/components/ui/Marquee";
import { Star } from "@/components/ui/Icons";
import {
  SHOW_TESTIMONIALS_NOTICE,
  testimonials,
  type Testimonial,
} from "@/data/content";

/**
 * Testimonials — Google-Review-style cards on an auto-scrolling rail.
 *
 * The rail slides on its own, pauses on focus or click, and degrades to a
 * hand-scrollable strip under prefers-reduced-motion. The mechanics live in
 * `Marquee`; this component only defines the card.
 */

const MAX_RATING = 5;

export function Testimonials() {
  return (
    <Section id="testimonials" tone="paper-3" ruled labelledBy="testimonials-title">
      <SectionHead
        index="05"
        label="Clients"
        titleId="testimonials-title"
        lede="The reason businesses stay with us is rarely the deliverable. It is knowing what is happening and why."
      />

      <div className="mt-14 lg:mt-20">
        <Marquee
          label="Client reviews"
          duration="72s"
          className="-mx-5 px-5 [--marquee-fade:2.5rem] sm:-mx-8 sm:px-8 sm:[--marquee-fade:4rem] xl:-mx-14 xl:px-14 xl:[--marquee-fade:6rem]"
        >
          {testimonials.map((testimonial) => (
            <li
              key={testimonial.id}
              className="mr-4 w-[88vw] shrink-0 sm:mr-6 sm:w-[20rem] lg:w-[22rem]"
            >
              <ReviewCard testimonial={testimonial} />
            </li>
          ))}
        </Marquee>

        {SHOW_TESTIMONIALS_NOTICE ? (
          <DemoNote>
            Illustrative examples written to show the layout — not real client reviews, and not
            sourced from any review platform. Genuine, permitted reviews replace them before
            launch.
          </DemoNote>
        ) : null}
      </div>
    </Section>
  );
}

function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="hairline flex h-full flex-col rounded-xs bg-paper p-6 shadow-raise lg:p-7">
      <header className="flex items-center justify-between gap-4">
        <RatingRow rating={testimonial.rating} />
        <span className="label-sm text-ink-3">{testimonial.date}</span>
      </header>

      <div className="mt-5">
        {SHOW_TESTIMONIALS_NOTICE ? (
          <span className="label-sm mb-2 inline-flex w-fit border border-rule px-2 py-1 text-ink-3">
            Illustrative
          </span>
        ) : null}
        <p className="text-[0.9375rem] font-semibold text-ink">{testimonial.name}</p>
        <p className="label-sm mt-1 text-ink-3">
          {[testimonial.role, testimonial.business].filter(Boolean).join(" · ")}
        </p>
      </div>

      <blockquote className="mt-5 text-[0.9375rem] leading-relaxed text-ink lg:text-[1rem]">
        <p>“{testimonial.quote}”</p>
      </blockquote>

      <p className="mt-6 inline-flex items-center gap-3 lg:mt-auto">
        <span className="rail-rule" aria-hidden="true" />
        <span className="label tnum text-accent-ink">{testimonial.engagement}</span>
      </p>
    </article>
  );
}

function RatingRow({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-1 text-accent"
      role="img"
      aria-label={`Rated ${rating} out of ${MAX_RATING}`}
    >
      {Array.from({ length: MAX_RATING }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-accent" : "text-rule"}
        />
      ))}
    </div>
  );
}
