/**
 * Central site configuration.
 *
 * Everything a non-developer is likely to change lives here: contact details,
 * social profiles, navigation and the canonical URL. Edit this file rather than
 * hunting through components.
 */

export const site = {
  name: "Mushfan Digital Studio",
  shortName: "Mushfan",
  /** Used for canonical URLs, sitemap, robots and Open Graph. Change on launch. */
  url: "https://mushfandigitalstudio.com",
  tagline: "Creative digital solutions for ambitious businesses.",
  description:
    "Mushfan Digital Studio combines strategy, creative design, technology and digital marketing to help ambitious businesses grow. Digital marketing, web and app development, SEO, video, branding and AI automation.",
} as const;

export const contact = {
  email: "hello@mushfan.com",
  phone: "+91 8103751632",
  /** Digits only, for tel: links. Replace alongside `phone`. */
  phoneHref: "+918103751632",
  location: "India",
  /**
   * Region-level only. No street address is claimed here; add one only when
   * there is a real, verifiable premises to publish.
   */
  addressCountry: "IN",
  /** Areas the studio serves. Used for LocalBusiness / service-area schema. */
  serviceArea: ["India", "Worldwide (remote)"],
  hours: "Mon–Sat, 10:00–19:00 IST",
  /**
   * The reply window quoted under the form and on the contact page. This is a
   * promise the studio makes, not a measured statistic — set it to what can
   * genuinely be honoured. It lives here so the two places that quote it can
   * never drift apart.
   */
  responseWindow: "one business day",
} as const;

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

/** Replace the placeholder hrefs with the studio's real profile URLs. */
export const socials: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com/", handle: "@mushfandigitalstudio" },
  { label: "Facebook", href: "https://facebook.com/", handle: "Mushfan Digital Studio" },
  { label: "LinkedIn", href: "https://linkedin.com/", handle: "Mushfan Digital Studio" },
  { label: "YouTube", href: "https://youtube.com/", handle: "Mushfan Digital Studio" },
];

export type NavItem = {
  label: string;
  href: string;
  /** Section id used for scroll-spy active states. Homepage sections only. */
  id?: string;
};

/**
 * The site menu.
 *
 * Every in-site href is written from the root — `/#services`, not `#services`.
 * A bare hash resolves against the current path, so on /about it would point at
 * /about#services and land nowhere. Root-relative works from any route, and
 * from the homepage the browser still treats it as a same-document fragment,
 * so the smooth scroll is unchanged.
 *
 * `id` marks an item as a homepage landmark rather than a route: it is what the
 * header's scroll-spy watches, and what decides whether an active item is
 * `aria-current="page"` (a route you are on) or `aria-current="true"` (a
 * section you are looking at). Home carries `id: "top"` because the hero owns
 * that id — so on the homepage Home is current until you scroll into Services,
 * instead of staying lit the whole way down.
 */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/", id: "top" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Work", href: "/#work", id: "work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * The header, the mobile panel and the footer all render the same list. Kept as
 * an alias rather than a second array so the two can never fall out of order
 * with each other — if the mobile panel ever needs entries the header does not,
 * give this its own definition then.
 */
export const fullNav = primaryNav;

/**
 * Footer service list. Each entry points at the matching /services/[slug]
 * page so the footer reaches every service the section on the homepage
 * presents. Slugs are kept in step with data/services.ts — if a service is
 * added, renamed or retired, update both lists in the same edit.
 */
export const footerServices: NavItem[] = [
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "Video & Creative", href: "/services/video-creative" },
  { label: "Website & App Development", href: "/services/website-app-development" },
  { label: "AI & Automation", href: "/services/ai-automation" },
  { label: "SEO", href: "/services/seo" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

/** Options for the contact form's Service field. */
export const serviceOptions = [
  "Digital Marketing",
  "Social Media Advertising",
  "Video & Creative",
  "Website Development",
  "App Development",
  "SEO",
  "AI & Automation",
  "Branding & Graphic Design",
  "Social Media Management",
  "Not sure yet",
] as const;

/** Options for the contact form's Budget field. */
export const budgetOptions = [
  "Under ₹50,000",
  "₹50,000 – ₹1,50,000",
  "₹1,50,000 – ₹5,00,000",
  "₹5,00,000+",
  "Prefer to discuss",
] as const;
