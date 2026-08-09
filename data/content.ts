/**
 * Editable content for the remaining homepage sections.
 *
 * Placeholder data is flagged with a `SHOW_*_NOTICE` constant. While a notice is
 * true the site renders a visible line telling visitors the data is
 * illustrative. Set it to false once real figures replace the placeholders.
 */

/* ──────────────────────────────────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────────────────────────────────── */

export const heroLede =
  "Mushfan Digital Studio combines strategy, creative design, technology and digital marketing to help ambitious businesses grow.";

/** The supporting line under the hero CTAs. */
export const heroDisciplines = ["Design", "Marketing", "Technology", "Growth"];

/**
 * The hero artboard: the four formats the studio delivers in. Each renders as a
 * hairline frame on a fixed-height specimen row — the frame's width follows its
 * aspect-ratio, so the row reads like a strip of production stills.
 */
export type HeroDeliverable = {
  tag: string;
  label: string;
  ratio: string;
  marked?: boolean;
};

export const heroDeliverables: HeroDeliverable[] = [
  { tag: "16:9", label: "Website", ratio: "16 / 9", marked: true },
  { tag: "9:16", label: "Reel", ratio: "9 / 16" },
  { tag: "1:1", label: "Social post", ratio: "1 / 1" },
  { tag: "4:5", label: "Paid ad", ratio: "4 / 5" },
];

/* ──────────────────────────────────────────────────────────────────────────
   TRUST STATISTICS
   Placeholders. Replace with real figures, then flip the notice off.
   ────────────────────────────────────────────────────────────────────────── */

export const SHOW_STATS_NOTICE = true;

export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "50+", label: "Projects delivered" },
  { value: "25+", label: "Businesses served" },
  { value: "5+", label: "Years of experience" },
  { value: "Multiple", label: "Industries served" },
];

/* ──────────────────────────────────────────────────────────────────────────
   PROCESS
   ────────────────────────────────────────────────────────────────────────── */

export type ProcessStep = {
  index: string;
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    body: "Understand the business, audience and goals. We ask what success looks like in numbers before we discuss design.",
  },
  {
    index: "02",
    title: "Strategize",
    body: "Develop the right digital and creative direction, and agree what we are measuring against.",
  },
  {
    index: "03",
    title: "Create",
    body: "Design, develop and produce the required assets — site, campaign, identity or video.",
  },
  {
    index: "04",
    title: "Launch",
    body: "Deploy websites, campaigns and digital experiences, with tracking in place from day one.",
  },
  {
    index: "05",
    title: "Optimize",
    body: "Measure results and continuously improve. The first version is a starting point, not a delivery.",
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   REELS / SHORT-FORM SHOWCASE
   Set `videoUrl` to make a card open a real video. Set `poster` to a file in
   /public to use a real thumbnail instead of the generated composition.
   ────────────────────────────────────────────────────────────────────────── */

export const SHOW_REELS_NOTICE = false;

export type Reel = {
  id: string;
  title: string;
  category: string;
  /** Optional link to the published video. */
  videoUrl?: string;
  /** Optional thumbnail path in /public. */
  poster?: string;
  posterAlt?: string;
  /** Tone key for the generated placeholder composition. */
  tone: "warm" | "ink" | "cool" | "sand";
};

export const reels: Reel[] = [
  { id: "r1", title: "Facts Mahindra Tractors", category: "Social", tone: "warm", videoUrl: "/videos/Facts Mahindra Tractors.mp4" },
  { id: "r2", title: "Gwalior Foodsters Content Edit", category: "Content", tone: "sand", videoUrl: "/videos/Gwalior Foodsters Content Edit.mp4" },
  { id: "r3", title: "Jai Vilas Palace Event", category: "Brand film", tone: "ink", videoUrl: "/videos/Jai Vilas Palace Event.mp4" },
  { id: "r4", title: "Panchmaakama Hair Oil Promo", category: "Ad creative", tone: "warm", videoUrl: "/videos/Panchmaakama Hair Oil Promo.mp4" },
  { id: "r5", title: "Raven Farm Gwalior", category: "Brand film", tone: "cool", videoUrl: "/videos/Raven Farm Gwalior.mp4" },
  { id: "r6", title: "TBO Travel Bytes App Reveal", category: "Ad creative", tone: "ink", videoUrl: "/videos/TBO Travel Bytes App Reveal.mp4" },
  { id: "r7", title: "Tractor Gyan Social Media", category: "Social", tone: "sand", videoUrl: "/videos/Tractor Gyan Social Media.mp4" },
  { id: "r8", title: "Vikhyat Shivhare Content Edit", category: "Content", tone: "cool", videoUrl: "/videos/Vikhyat Shivhare Content Edit.mp4" },
];

/* ──────────────────────────────────────────────────────────────────────────
   TESTIMONIALS
   ── IMPORTANT ────────────────────────────────────────────────────────────
   These are placeholder texts written to show the layout. They are not real
   client quotes and are labelled as illustrative on the page. Replace with
   genuine, permitted quotes and then set SHOW_TESTIMONIALS_NOTICE to false.
   Never present these as real reviews.
   ────────────────────────────────────────────────────────────────────────── */

export const SHOW_TESTIMONIALS_NOTICE = true;

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  business: string;
  role?: string;
  /** Optional profile image path in /public. Initials are used when absent. */
  image?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "They started by asking about our margins, not our logo. The site that came out of it finally matches how we actually sell.",
    name: "Client name",
    business: "Business name",
    role: "Founder",
  },
  {
    id: "t2",
    quote:
      "We had run ads before without knowing what worked. Now every campaign has a number attached to it and we can make decisions from that.",
    name: "Client name",
    business: "Business name",
    role: "Marketing lead",
  },
  {
    id: "t3",
    quote:
      "The reels changed how people respond to us. Same product, same price, far more enquiries — and the team handles the whole cycle.",
    name: "Client name",
    business: "Business name",
    role: "Director",
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   RESULTS
   ── IMPORTANT ────────────────────────────────────────────────────────────
   Demo figures for layout only. They are labelled as illustrative on the page
   and must not be presented as verified performance claims. Replace with
   measured, attributable results and then set SHOW_RESULTS_NOTICE to false.
   ────────────────────────────────────────────────────────────────────────── */

export const SHOW_RESULTS_NOTICE = true;

export type ResultMetric = {
  value: string;
  label: string;
  detail: string;
};

export const results: ResultMetric[] = [
  { value: "+120%", label: "Reach", detail: "Audience growth across paid and organic placements." },
  { value: "+85%", label: "Engagement", detail: "Interaction rate on short-form creative." },
  { value: "+40%", label: "Leads", detail: "Qualified enquiries reaching the sales team." },
];
