/**
 * Services shown on the homepage and rendered in full at /services/[slug].
 *
 * The homepage section uses the `summary` / `deliverables` fields. The detail
 * pages additionally use `overview` (long-form copy), `approach` (the stages
 * a specific engagement runs through) and `outcomes` (what the client walks
 * away with). All copy is statement of scope and approach — no performance
 * figures or fabricated metrics.
 *
 * Some services also opt into the expanded detail layout by populating
 * `channels`: when present, the page renders the sections the studio uses
 * for those services (What We Do / Our Approach / What You Get / Results /
 * Case Studies) in place of the default (What it includes / How we run it /
 * What you walk away with). The two layouts share the same drafting language
 * — hairline rules, mono labels, registration dots — so a service page
 * reads as one editorial family whichever shape it takes.
 *
 * `deliverables` populates the deliverables block; keep each to 3–5 short
 * entries so the list stays scannable.
 */

/** A category of work the service covers — e.g. "Meta Ads" for Digital
    Marketing. Used in the expanded layout's "What We Do" section. */
export type Channel = {
  name: string;
  body: string;
};

/** A single illustrative campaign. Until real case studies replace these,
    `SHOW_CASE_STUDIES_NOTICE` keeps them clearly flagged. */
export type CaseStudy = {
  id: string;
  /** Channel or campaign type — e.g. "Meta Ads". */
  channel: string;
  /** The kind of business — a category hint, not a real client name. */
  client: string;
  goal: string;
  approach: string;
  outcome: string;
};

export type Service = {
  /** Two-digit index shown in the mono rail. Order matters. */
  index: string;
  /** URL slug for /services/[slug]. */
  slug: string;
  title: string;
  summary: string;
  /** Long-form copy for the detail page. Two or three short paragraphs. */
  overview: string;
  /** When present, switches the detail page to the expanded layout. */
  channels?: Channel[];
  /** Stages the engagement runs through. Four or five short entries. */
  approach: { title: string; body: string }[];
  deliverables: string[];
  /** What the client walks away with at the end of an engagement. */
  outcomes: string[];
  /** Categories of result the engagement moves — rendered as the "Results"
      register in the expanded layout. */
  resultCategories?: string[];
  /** Illustrative case studies — placeholder content until real ones
      replace these, gated by `SHOW_CASE_STUDIES_NOTICE`. */
  caseStudies?: CaseStudy[];
  /** Custom CTA headline for this service. Defaults to the shared CTA copy. */
  ctaTitle?: string;
  /** Custom CTA primary button label. Defaults to "Start a Project". */
  ctaPrimaryLabel?: string;
  /** Ratio tag for the detail panel's production frame. */
  ratio: "16:9" | "9:16" | "4:5" | "1:1";
  /** Optional image path in /public for the specimen frame. */
  image?: string;
};

/**
 * Toggles the "Illustrative" badge on case study cards. The case studies in
 * this file are placeholder content — once real, permitted case studies
 * replace them, flip this to false so the cards read as final.
 */
export const SHOW_CASE_STUDIES_NOTICE = true;

