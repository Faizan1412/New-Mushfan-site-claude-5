import { site } from "@/data/site";

/**
 * Text-based wordmark.
 *
 * No logo asset was supplied, so the mark is set in the display face: "Mushfan"
 * at full weight, "Digital Studio" demoted to mono micro-type, with the orange
 * registration dot as the only colour. Swap in an SVG logo here if one arrives —
 * keep the same footprint so the header rhythm holds.
 *
 * The visible parts are hidden from assistive tech and the full studio name is
 * exposed once, so the mark is never read as two fragments.
 */

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-baseline gap-2 leading-none">
      <span aria-hidden="true" className="font-display text-[1.0625rem] font-semibold tracking-[-0.04em] sm:text-[1.125rem]">
        {site.shortName}
      </span>
      <span className="reg-dot mb-[3px]" aria-hidden="true" />
      <span
        aria-hidden="true"
        className={`label-sm hidden text-ink-3 transition-opacity duration-300 sm:inline ${
          compact ? "opacity-0" : "opacity-100"
        }`}
      >
        Digital Studio
      </span>
      <span className="sr-only">{site.name}</span>
    </span>
  );
}
