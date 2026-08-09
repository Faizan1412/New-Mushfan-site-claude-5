"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a numeric string from 0 to its final value when it scrolls into
 * view. Handles numeric prefixes ("+") and suffixes ("+", "%", "×").
 *
 * Non-numeric values like "Multiple" pass through unchanged — the component
 * renders them as static text so every stat slot can use the same wrapper.
 *
 * The easing is a simple ease-out quad: fast at the start, landing gently on
 * the final number. Duration is kept at 1400ms so the counter finishes well
 * before the reveal animation does, avoiding a race where the number stops
 * on an intermediate value while still in motion.
 *
 * prefers-reduced-motion: the IntersectionObserver still fires and sets the
 * final value immediately — the CSS `*{ animation-duration: 0.01ms }` override
 * handles the reveal wrapper, but this component drives its own rAF loop and
 * must read the media query itself.
 */

const DURATION = 1400; // ms

function parseNumeric(value: string): {
  prefix: string;
  number: number;
  suffix: string;
} | null {
  // Match optional leading +/-, digits, optional trailing non-digit chars
  const match = value.match(/^([+\-]?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    number: parseFloat(match[2]),
    suffix: match[3],
  };
}

function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t);
}

type CountUpProps = {
  value: string;
  className?: string;
};

export function CountUp({ value, className = "" }: CountUpProps) {
  const parsed = parseNumeric(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!parsed || hasRun.current) return;

    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = () => {
      hasRun.current = true;
      if (reduced) {
        setDisplay(value);
        return;
      }

      const start = performance.now();
      const isFloat = parsed.number !== Math.floor(parsed.number);

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / DURATION, 1);
        const eased = easeOutQuad(progress);
        const current = eased * parsed.number;
        const formatted = isFloat ? current.toFixed(1) : Math.round(current).toString();
        setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
