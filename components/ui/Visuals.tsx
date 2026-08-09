import type { ProjectVisualKey } from "@/data/projects";
import type { Reel } from "@/data/content";

/**
 * Generated placeholder visuals.
 *
 * No stock photography: every placeholder on the site is an abstract SVG
 * composition drawn from the brand vocabulary — hairlines, ratio frames, the
 * orange registration mark — on the studio's palette. Each `key` is a different
 * pattern so projects read as distinct pieces of work, not clones.
 *
 * These are decorative (each is `aria-hidden` and rendered beside real text),
 * so alt text is never needed here. When a real image is supplied via the data
 * file, `ProjectVisual` renders that instead and the caller supplies alt text.
 */

/** Stable, collision-free id for SVG <defs> references. */
function slugId(seed: string) {
  return seed.replace(/[^a-zA-Z0-9]/g, "");
}

/* Pattern: orthographic grid with a marked cell — "the plan". */
function GridArt({ id }: { id: string }) {
  const cells: Array<[number, number]> = [
    [0, 0], [1, 0], [2, 1], [3, 0], [4, 2], [0, 3], [1, 2], [3, 4], [4, 3],
  ];
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full" aria-hidden="true">
      <defs>
        <pattern id={`${id}-g`} width="128" height="100" patternUnits="userSpaceOnUse">
          <path d="M128 0H0V100" fill="none" stroke="#E7E7E7" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="640" height="400" fill="#F8F8F7" />
      <rect width="640" height="400" fill={`url(#${id}-g)`} />
      {cells.map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <rect x={cx * 128} y={cy * 100} width="128" height="100" fill="none" stroke="#111111" strokeOpacity="0.1" />
          <circle cx={cx * 128 + 6} cy={cy * 100 + 6} r="2" fill="#F97316" />
        </g>
      ))}
      <rect x="16" y="16" width="288" height="288" fill="none" stroke="#111111" strokeWidth="1" />
      <rect x="24" y="24" width="272" height="272" fill="#FFFFFF" fillOpacity="0.6" />
    </svg>
  );
}

/* Pattern: a rising performance line — "the signal". */
function SignalArt() {
  const line = "M0 320 L80 300 L160 312 L240 250 L320 264 L400 190 L480 205 L560 130 L640 150";
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full" aria-hidden="true">
      <rect width="640" height="400" fill="#F3F3F1" />
      {[80, 160, 240, 320, 400, 480, 560].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="400" stroke="#E7E7E7" strokeWidth="1" />
      ))}
      <path d={line} fill="none" stroke="#111111" strokeWidth="2" />
      {[80, 160, 240, 320, 400, 480, 560].map((x, i) => (
        <circle key={x} cx={x} cy={[300, 312, 250, 264, 190, 205, 130][i]} r="4" fill="#FFFFFF" stroke="#111111" strokeWidth="1.5" />
      ))}
      <circle cx="560" cy="130" r="7" fill="none" stroke="#F97316" strokeWidth="2" />
    </svg>
  );
}

/* Pattern: a large wordmark and crops — "the mark". */
function MarkArt() {
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full" aria-hidden="true">
      <rect width="640" height="400" fill="#FFFFFF" />
      <g stroke="#E7E7E7" strokeWidth="1" fill="none">
        <path d="M-40 400 L40 0 M-40 0 L40 400 M600 0 L680 400 M600 400 L680 0" />
      </g>
      <g transform="translate(64 200)" stroke="#111111" fill="none">
        <path d="M0 -52 L0 52 M14 -52 L14 52 M52 -52 L52 -12 Q80 -12 80 12 Q80 36 52 36 L52 52 M52 -12 L80 12" strokeWidth="3" />
        <path d="M150 0 Q180 -64 220 0 Q260 -64 290 0 M160 -28 L260 -28" strokeWidth="3" />
      </g>
      <rect x="500" y="56" width="64" height="64" fill="none" stroke="#F97316" strokeWidth="2" />
    </svg>
  );
}

/* Pattern: stacked cards — "the deck". */
function StackArt() {
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full" aria-hidden="true">
      <rect width="640" height="400" fill="#F8F8F7" />
      <rect x="148" y="44" width="344" height="312" fill="#FFFFFF" stroke="#E7E7E7" strokeWidth="1" />
      <rect x="176" y="72" width="288" height="188" fill="#F3F3F1" stroke="#E7E7E7" strokeWidth="1" />
      <rect x="176" y="72" width="96" height="188" fill="#151515" />
      <rect x="176" y="86" width="40" height="12" fill="#F97316" opacity="0.85" />
      <line x1="296" y1="110" x2="440" y2="110" stroke="#E7E7E7" strokeWidth="1" />
      <line x1="296" y1="126" x2="424" y2="126" stroke="#E7E7E7" strokeWidth="1" />
      <rect x="176" y="284" width="120" height="18" fill="#111111" />
    </svg>
  );
}

