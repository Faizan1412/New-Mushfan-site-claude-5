"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Scroll-triggered reveal.
 *
 * One IntersectionObserver per element, disconnected as soon as it fires, so
 * nothing stays subscribed after the animation runs. `prefers-reduced-motion`
 * is handled in CSS: the .reveal class resolves to its final state.
 *
 * Elements are visible without JavaScript too — see the noscript rule in
 * app/layout.tsx — so content is never hidden from crawlers or a failed bundle.
 *
 * The initial state has to be `false` on both sides of hydration. Probing for
 * IntersectionObserver in the initialiser instead would resolve to "missing" in
 * Node and "present" in the browser, so the server would ship `is-in` and the
 * client's first render would take it straight back off — a mismatch React
 * refuses to patch, which left every revealed element visible in the SSR HTML.
 * The no-IntersectionObserver fallback therefore lives in the effect, and the
 * no-JavaScript fallback stays in CSS.
 */

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds. Keep under ~240ms so lists don't feel slow. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

export function Reveal({ children, delay = 0, as: Tag = "div", className = "" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;

    // Legacy browsers with no IntersectionObserver: reveal immediately. Written
    // straight to the node rather than through setShown, because a synchronous
    // setState here would cascade a second render on every Reveal on the page.
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      className={`reveal${shown ? " is-in" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
