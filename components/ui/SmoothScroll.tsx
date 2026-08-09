"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum scrolling.
 *
 * Lenis reads wheel events and eases the page toward a target position, which
 * gives the weighted, gliding feel the site's motion language already implies.
 * It drives the real scroll position via `window.scrollTo` rather than
 * transforming a wrapper, so `position: sticky` (the header, the section rail)
 * and every IntersectionObserver on the page keep working untouched.
 *
 * Three deliberate limits:
 *
 * - Touch is left native. `syncTouch` is off, so phones keep the OS momentum
 *   they already do better than any library, and the address-bar collapse and
 *   rubber-band edges behave normally.
 * - Under `prefers-reduced-motion` Lenis is never constructed. Its own
 *   `respectReducedMotion` only flattens the easing while still routing scroll
 *   through JavaScript; not mounting at all is the honest version, and the CSS
 *   in globals.css already covers anchor jumps for that path.
 * - Anchor links are eased by the handler below rather than by Lenis's own
 *   `anchors` option. That option calls `scrollTo` but never cancels the click,
 *   so the browser's default fragment navigation still fires and jumps the page
 *   to the target instantly — measured, it lands there in the same tick and
 *   nothing eases at all. Cancelling the default is what makes an anchor glide.
 */

/** Matches scroll-padding-top in globals.css: sticky header + breathing room. */
const HEADER_OFFSET = 104;

export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    /**
     * Same-page fragment links, eased.
     *
     * Cancelling the browser's default navigation also cancels the focus move
     * it would have done, so focus is placed on the target by hand. Without
     * that, a keyboard user who follows "Skip to content" keeps tabbing from
     * the header and the link does nothing for the people it exists for.
     * `preventScroll` keeps that focus call from undoing the animation.
     */
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as HTMLElement | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.target && link.target !== "_self") return;

      const url = new URL(link.href);
      const here = new URL(window.location.href);
      if (url.origin !== here.origin || url.pathname !== here.pathname || !url.hash) return;

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target || !lenis) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: -HEADER_OFFSET });
      history.pushState(null, "", url.hash);

      // Sections are not focusable by default; -1 makes them a focus target
      // without adding them to the tab order.
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    const sync = () => {
      if (query.matches) {
        lenis?.destroy();
        lenis = null;
        document.removeEventListener("click", onClick);
        return;
      }
      if (lenis) return;

      lenis = new Lenis({
        // 0.09 lands just past the default: enough weight to read as momentum,
        // short enough that the page still stops where the user expects.
        lerp: 0.09,
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: true,
        // Kills leftover inertia when a route link is clicked, so the next page
        // does not inherit a glide that belonged to the last one.
        stopInertiaOnNavigate: true,
      });

      // Write parallax transforms directly to each element rather than via a
      // CSS custom property on :root. Setting --parallax-bg on documentElement
      // forces the browser to re-evaluate the entire document's style cascade on
      // every RAF frame — that is the exact cause of the choppy-scroll feel.
      // Writing element.style.transform is scoped to just those nodes and runs
      // entirely on the compositor thread.
      //
      // Elements opt in by adding data-parallax="<rate>" where rate is a
      // multiplier on the base 10% scroll offset (1 = full rate, 0.5 = half).
      const parallaxEls = Array.from(
        document.querySelectorAll<HTMLElement>("[data-parallax]"),
      );

      lenis.on("scroll", ({ scroll }: { scroll: number }) => {
        for (const el of parallaxEls) {
          const rate = parseFloat(el.dataset.parallax ?? "1");
          el.style.transform = `translateY(${(scroll * 0.1 * rate).toFixed(1)}px)`;
        }
      });

      document.addEventListener("click", onClick);
    };

    sync();
    query.addEventListener("change", sync);

    return () => {
      query.removeEventListener("change", sync);
      document.removeEventListener("click", onClick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
