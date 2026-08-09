import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/data/content";

/**
 * Process — a five-station track.
 *
 * The connecting line is not a separate decorative element: each step owns a top
 * hairline, and because the columns sit flush against one another (spacing comes
 * from internal padding, never from a grid gap) the five borders resolve into one
 * unbroken rule across the section. A gap-based grid would chop it into dashes.
 *
 * The axis rotates with the viewport — a left rule with nodes down the side on
 * small screens, the horizontal track from `lg` up — which is why the border and
 * node offsets are both flipped at that breakpoint rather than duplicated into
 * two separate markup trees.
 */

export function Process() {
  return (
    <Section id="process" tone="paper-2" ruled labelledBy="process-title">
      <SectionHead
        index="04"
        label="Process"
        titleId="process-title"
        title="From idea to impact."
        lede="Five stages, run in the open. You always know what is in progress, what comes next, and what it is measured against."
      />

      <ol className="mt-14 lg:mt-24 lg:grid lg:grid-cols-5">
        {processSteps.map((step, i) => (
          <Reveal
            key={step.index}
            as="li"
            delay={Math.min(i * 80, 320)}
            className={[
              "relative border-l border-rule pb-10 pl-6 last:pb-0",
              "lg:hairline-t lg:border-l-0 lg:pt-8 lg:pb-0 lg:pl-0",
              i < processSteps.length - 1 ? "lg:pr-8" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {/* Station node, centred on whichever rule is currently drawn. */}
            <span
              className="absolute top-1.5 -left-[3px] h-1.5 w-1.5 bg-accent lg:top-[-3px] lg:left-0"
              aria-hidden="true"
            />

            <p className="label tnum text-ink-3">
              Step <span className="text-accent-ink">{step.index}</span>
            </p>

            <h3 className="mt-4 text-xl font-display font-semibold tracking-[-0.02em] text-ink lg:text-[1.375rem]">
              {step.title}
            </h3>

            <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink-2 lg:max-w-none">
              {step.body}
            </p>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={120}>
        <p className="label-sm mt-12 flex items-start gap-2 text-ink-3 lg:mt-16">
          <span className="reg-dot mt-1" aria-hidden="true" />
          <span className="normal-case tracking-normal">
            Step 05 does not end. Optimization continues for as long as we run the work.
          </span>
        </p>
      </Reveal>
    </Section>
  );
}
