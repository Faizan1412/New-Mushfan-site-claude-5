import { DemoNote, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { SHOW_STATS_NOTICE, stats } from "@/data/content";

/**
 * Trust band.
 *
 * A ruled register rather than a section: the claim on the left, the figures
 * set as a definition list on the right. Values are marked up as <dd> and
 * labels as <dt>, then visually reversed, so the reading order in a screen
 * reader stays "Projects delivered — 50+".
 *
 * The figures are placeholders. While SHOW_STATS_NOTICE is true a visible note
 * says so; it is not fine print, and it must stay until real numbers land.
 */

export function TrustStats() {
  return (
    <Section id="trust" tone="paper" ruled compact labelledBy="trust-title">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 id="trust-title" className="display-3 max-w-[15ch]">
              Built for businesses that want to grow.
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
          {/* 4-up only in the tablet band. There the figures have the full shell
              width and read as one horizontal register; at `lg` the list is back
              inside a 6-column region, where four columns would be 130px wide. */}
          <dl className="grid grid-cols-2 gap-x-8 sm:gap-x-12 md:grid-cols-4 lg:grid-cols-2">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 60} className="hairline-t flex flex-col py-5">
                <dt className="label text-ink-3">{stat.label}</dt>
                <dd className="display-3 tnum order-first font-display font-semibold">
                  <CountUp value={stat.value} />
                </dd>
              </Reveal>
            ))}
          </dl>

          {SHOW_STATS_NOTICE ? (
            <DemoNote>
              Placeholder figures shown while final numbers are confirmed — ask us for specifics on
              any of them.
            </DemoNote>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
