"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * The one rule the site's chrome uses to link.
 *
 * Two cases, decided by whether the target is the page you are already on:
 *
 * - Same page, with a fragment (`/#services` from `/`) → a bare `<a href="#…">`.
 *   That is a same-document fragment navigation, which is what honours the
 *   `scroll-behavior: smooth` and `scroll-padding-top` already set in
 *   globals.css. Routing it through next/link replaces both with its own scroll
 *   handling, which is how an anchor ends up landing under the sticky header.
 *
 * - Anywhere else (`/about`, or `/#services` from `/about`) → next/link, so
 *   moving between pages is a client navigation with no white flash. The hash
 *   survives the transition and the browser scrolls on arrival.
 *
 * Navbar, MobileNav, the footer and the breadcrumb all link from the same data,
 * so the rule lives here once rather than being re-decided in four components.
 */

type NavLinkProps = { href: string } & Omit<ComponentProps<"a">, "href">;

export function NavLink({ href, children, ...rest }: NavLinkProps) {
  const pathname = usePathname();

  const hashAt = href.indexOf("#");
  const path = hashAt === -1 ? href : href.slice(0, hashAt);
  const hash = hashAt === -1 ? "" : href.slice(hashAt);

  // `/#services` and `/about#x` both normalise to a path without the trailing
  // slash that `/` would otherwise keep, so the comparison is like-for-like.
  const targetPath = path === "" ? pathname : path.length > 1 ? path.replace(/\/$/, "") : path;

  if (hash && targetPath === pathname) {
    return (
      <a href={hash} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