export const services: Service[] = [
  {
    index: "01",
    slug: "digital-marketing",
    title: "Digital Marketing",
    summary:
      "Targeted strategy and paid campaigns built around measurable business objectives.",
    overview:
      "Targeted strategy and paid acquisition across paid social, search and video — built around measurable business objectives, not vanity metrics. We plan, build and run campaigns on Meta, Google and YouTube with the tracking in place before launch, so every rupee can be traced back to the outcome it produced.",
    channels: [
      {
        name: "Social Media Marketing",
        body: "Organic content, community and channel strategy across the platforms your audience actually uses — not the ones with the most features.",
      },
      {
        name: "Meta Ads",
        body: "Paid campaigns across Facebook and Instagram — feed, stories and reels — built for each placement's mechanics rather than repurposed from somewhere else.",
      },
      {
        name: "Google Ads",
        body: "Search, Performance Max and Shopping campaigns that capture intent at the moment it surfaces, with bidding and creative matched to the funnel stage.",
      },
      {
        name: "YouTube Ads",
        body: "Skippable in-stream, bumper and Shorts ads sequenced by funnel stage, with creative cut down to the format rather than squeezed into it.",
      },
    ],
    approach: [
      {
        title: "Research",
        body: "Audience, competitor and channel research before a single rupee is spent. We map where the audience actually is and what they have already seen, so the work answers the market — not the assumption.",
      },
      {
        title: "Strategy",
        body: "Channel mix, budget split, audience targeting and the metrics we are measuring against. Agreed in writing before any campaign goes live.",
      },
      {
        title: "Creative",
        body: "Ad creative, copy and cutdowns built per platform and per funnel stage. Variants are designed to be tested, not a one-off set.",
      },
      {
        title: "Campaign",
        body: "Campaign build, audience setup, tracking and attribution. Launched with measurement in place from day one — not bolted on after the first month of spend.",
      },
      {
        title: "Optimization",
        body: "Weekly checks against the agreed metrics, monthly reporting that says what worked and what changed, and ongoing iteration on creative and targeting.",
      },
    ],
    deliverables: [
      "Ad creatives",
      "Campaign management",
      "Audience targeting",
      "Analytics & reporting",
    ],
    outcomes: [
      "A paid media plan tied to a measurable business goal",
      "Live campaigns with attribution from impression to enquiry",
      "A monthly report that says what worked, what didn't, and what changed",
      "Creative and copy that can be tested, not a one-off set of ads",
    ],
    resultCategories: ["Leads", "Sales", "Reach", "Engagement"],
    caseStudies: [
      {
        id: "cs1",
        channel: "Meta Ads",
        client: "E-commerce fashion brand",
        goal: "Find new acquisition audiences beyond organic reach, with creative that could be tested cheaply.",
        approach:
          "Built a campaign structure around six creative concepts and four audience segments, killed the bottom half within two weeks, and let the winners run with weekly creative refreshes.",
        outcome:
          "More qualified site visits, lower cost per repeat purchase, campaigns that now run without daily babysitting.",
      },
      {
        id: "cs2",
        channel: "Google Ads",
        client: "Multi-location services business",
        goal: "Show up for high-intent local searches and turn them into booked appointments, not just clicks.",
        approach:
          "Search and Performance Max campaigns built per location, with negative keyword pruning weekly and call extensions measuring real enquiries, not just form fills.",
        outcome:
          "Bookings attributed to paid search across every location, consistent enquiry flow rather than occasional spikes.",
      },
      {
        id: "cs3",
        channel: "YouTube Ads",
        client: "Consumer brand",
        goal: "Build awareness ahead of a product launch without spending the launch budget on cold traffic.",
        approach:
          "Skippable in-stream ads in three lengths, sequenced by funnel stage — top of funnel for reach, mid-funnel for consideration, retargeting for conversion.",
        outcome:
          "Reach across the relevant audience, measurable lift in branded search, retargeting list primed for the launch window.",
      },
    ],
    ctaTitle: "Let’s grow your brand",
    ratio: "4:5",
    image: "/images/services/svc-digital-marketing.png",
  },
  {
    index: "02",
    slug: "video-creative",
    title: "Video & Creative",
    summary:
      "Reels, advertisements, promotional videos, editing and creative content.",
    overview:
      "Short-form reels, ads, brand films and promotional videos — shot, edited and packaged for the platform they live on. Concept and edit stay with the same team, so the final cut still answers the brief it started from.",
    approach: [
      {
        title: "Brief",
        body: "What the video is for, where it lives, who it is aimed at and what action it should drive. Without this answered in writing, the rest is guessing.",
      },
      {
        title: "Concept",
        body: "Scripts, storyboards and shot lists. Decisions on format, length and platform versioning are made up front so the shoot covers everything in one pass.",
      },
      {
        title: "Shoot",
        body: "On location or in studio, depending on what the brief calls for. The team that briefed the shoot is the team on set.",
      },
      {
        title: "Edit & deliver",
        body: "Cuts, colour, sound, subtitles and platform-specific versions. Files are exported ready to upload, with the source project handed over at the end.",
      },
    ],
    deliverables: [
      "Short-form reels and ad cuts",
      "Brand and product films",
      "Editing, grading and sound",
      "Subtitles and platform versioning",
    ],
    outcomes: [
      "Cutdowns for each platform the brief calls for",
      "Subtitled, captioned, export-ready files",
      "Source project handed over so future edits don't need a re-shoot",
      "A library organised by campaign, not by file name",
    ],
    ratio: "9:16",
    image: "/images/services/svc-video-creative.png",
  },
  {
    index: "03",
    slug: "website-app-development",
    title: "Website & App Development",
    summary:
      "Fast, modern, responsive digital experiences designed for users and conversions.",
    overview:
      "Marketing sites, landing pages, e-commerce builds, and web and mobile applications. Built for the people who use them and the people who measure them — fast, accessible, and handed over so nothing is locked to us.",
    approach: [
      {
        title: "Scope",
        body: "What the build has to do, who it has to do it for, and what gets cut to keep the scope honest. A site that does five jobs poorly does none of them well.",
      },
      {
        title: "Design",
        body: "Wireframes, then visual design. Decisions are explained, not just shown — the team should be able to defend every choice when it is questioned later.",
      },
      {
        title: "Build",
        body: "Component by component. Performance and accessibility are checked throughout, not audited at the end when they are expensive to fix.",
      },
      {
        title: "Launch & handover",
        body: "Tracking goes in, documentation is written, and accounts are handed over so another team could pick the build up without an archaeology project.",
      },
    ],
    deliverables: [
      "Marketing sites and landing pages",
      "E-commerce builds",
      "Web and mobile applications",
      "Performance and accessibility work",
    ],
    outcomes: [
      "A site or app that loads quickly and works without us",
      "Performance and accessibility scores you can quote",
      "Tracking and analytics in from day one",
      "Code, accounts and documentation handed over at the end",
    ],
    ratio: "16:9",
    image: "/images/services/svc-website-dev.png",
  },
  {
    index: "04",
    slug: "ai-automation",
    title: "AI & Automation",
    summary:
      "Smart systems that reduce repetitive work and improve operational efficiency.",
    overview:
      "Systems that take the repetitive work off the team — lead routing, follow-ups, reporting, integrations between tools that don't talk to each other. AI where it earns its place, plain automation where it is the obvious answer.",
    approach: [
      {
        title: "Map the work",
        body: "What gets done, by whom, how often and where the time actually goes. The map is what tells you whether AI or simple automation is the right answer.",
      },
      {
        title: "Pick the levers",
        body: "Which tasks should be automated, which need AI, which need a human and a better tool. Not every workflow needs a model — most need a trigger and an action.",
      },
      {
        title: "Build & test",
        body: "Workflows, integrations, prompts and fallbacks for when the model is wrong. The fallback matters as much as the happy path.",
      },
      {
        title: "Run & refine",
        body: "Monitor what the system is actually doing, fix the cases where it breaks, and expand scope once a workflow is stable enough to trust.",
      },
    ],
    deliverables: [
      "Lead routing and follow-up flows",
      "CRM and tool integrations",
      "Reporting automation",
      "Assisted content workflows",
    ],
    outcomes: [
      "Workflows that run without a person watching them",
      "Integrations between tools that previously didn't share data",
      "Logs and dashboards that show what the system is doing",
      "Documentation so the team can change it without us",
    ],
    ratio: "1:1",
    image: "/images/services/svc-ai-automation.png",
  },
  {
    index: "05",
    slug: "seo",
    title: "SEO",
    summary:
      "Search strategies designed to improve visibility, organic traffic and long-term discoverability.",
    overview:
      "Search strategies built for the long game — technical foundations, content that answers real questions, and the kind of visibility that compounds month over month rather than spiking on launch day.",
    approach: [
      {
        title: "Audit",
        body: "Technical, on-page, content and local. Everything that is currently stopping the site from ranking where it should is written down and prioritised.",
      },
      {
        title: "Keyword & intent map",
        body: "What the audience actually searches for, and which pages should answer which questions. Intent drives the map, not volume alone.",
      },
      {
        title: "Fixes & content",
        body: "Technical issues resolved, content structured and written to match intent. Existing pages are improved before new ones are added.",
      },
      {
        title: "Measure & iterate",
        body: "Rankings, traffic and enquiries reported against the goals, not just the rank tracker. The numbers that matter are the ones the business tracks.",
      },
    ],
    deliverables: [
      "Technical audits and fixes",
      "Keyword and intent mapping",
      "On-page and content structure",
      "Local search and profile setup",
    ],
    outcomes: [
      "A site that is technically clean enough to rank",
      "Content that matches what people are actually searching for",
      "Local search profiles set up and kept current",
      "A monthly view of what moved and what didn't",
    ],
    ratio: "16:9",
    image: "/images/services/svc-seo.png",
  },
];

/** Look up a service by slug. Used by the /services/[slug] route. */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
