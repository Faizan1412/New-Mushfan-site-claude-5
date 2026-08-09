import { Section, SectionHead, DemoNote } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { SHOW_RESULTS_NOTICE, results } from "@/data/content";

/**
 * Results — three metrics set as a ruled data sheet.
 *
 * The figures are the largest type in the section, which is exactly why the
 * labelling around them has to be unambiguous. While `SHOW_RESULTS_NOTICE` is
 * true each metric carries a visible "Demo" tag, the heading area states these
 * are illustrative, and the note below explains what would replace them. A
 * number this size with no provenance is a claim, so the page never lets one
 * stand unqualified.
 *
 * `tnum` keeps the figures on tabular figures so the three sit on a common
 * width and read as a table rather than as three unrelated headlines.
 *
 * Three columns start at `md`: the content here is a short figure and one line
 * of detail, which is exactly what survives a 200px column — unlike the quotes
 * in the section above, which need the extra breakpoint.
 */

export function Results() {
  return (
    <Section id="results" tone="paper" ruled labelledBy="results-title">
      <SectionHead
        index="06"
        label="Results"
        titleId="results-title"
        title="Designed for results."
        lede="Every engagement is measured against numbers agreed at the start — reach, engagement and qualified leads, reported as they move."
      />

      <dl className="mt-14 md:grid md:grid-cols-3 lg:mt-20">
        {results.map((metric, i) => (
          <Reveal
            key={metric.label}
            delay={Math.min(i * 80, 240)}
            className={[
              "hairline-t py-8 lg:py-10",
              i === 0 ? "md:pr-8 lg:pr-10" : "md:border-l md:border-rule md:pl-8 lg:pl-10",
              i === 1 ? "md:pr-8 lg:pr-10" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="flex items-center justify-between gap-4">
              <dt className="label text-ink-2">{metric.label}</dt>
              {SHOW_RESULTS_NOTICE ? (
                <span className="label-sm border border-rule px-2 py-1 text-ink-3">Demo</span>
              ) : null}
            </div>

            <dd>
              <span className="display-2 tnum mt-6 block font-display font-semibold text-ink">
                <CountUp value={metric.value} />
              </span>
              <span className="mt-4 block max-w-xs text-[0.9375rem] leading-relaxed text-ink-2">
                {metric.detail}
              </span>
            </dd>
          </Reveal>
        ))}
      </dl>

      {SHOW_RESULTS_NOTICE ? (
        <DemoNote>
          Demonstration figures showing how results are reported — not measured outcomes, not
          averages, and not tied to any past engagement. Real campaign numbers, attributed to the
          work that produced them, replace these once live.
        </DemoNote>
      ) : null}
    </Section>
  );
}
