import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { heroDeliverables, heroDisciplines, heroLede } from "@/data/content";

/**
 * Hero — the artboard.
 *
 * Three registers on one drafting sheet: the headline at full measure, a ruled
 * band carrying the lede and the disciplines, then a specimen row of the four
 * formats the studio actually ships (16:9 site, 9:16 reel, 1:1 post, 4:5 ad).
 * The frames are hairline-only and unfilled — they set structure and scale
 * without competing with the type.
 *
 * The headline's forced line breaks only apply from `lg` up, where the measured
 * width of the longest line fits inside the shell (see the --text-display-1
 * note in globals.css). Below that the spans are inline and the copy wraps on
 * its own. Inline boxes ignore `transform`, so the settle animation resolves to
 * a plain fade at small sizes — intentional, and still reduced-motion safe.
 *
 * Fully server-rendered, and the load sequence is pure CSS, so the largest text
 * paints with the document — no JavaScript on the critical path for LCP.
 */

const delay = (ms: number) => ({ "--settle-delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-paper">
      {/* Background video — parallax layer. Moves at 10% of scroll speed via
          --parallax-bg, so it visually recedes as the user scrolls into the
          next section. The scale(1.15) overshoot ensures the edges never
          expose the paper background during the shift. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.06, scale: "1.15", willChange: "transform" }}
        data-parallax="1"
        src="/bg-hero.mp4"
      />

      {/* Drafting grid: hairlines on the artboard rhythm, faded at both ends.
          Parallax at half the video rate so the two layers separate gently. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ willChange: "transform" }}
        data-parallax="0.5"
      >
        <div className="shell h-full">
          <div className="grid h-full grid-cols-4 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]">
            <div className="border-l border-rule" />
            <div className="border-l border-rule" />
            <div className="border-l border-rule" />
            <div className="border-x border-rule" />
          </div>
        </div>
      </div>

      <div className="shell relative pb-section-sm pt-12 sm:pt-16 lg:pt-24">
        <p className="settle label flex items-center gap-3 text-ink-2" style={delay(0)}>
          <span className="reg-dot" aria-hidden="true" />
          Digital Studio — India
        </p>

        <h1 id="hero-title" className="display-1 mt-7 lg:mt-9">
          <span className="settle inline lg:block" style={delay(80)}>
            Transforming Ideas
          </span>{" "}
          <span className="settle inline lg:block" style={delay(170)}>
            Into Digital
          </span>{" "}
          <span className="settle inline lg:block" style={delay(260)}>
            Growth
            <span className="text-accent-ink">.</span>
          </span>
        </h1>

        {/* Second register: the argument on the left, the disciplines as a spec
            panel on the right. */}
        <div className="hairline-t mt-8 grid gap-y-10 pt-8 lg:mt-12 lg:grid-cols-12 lg:gap-x-10 lg:pt-10">
          <div className="lg:col-span-6">
            <p className="settle lede max-w-xl" style={delay(380)}>
              {heroLede}
            </p>

            <div
              className="settle mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={delay(460)}
            >
              <ButtonLink href="/contact" variant="primary" arrow data-cta="hero-primary">
                Start a Project
              </ButtonLink>
              <ButtonLink href="#work" variant="secondary" data-cta="hero-secondary">
                Explore Our Work
              </ButtonLink>
            </div>
          </div>

          <ul
            className="settle grid grid-cols-2 gap-x-8 sm:grid-cols-4 lg:col-span-4 lg:col-start-9 lg:grid-cols-1 lg:gap-x-0"
            style={delay(540)}
          >
            {heroDisciplines.map((discipline) => (
              <li
                key={discipline}
                className="hairline-t label py-3 text-ink-2 sm:py-0 sm:pt-3 lg:py-3.5"
              >
                {discipline}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
