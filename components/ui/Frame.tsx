import type { CSSProperties, ReactNode } from "react";

/**
 * Production frame — the site's signature device.
 *
 * A hairline rectangle with corner crop marks and a mono ratio tag, standing in
 * for the artboards the studio actually delivers (16:9 site, 9:16 reel, 4:5 ad,
 * 1:1 post). `ratio` drives the aspect-ratio of the frame itself.
 *
 * The `ratio` prop is typed as a string so arbitrary CSS aspect-ratios can be
 * passed; the tags in the UI come from the data files.
 */

type FrameProps = {
  ratio?: string;
  /** Marks the crop corners orange. */
  marked?: boolean;
  children?: ReactNode;
  className?: string;
  /** Label shown under the frame. */
  caption?: ReactNode;
  as?: "div" | "figure";
  /** Settle animation delay for the hero sequence (ms). */
  settleDelay?: number;
};

export function Frame({
  ratio,
  marked = false,
  children,
  className = "",
  caption,
  as: Tag = "div",
  settleDelay,
}: FrameProps) {
  const style: CSSProperties | undefined =
    ratio || settleDelay !== undefined
      ? {
          ...(ratio ? { aspectRatio: ratio } : {}),
          ...(settleDelay !== undefined ? ({ "--settle-delay": `${settleDelay}ms` } as CSSProperties) : {}),
        }
      : undefined;

  const frame = (
    <Tag
      className={[
        "frame",
        marked ? "frame-marked" : "",
        settleDelay !== undefined ? "settle" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </Tag>
  );

  if (Tag === "figure" && caption) {
    return (
      <figure>
        {frame}
        {caption}
      </figure>
    );
  }

  return frame;
}

/**
 * Mono spec line under a frame, e.g. "9:16 · Vertical reel".
 * Keep tags short — this is set in small tabular mono.
 */
export function FrameCaption({ children }: { children: ReactNode }) {
  return (
    <figcaption className="label-sm mt-3 flex items-center justify-between gap-3 text-ink-3">
      {children}
    </figcaption>
  );
}
