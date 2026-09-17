/**
 * Inline icon set.
 *
 * Hand-drawn on a 16px grid with a 1.5px stroke to match the hairline system —
 * an icon library would ship far more weight than these six paths and would not
 * share the drafting line weight. All are decorative: every icon sits next to a
 * text label or inside a button with an accessible name.
 */

type IconProps = {
  className?: string;
  size?: number;
};

function base(size: number, className?: string) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
    className,
  };
}

export function ArrowRight({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M2.5 8h11M9.5 4l4 4-4 4" />
    </svg>
  );
}

export function ArrowUpRight({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M4.5 11.5l7-7M6 4.5h5.5V10" />
    </svg>
  );
}

export function Plus({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

export function Close({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

export function Play({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)} fill="currentColor" stroke="none">
      <path d="M5.5 3.6a.6.6 0 0 1 .92-.5l6 4.4a.6.6 0 0 1 0 1l-6 4.4a.6.6 0 0 1-.92-.5V3.6Z" />
    </svg>
  );
}

export function Pause({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)} fill="currentColor" stroke="none">
      <rect x="4.5" y="3.4" width="2.6" height="9.2" rx="0.6" />
      <rect x="8.9" y="3.4" width="2.6" height="9.2" rx="0.6" />
    </svg>
  );
}

export function Check({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M3 8.5l3.5 3.5L13 5" />
    </svg>
  );
}

export function Alert({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M8 5v3.5M8 11h.01" />
      <circle cx="8" cy="8" r="6" />
    </svg>
  );
}

/**
 * Filled star — used for the testimonials rating row. Drawn on the same 16px
 * grid as the line icons, but filled instead of stroked, because a stroke-only
 * star reads as an outline at small sizes and the rating loses its weight.
 * Always decorative: ratings are carried by the surrounding count, so the
 * glyph is `aria-hidden`.
 */
export function Star({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
      focusable={false}
      className={className}
    >
      <path d="M8 1.5 L9.8 6 L14.5 6.4 L11 9.6 L11.8 14.2 L8 11.8 L4.2 14.2 L5 9.6 L1.5 6.4 L6.2 6 Z" />
    </svg>
  );
}