/* Pattern: a feed of 4:5 cards — "the feed". */
function FeedArt() {
  const cards = [
    { x: 64, y: 24, h: 150, f: "#F3F3F1" },
    { x: 252, y: 76, h: 150, f: "#151515" },
    { x: 440, y: 40, h: 150, f: "#FFFFFF" },
  ];
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full" aria-hidden="true">
      <rect width="640" height="400" fill="#F8F8F7" />
      {cards.map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={c.y} width="136" height={c.h} fill={c.f} stroke="#E7E7E7" strokeWidth="1" />
          {i === 1 ? <rect x={c.x + 10} y={c.y + 10} width="24" height="24" fill="none" stroke="#F97316" strokeWidth="1.5" /> : null}
          {i !== 1 ? <circle cx={c.x + 14} cy={c.y + 14} r="3" fill="#F97316" /> : null}
        </g>
      ))}
    </svg>
  );
}

/* Pattern: a product on a base — "the cart". */
function CartArt() {
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full" aria-hidden="true">
      <rect width="640" height="400" fill="#FFFFFF" />
      <rect x="120" y="80" width="400" height="240" fill="#F8F8F7" stroke="#E7E7E7" strokeWidth="1" />
      <path d="M320 108 L432 168 L320 228 L208 168 Z" fill="#FFFFFF" stroke="#111111" strokeWidth="2" />
      <path d="M320 136 L320 220" stroke="#E7E7E7" strokeWidth="1" />
      <ellipse cx="320" cy="228" rx="112" ry="16" fill="none" stroke="#E7E7E7" strokeWidth="1" />
      <circle cx="208" cy="168" r="5" fill="#F97316" />
      <circle cx="432" cy="168" r="5" fill="#F97316" />
    </svg>
  );
}

const patterns: Record<ProjectVisualKey, (p: { id: string }) => React.ReactNode> = {
  grid: GridArt,
  signal: SignalArt,
  mark: MarkArt,
  stack: StackArt,
  feed: FeedArt,
  cart: CartArt,
};

export function ProjectVisual({
  visual,
  ratio,
}: {
  visual: ProjectVisualKey;
  ratio: "16:9" | "4:5";
}) {
  const id = slugId(`pv-${visual}-${ratio}`);
  const Pattern = patterns[visual] ?? patterns.grid;
  return (
    <div
      className="h-full w-full overflow-hidden"
      style={{ aspectRatio: ratio === "16:9" ? "16 / 9" : "4 / 5" }}
      aria-hidden="true"
    >
      <Pattern id={id} />
    </div>
  );
}

/* Reel placeholder — 9:16 composition keyed by tone. */
const reelTones = {
  warm: { bg: "#F3F3F1", block: "#F97316", line: "#E7E7E7" },
  ink: { bg: "#151515", block: "#F2F2F0", line: "#2C2C2C" },
  cool: { bg: "#F8F8F7", block: "#111111", line: "#E7E7E7" },
  sand: { bg: "#EDEAE3", block: "#F97316", line: "#DCD8CE" },
} as const;

export function ReelVisual({ reel }: { reel: Reel }) {
  const t = reelTones[reel.tone];
  return (
    <svg viewBox="0 0 360 640" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="360" height="640" fill={t.bg} />
      <line x1="0" y1="120" x2="360" y2="120" stroke={t.line} strokeWidth="1" />
      <line x1="0" y1="136" x2="360" y2="136" stroke={t.line} strokeWidth="1" />
      <rect x="28" y="200" width="64" height="64" fill="none" stroke={t.block} strokeWidth="2" />
      <rect x="268" y="320" width="64" height="160" fill="none" stroke={t.line} strokeWidth="1" />
      <circle cx="180" cy="420" r="76" fill="none" stroke={t.block} strokeWidth="2" />
      <circle cx="180" cy="420" r="28" fill={t.block} opacity="0.9" />
      <rect x="0" y="552" width="360" height="88" fill={t.block} opacity="0.14" />
    </svg>
  );
}
