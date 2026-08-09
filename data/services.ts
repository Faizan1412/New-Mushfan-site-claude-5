/**
 * Services shown in the two-pane index on the homepage.
 *
 * `deliverables` populates the detail panel; keep each to 3–5 short entries so
 * the panel height stays stable and the list never reflows.
 */

export type Service = {
  /** Two-digit index shown in the mono rail. Order matters. */
  index: string;
  title: string;
  summary: string;
  deliverables: string[];
  /** Ratio tag for the detail panel's production frame. */
  ratio: "16:9" | "9:16" | "4:5" | "1:1";
  /** Optional image path in /public for the specimen frame. */
  image?: string;
};

export const services: Service[] = [
  {
    index: "01",
    title: "Digital Marketing",
    summary:
      "Targeted strategy and paid campaigns built around measurable business objectives.",
    deliverables: [
      "Channel, audience and retargeting strategy",
      "Meta and Google Ads campaign builds",
      "Tracking and attribution setup",
      "Monthly performance reporting",
    ],
    ratio: "4:5",
    image: "/images/services/svc-digital-marketing.png",
  },
  {
    index: "02",
    title: "Video & Creative",
    summary:
      "Reels, advertisements, promotional videos, editing and creative content.",
    deliverables: [
      "Short-form reels and ad cuts",
      "Brand and product films",
      "Editing, grading and sound",
      "Subtitles and platform versioning",
    ],
    ratio: "9:16",
    image: "/images/services/svc-video-creative.png",
  },
  {
    index: "03",
    title: "Website & App Development",
    summary:
      "Fast, modern, responsive digital experiences designed for users and conversions.",
    deliverables: [
      "Marketing sites and landing pages",
      "E-commerce builds",
      "Web and mobile applications",
      "Performance and accessibility work",
    ],
    ratio: "16:9",
    image: "/images/services/svc-website-dev.png",
  },
  {
    index: "04",
    title: "AI & Automation",
    summary:
      "Smart systems that reduce repetitive work and improve operational efficiency.",
    deliverables: [
      "Lead routing and follow-up flows",
      "CRM and tool integrations",
      "Reporting automation",
      "Assisted content workflows",
    ],
    ratio: "1:1",
    image: "/images/services/svc-ai-automation.png",
  },
  {
    index: "05",
    title: "SEO",
    summary:
      "Search strategies designed to improve visibility, organic traffic and long-term discoverability.",
    deliverables: [
      "Technical audits and fixes",
      "Keyword and intent mapping",
      "On-page and content structure",
      "Local search and profile setup",
    ],
    ratio: "16:9",
    image: "/images/services/svc-seo.png",
  },
];
