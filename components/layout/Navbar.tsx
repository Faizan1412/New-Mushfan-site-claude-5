"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { primaryNav, site } from "@/data/site";
import { Wordmark } from "./Wordmark";
import { NavLink } from "./NavLink";
import { MobileNav } from "./MobileNav";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * Sticky header.
 *
 * Two states: at rest it is transparent with roomy padding; once scrolled it
 * compacts, gains a hairline and a translucent backdrop. Both the height and the
 * blur change, so the transition is written on specific properties rather than
 * `all` to keep it off the compositor's slow path.
 *
 * Two kinds of active state, because the nav mixes two kinds of link. Route
 * items are active when the path matches — known on the server, so they are
 * correct on first paint. Section items are tracked with an IntersectionObserver
 * over the homepage landmarks (no scroll listener, no per-frame layout reads),
 * and are inert anywhere else: off the homepage those sections do not exist, so
 * the observer finds nothing and no section is ever marked current.
 */

const SECTION_IDS = primaryNav.map((item) => item.id).filter(Boolean) as string[];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [observedSection, setObservedSection] = useState<string | null>(null);

  // Derived, not stored. Off the homepage there are no section landmarks to
  // observe, so the last id the observer saw before navigating away must not
  // keep marking a nav item current — and clearing it in an effect would be a
  // second render to undo state we can simply not read.
  const activeSection = isHome ? observedSection : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The section occupying the most of the viewport band wins.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setObservedSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full",
        "transition-[background-color,border-color,backdrop-filter] duration-300 ease-[var(--ease-out-quart)]",
        scrolled
          ? "border-b border-rule bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-paper",
      ].join(" ")}
    >
      <div className="shell">
        <div
          className={[
            "flex items-center justify-between gap-6",
            "transition-[height] duration-300 ease-[var(--ease-out-quart)]",
            scrolled ? "h-16" : "h-20 sm:h-[5.5rem]",
          ].join(" ")}
        >
          <NavLink
            href="/"
            className="-m-2 rounded-xs p-2 text-ink"
            aria-label={`${site.name} — home`}
          >
            <Wordmark compact={scrolled} />
          </NavLink>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {primaryNav.map((item) => {
                const isActive = item.id ? activeSection === item.id : pathname === item.href;
                return (
                  <li key={item.href}>
                    <NavLink
                      href={item.href}
                      aria-current={isActive ? (item.id ? "true" : "page") : undefined}
                      className={`inline-flex items-center gap-2 py-1 text-[0.9375rem] font-medium tracking-[-0.008em] transition-colors duration-200 hover:text-ink ${
                        isActive ? "text-ink" : "text-ink-2"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-[5px] w-[5px] rounded-full bg-accent transition-opacity duration-300 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <NavLink
              href="/contact"
              className="btn btn-primary btn-sm hidden sm:inline-flex"
              data-cta="header"
            >
              Let&rsquo;s Talk
              <ArrowRight className="btn-arrow" />
            </NavLink>
            <MobileNav activeId={activeSection} />
          </div>
        </div>
      </div>
    </header>
  );
}
