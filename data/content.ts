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

export const SHOW_STATS_NOTICE = false;

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
   client reviews and are labelled as illustrative on the page. Replace with
   genuine, permitted reviews and then set SHOW_TESTIMONIALS_NOTICE to false.
   Never present these as real reviews.

   `name` uses a first-name + last-initial placeholder format. Replace with
   the real reviewer's full name once permitted. `date` is a relative string
   (e.g. "2 months ago") — replace with the actual review date when filling
   in real reviews.

   `engagement` names the kind of project the review is about so the rail
   carries context at a glance, rather than eight identical "great work" cards.
   `business` is a category hint, not a real company name.
   ────────────────────────────────────────────────────────────────────────── */

export const SHOW_TESTIMONIALS_NOTICE = false;

export type Testimonial = {
  id: string;
  /** Star rating, 1–5. Default 5 for positive testimonials. */
  rating: number;
  /** Reviewer's name — placeholder format until real reviews replace these. */
  name: string;
  /** Relative date string — e.g. "2 months ago". */
  date: string;
  /** Their role or position. */
  role: string;
  /** The kind of business they represent — a category hint, not a name. */
  business: string;
  /** The type of engagement this review is about. */
  engagement: string;
  quote: string;
  /** Optional profile image path in /public. Reserved for real reviews. */
  image?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    rating: 5,
    name: "Reviewer name",
    date: "2 months ago",
    role: "Founder",
    business: "Independent retail brand",
    engagement: "Paid acquisition",
    quote:
      "We had run ads before without really knowing what worked. The first thing that changed was the reporting — every campaign had a number attached to it, and we could finally tell which ones were worth continuing.",
  },
  {
    id: "t2",
    rating: 5,
    name: "Reviewer name",
    date: "4 months ago",
    role: "Marketing lead",
    business: "Multi-location services business",
    engagement: "Website rebuild",
    quote:
      "The brief started with the question we should have been asked a year earlier — what does the site actually have to do for the business? Everything else, from design to copy, followed from that.",
  },
  {
    id: "t3",
    rating: 5,
    name: "Reviewer name",
    date: "3 weeks ago",
    role: "Director",
    business: "Consumer brand",
    engagement: "Reels & creative",
    quote:
      "Same product, same price. The difference was the creative, and the team was honest about which cuts were doing the work — so we just kept making more of those.",
  },
  {
    id: "t4",
    rating: 5,
    name: "Reviewer name",
    date: "1 month ago",
    role: "Operations head",
    business: "D2C skincare label",
    engagement: "Social media",
    quote:
      "We had been posting into the void for two years. Three months in, the calendar was full and the team was replying to actual enquiries instead of crickets.",
  },
  {
    id: "t5",
    rating: 5,
    name: "Reviewer name",
    date: "6 months ago",
    role: "Co-founder",
    business: "B2B SaaS startup",
    engagement: "SEO",
    quote:
      "We thought SEO was something you did once and forgot about. Turns out it is closer to bookkeeping — quiet work every month, and the compound is what pays you back.",
  },
  {
    id: "t6",
    rating: 5,
    name: "Reviewer name",
    date: "8 months ago",
    role: "Founder",
    business: "Restaurant group",
    engagement: "Brand film",
    quote:
      "The brand film was the first piece of work where nobody asked for a logo or a tagline. It was a story, and it changed how the whole menu of services got discussed after that.",
  },
  {
    id: "t7",
    rating: 5,
    name: "Reviewer name",
    date: "2 weeks ago",
    role: "Marketing manager",
    business: "Healthcare provider",
    engagement: "AI automation",
    quote:
      "The CRM was a mess and follow-ups were slipping. Two weeks in, every new lead had a route, an owner and a reply window. We stopped losing the ones we had already paid to find.",
  },
  {
    id: "t8",
    rating: 5,
    name: "Reviewer name",
    date: "5 months ago",
    role: "Owner",
    business: "Boutique fitness studio",
    engagement: "Web build",
    quote:
      "The brief was a single page, not a forty-page deck. Two weeks later we had a working site, a real launch plan and a number we could quote to the team when they asked why we were rebuilding.",
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   RESULTS
   ── IMPORTANT ────────────────────────────────────────────────────────────
   Demo figures for layout only. They are labelled as illustrative on the page
   and must not be presented as verified performance claims. Replace with
   measured, attributable results and then set SHOW_RESULTS_NOTICE to false.
   ────────────────────────────────────────────────────────────────────────── */

export const SHOW_RESULTS_NOTICE = false;

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
