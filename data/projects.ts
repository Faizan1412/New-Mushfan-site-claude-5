/**
 * Portfolio entries.
 *
 * ── IMPORTANT ─────────────────────────────────────────────────────────────
 * These are structural placeholders, not real case studies. Descriptions
 * intentionally state scope only — no invented results, metrics or clients.
 * Replace with genuine work before launch, then set
 * `SHOW_PLACEHOLDER_NOTICE` to false.
 *
 * To use a real image, set `image` to a path in /public (e.g. "/work/acme.jpg").
 * When `image` is omitted the site renders a generated abstract composition
 * keyed by `visual`, so the layout is never broken by a missing asset.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const SHOW_PLACEHOLDER_NOTICE = true;

export type ProjectVisualKey = "grid" | "stack" | "signal" | "mark" | "feed" | "cart";

export type Project = {
  slug: string;
  name: string;
  industry: string;
  services: string[];
  description: string;
  year: string;
  /** Frame ratio for the project image. Alternating ratios drive the layout. */
  ratio: "16:9" | "4:5";
  /** Optional real image. Falls back to a generated composition. */
  image?: string;
  /** Alt text used when `image` is set. */
  imageAlt?: string;
  visual: ProjectVisualKey;
  /** Optional external or internal link to a case study. */
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "healthcare-website",
    name: "Healthcare Website",
    industry: "Healthcare",
    services: ["Web Development", "SEO", "Branding"],
    description:
      "A clinic site built around appointment enquiries: clear service pages, fast mobile load and a booking flow that works on a phone in a waiting room.",
    year: "2025",
    ratio: "16:9",
    visual: "grid",
  },
  {
    slug: "fitness-brand-campaign",
    name: "Fitness Brand Campaign",
    industry: "Fitness",
    services: ["Video & Creative", "Social Advertising"],
    description:
      "A launch campaign carried by short-form video — a library of reels and ad cuts versioned for feed, story and reel placements.",
    year: "2025",
    ratio: "4:5",
    visual: "signal",
  },
  {
    slug: "local-business-campaign",
    name: "Local Business Marketing",
    industry: "Retail services",
    services: ["Digital Marketing", "Local SEO", "Google Ads"],
    description:
      "Local search and paid campaigns pointed at one outcome: calls and directions from people within travelling distance of the shop.",
    year: "2024",
    ratio: "16:9",
    visual: "mark",
  },
  {
    slug: "ecommerce-website",
    name: "E-commerce Website",
    industry: "Consumer goods",
    services: ["Web Development", "Creative", "Automation"],
    description:
      "A storefront rebuilt for speed and checkout clarity, with product photography, lifecycle email and stock alerts wired into one system.",
    year: "2024",
    ratio: "4:5",
    visual: "cart",
  },
  {
    slug: "corporate-branding",
    name: "Corporate Branding",
    industry: "Professional services",
    services: ["Branding", "Graphic Design"],
    description:
      "A full identity system — wordmark, type scale, colour and document templates — documented so an internal team can apply it without us.",
    year: "2024",
    ratio: "16:9",
    visual: "stack",
  },
  {
    slug: "social-media-campaign",
    name: "Social Media Campaign",
    industry: "Hospitality",
    services: ["Social Management", "Content", "Creative"],
    description:
      "A quarter of planned content: a calendar, a repeatable template set and a weekly shooting rhythm the client's own team could sustain.",
    year: "2023",
    ratio: "4:5",
    visual: "feed",
  },
];
