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

export const SHOW_PLACEHOLDER_NOTICE = false;

export type ProjectVisualKey = "grid" | "stack" | "signal" | "mark" | "feed" | "cart";

export type Project = {
  slug: string;
  name: string;
  /** Short category label shown in the spec line, e.g. "Fitness". */
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
  /** Optional external or internal link to a case study / live site. */
  href?: string;
  /**
   * When true the image slowly pans from top to bottom on a loop, revealing
   * the full-page screenshot inside the fixed-ratio card frame.
   */
  scrollPreview?: boolean;
  /** Subtitle / category tag shown above the project name. */
  subtitle?: string;
};

export const projects: Project[] = [
  {
    slug: "gym-365-days",
    name: "Gym 365 Days",
    subtitle: "Website",
    industry: "Fitness",
    services: ["Web Development", "UI/UX Design", "Branding"],
    description:
      "A modern, high-converting website designed for a fitness brand, combining bold visuals, seamless user experience, and a strong digital presence that turns visitors into potential members.",
    year: "2025",
    ratio: "16:9",
    visual: "grid",
    image: "/images/work/gym-365-days.png",
    imageAlt: "Gym 365 Days website — full-page screenshot",
    href: "https://gym365days-fea983-200-141-7-236.sslip.io/",
    scrollPreview: true,
  },
  {
    slug: "delhi-darpan-automation",
    name: "Intelligent News Automation System",
    subtitle: "Automation",
    industry: "Media & News",
    services: ["AI Automation", "Workflow Engineering", "CMS Integration"],
    description:
      "An intelligent news automation system built for Delhi Darpan that streamlines the process of discovering relevant articles, organizing content, and publishing news efficiently—reducing manual effort while keeping the newsroom's digital presence consistently updated.",
    year: "2025",
    ratio: "4:5",
    visual: "signal",
    image: "/images/work/delhi-darpan-automation.png",
    imageAlt: "Delhi Darpan news automation workflow — n8n pipeline mockup",
    href: "https://delhidarpantv.com/",
  },
  {
    slug: "tbo-academy-video",
    name: "Professional Video Edits for a Travel Agency",
    subtitle: "Video Editing",
    industry: "Travel & Tourism",
    services: ["Video Editing", "Color Grading", "Motion Graphics"],
    description:
      "Transforming travel information into engaging, visually rich itinerary videos designed to inspire exploration and simplify trip planning.",
    year: "2025",
    ratio: "16:9",
    visual: "mark",
    image: "/images/work/tbo-academy-video.png",
    imageAlt: "TBO Academy — travel itinerary video editing project mockup",
    href: "https://www.youtube.com/@TBOAcademy",
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
