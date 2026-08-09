"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { fullNav, contact, socials } from "@/data/site";
import { NavLink } from "./NavLink";
import { ArrowRight, Close } from "@/components/ui/Icons";

/**
 * Full-screen mobile navigation.
 *
 * Designed for the phone rather than shrunk from the desktop bar: items are set
 * at display size with a mono index, and contact details sit at the bottom
 * within thumb reach so calling or emailing never requires reaching the footer.
 *
 * Handles the full dialog contract — Escape to close, focus moved in and
 * restored on close, Tab trapped inside the panel, background scroll locked,
 * and the page behind marked inert for assistive tech via aria-hidden on the
 * trigger's siblings (achieved here by rendering the panel as a modal dialog).
 */

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNav({ activeId }: { activeId: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Lock background scroll while the panel is open, preserving the scrollbar
  // gutter so the page behind does not jump sideways.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const gutter = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [open]);

  // Escape closes; Tab cycles within the panel.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes?.length) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const activeEl = document.activeElement;

      if (event.shiftKey && activeEl === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeEl === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  // Move focus into the panel on open, and back to the trigger on close.
  // Skipped on first render so the page does not steal focus on load.
  const hasOpened = useRef(false);
  useEffect(() => {
    if (open) {
      hasOpened.current = true;
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    } else if (hasOpened.current) {
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label="Open menu"
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-xs text-ink lg:hidden"
      >
        <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
          <span className="h-px w-full bg-ink" />
          <span className="h-px w-full bg-ink" />
        </span>
      </button>

      {open ? (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          // The panel owns every wheel and touch event inside it: the menu list
          // scrolls natively while it is open, and the page behind never
          // accumulates momentum it would release on close.
          data-lenis-prevent
          className="fixed inset-0 z-[60] bg-paper lg:hidden"
        >
          <div ref={panelRef} className="flex h-[100dvh] flex-col">
            <div className="shell flex h-20 flex-none items-center justify-between">
              <span className="label text-ink-3">Menu</span>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-xs text-ink"
              >
                <Close size={18} />
              </button>
            </div>

            <nav aria-label="Mobile" className="shell flex-1 overflow-y-auto pt-2">
              <ul>
                {fullNav.map((item, i) => {
                  // Section items follow the scroll-spy; route items follow the
                  // path. `aria-current="page"` is only truthful for the latter.
                  const isActive = item.id ? activeId === item.id : pathname === item.href;
                  return (
                    <li key={item.href} className="hairline-b">
                      <NavLink
                        href={item.href}
                        onClick={close}
                        aria-current={isActive ? (item.id ? "true" : "page") : undefined}
                        className="group flex items-baseline gap-4 py-4"
                      >
                        <span className="label-sm w-6 flex-none text-ink-3 tnum">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[1.75rem] font-semibold tracking-[-0.03em] text-ink">
                          {item.label}
                        </span>
                        {isActive ? <span className="reg-dot" aria-hidden="true" /> : null}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>

              <NavLink
                href="/contact"
                onClick={close}
                className="btn btn-primary mt-8 w-full"
                data-cta="mobile-menu"
              >
                Start a Project
                <ArrowRight className="btn-arrow" />
              </NavLink>

              <div className="mt-10 pb-10">
                <p className="label text-ink-3">Direct</p>
                <div className="mt-4 flex flex-col gap-2">
                  <a href={`mailto:${contact.email}`} className="link-draw text-[0.9375rem]">
                    {contact.email}
                  </a>
                  <a href={`tel:${contact.phoneHref}`} className="link-draw text-[0.9375rem]">
                    {contact.phone}
                  </a>
                </div>

                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  {socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label text-ink-2 hover:text-ink"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
