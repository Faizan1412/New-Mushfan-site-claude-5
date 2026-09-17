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
   Permitted client reviews. `role` and `business` are kept generic so the rail
   carries context at a glance without inventing specifics the testimonial
   doesn't establish.
   ────────────────────────────────────────────────────────────────────────── */

export const SHOW_TESTIMONIALS_NOTICE = false;

export type Testimonial = {
  id: string;
  /** Star rating, 1–5. Default 5 for positive testimonials. */
  rating: number;
  /** Reviewer's name. */
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
    name: "Anjali Singh",
    date: "1 month ago",
    role: "Founder",
    business: "Boutique clothing brand",
    engagement: "Website redesign",
    quote:
      "Very happy with the website. The website looks modern, professional and much better than our previous one. They were patient with our feedback and made all the changes we requested.",
  },
  {
    id: "t2",
    rating: 5,
    name: "Rahul Sharma",
    date: "2 months ago",
    role: "Owner",
    business: "Local services business",
    engagement: "Social media & ads",
    quote:
      "Really impressed with their work. Mushfan Digital Studio helped us improve our social media presence and run ads for our business. The team was responsive, creative, and easy to work with.",
  },
  {
    id: "t3",
    rating: 5,
    name: "Deepak Singh",
    date: "3 weeks ago",
    role: "Director",
    business: "Retail business",
    engagement: "Paid ads",
    quote:
      "They don't just run ads and disappear. We've worked with other people before where communication was a problem. Here, we get regular updates and can discuss what needs to be improved. That has made a big difference.",
  },
  {
    id: "t4",
    rating: 5,
    name: "Faisal Khan",
    date: "1 month ago",
    role: "Co-founder",
    business: "Service business",
    engagement: "Branding & support",
    quote:
      "Happy with the overall service. Good communication, good designs and proper support whenever required. We've had a positive experience working with the team so far.",
  },
  {
    id: "t5",
    rating: 5,
    name: "Tanya Jain",
    date: "2 weeks ago",
    role: "Marketing lead",
    business: "Consumer brand",
    engagement: "Strategy consultation",
    quote:
      "Really liked their approach. Instead of immediately pushing a package, they first asked about our goals and audience. That made us comfortable working with them, and the execution has been good too.",
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
