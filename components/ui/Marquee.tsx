"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Play, Pause, ArrowRight } from "@/components/ui/Icons";

/**
 * Continuous marquee rail.
 *
 * The track carries the same items twice and slides by exactly -50%, so the
 * second copy arrives where the first began and the loop has no visible seam.
 * The mechanics live in globals.css (`.marquee`); this component only supplies
 * the duplicate copy and the pause state.
 *
 * It is a client component for one reason: the pause control. The items
 * themselves are passed in as children, so they are still rendered on the
 * server — nothing about the cards ends up in the client bundle.
 *
 * On pausing. The rail keeps moving under the pointer by design, so hover is
 * not a pause. That leaves the button as the only general way to stop it, which
 * matters: content that moves on its own indefinitely needs a mechanism to halt
 * it (WCAG 2.2.2), and hover would never have covered touch anyway. Focus-within
 * still pauses, but only fires from keyboard tabbing. Under
 * `prefers-reduced-motion` the rail does not animate at all — it becomes an
 * ordinary horizontal scroller — so the button is swapped for a scroll hint,
 * because a pause control for something already still is just a dead widget.
 */

type MarqueeProps = {
  children: ReactNode;
  /** Time for one full pass of a single copy. Longer is slower. */
  duration?: string;
  /** Accessible name for the underlying list. */
  label: string;
  /** Applied to the rail itself, not the wrapper — this is where a caller puts
      its full-bleed margins, so the controls below stay on the text margin. */
  className?: string;
};

export function Marquee({ children, duration = "52s", label, className = "" }: MarqueeProps) {
  const [paused, setPaused] = useState(false);

  return (
    <div>
      {/* py-1 keeps the frames' corner crop marks — which sit at -1px — inside
          the clip that `overflow: hidden` imposes. */}
      <div
        className={`marquee py-1 ${paused ? "is-paused" : ""} ${className}`}
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        <div className="marquee-track">
          <ul className="flex" aria-label={label}>
            {children}
          </ul>
          {/* The duplicate is what makes the loop seamless. It is the same
              items again, so it is hidden from assistive tech and taken out of
              the tab order — `inert` covers the links inside it, which
              aria-hidden alone would leave focusable and would strand a
              keyboard user on an invisible copy. Dropped entirely in the
              reduced-motion fallback, where the reader scrolls by hand and
              would otherwise meet the list twice. */}
          <ul className="marquee-clone flex" aria-hidden="true" inert>
            {children}
          </ul>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="when-motion label-sm mt-8 inline-flex items-center gap-2 text-ink-3 transition-colors duration-200 hover:text-ink"
      >
        {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
        {paused ? "Play" : "Pause"}
      </button>

      <p className="when-reduced-motion label-sm mt-8 items-center gap-2 text-ink-3">
        <ArrowRight size={13} aria-hidden="true" />
        <span>Scroll for more</span>
      </p>
    </div>
  );
}
