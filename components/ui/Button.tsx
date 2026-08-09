import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "./Icons";

/**
 * Button / link with a shared visual contract.
 *
 * Renders an anchor when `href` is set and a real <button> otherwise, so
 * keyboard and screen-reader semantics stay correct. Routes go through
 * next/link; anything with a fragment stays a plain anchor so the browser's
 * own fragment scrolling — and the smooth-scroll set in globals.css — applies.
 */

type Variant = "primary" | "secondary";

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  /** Appends a trailing arrow that shifts on hover. */
  arrow?: boolean;
  className?: string;
};

function classes({ variant = "primary", size = "md", className = "" }: SharedProps) {
  return ["btn", `btn-${variant}`, size === "sm" ? "btn-sm" : "", className]
    .filter(Boolean)
    .join(" ");
}

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      {children}
      {arrow ? <ArrowRight className="btn-arrow" /> : null}
    </>
  );
}

type ButtonLinkProps = SharedProps & { href: string } & Omit<
    ComponentProps<"a">,
    "href" | "className" | "children"
  >;

export function ButtonLink({
  href,
  children,
  variant,
  size,
  arrow,
  className,
  ...rest
}: ButtonLinkProps) {
  const cls = classes({ children, variant, size, className });
  const isRoute = href.startsWith("/") && !href.includes("#");

  if (isRoute) {
    return (
      <Link href={href} className={cls} {...rest}>
        <Inner arrow={arrow}>{children}</Inner>
      </Link>
    );
  }

  return (
    <a href={href} className={cls} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </a>
  );
}

type ButtonProps = SharedProps & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({
  children,
  variant,
  size,
  arrow,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={classes({ children, variant, size, className })} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
