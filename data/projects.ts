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
    slug: "thapa-sports",
    name: "A Modern Sportswear Store",
    subtitle: "E-commerce Website",
    industry: "Sportswear",
    services: ["Web Development", "UI/UX Design", "E-commerce"],
    description:
      "A high-energy e-commerce experience designed to showcase sportswear, simplify product discovery, and turn every visit into a seamless shopping journey.",
    year: "2025",
    ratio: "4:5",
    visual: "cart",
    image: "/images/work/thapa-sports.jpg",
    imageAlt: "Thapa Sport Wear — e-commerce website on a monitor mockup",
    href: "https://thapasports.com/",
  },
  {
    slug: "fn-news-app",
    name: "Immersive App for a News Channel",
    subtitle: "App Development",
    industry: "Media & News",
    services: ["App Development", "UI/UX Design", "CMS Integration"],
    description:
      "A modern news app designed to deliver breaking stories, local updates, and engaging content through a fast, intuitive, and seamless mobile experience.",
    year: "2025",
    ratio: "16:9",
    visual: "stack",
    image: "/images/work/fn-news-app.png",
    imageAlt: "FN News Channel — iPhone app mockup showing news feed",
  },
  {
    slug: "next-project",
    name: "Next Could Be Yours",
    subtitle: "Let's Build Something",
    industry: "Your Vision",
    services: ["Let's Talk"],
    description:
      "Every project starts with a conversation. Whether it's a bold idea or a problem that needs solving, this space is waiting for your story.",
    year: "2026",
    ratio: "4:5",
    visual: "feed",
  },
];
