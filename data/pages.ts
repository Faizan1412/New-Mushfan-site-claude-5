/**
 * Editable copy for the routed pages — /about and /contact.
 *
 * Kept out of `content.ts`, which holds the homepage. Same rule as everywhere
 * else on the site: nothing here is a claim about the past. These are
 * statements of approach, scope and intent, which the studio can stand behind
 * without a case study to prove them. Do not add founding dates, headcounts,
 * client names, awards or performance figures to this file unless they are
 * real and verifiable.
 */

/* ──────────────────────────────────────────────────────────────────────────
   ABOUT
   ────────────────────────────────────────────────────────────────────────── */

export type Principle = {
  index: string;
  title: string;
  body: string;
};

/** How the studio works. Approach, not achievement. */
export const principles: Principle[] = [
  {
    index: "01",
    title: "Strategy before design",
    body: "We ask what the business needs to happen before anyone opens a design file. A site that looks right and sells nothing is a cost, not an asset — so the commercial goal is agreed first and the creative answers to it.",
  },
  {
    index: "02",
    title: "One team, whole stack",
    body: "The site, the campaigns, the creative and the automation behind them are built by the same people. Nothing gets lost in the handover between three vendors, and no one gets to blame the other two.",
  },
  {
    index: "03",
    title: "Measured, not assumed",
    body: "Tracking goes in before launch, not bolted on after the first month of spend. If we cannot tell whether something worked, the work is not finished — and neither of us should be guessing.",
  },
  {
    index: "04",
    title: "Built to be handed over",
    body: "You own the accounts, the code and the data. We set things up so another team could pick them up without an archaeology project, because a client kept in place by lock-in is not a client who chose to stay.",
  },
];

export type Audience = {
  title: string;
  body: string;
};

/** Who the studio is built for. */
export const audiences: Audience[] = [
  {
    title: "Founders and small teams",
    body: "Where marketing sits on top of everything else one person already does, and the honest answer to “who owns the website” is nobody.",
  },
  {
    title: "Local businesses",
    body: "Cafés, clinics, studios and retail — businesses whose customers are close by and who need to be found, remembered and chosen.",
  },
  {
    title: "In-house marketing teams",
    body: "Teams with the strategy already settled who need production capacity: creative, build and campaign work that keeps pace with the plan.",
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   CONTACT
   ────────────────────────────────────────────────────────────────────────── */

export type NextStep = {
  index: string;
  title: string;
  body: string;
};

/** What happens after the form is sent. Describes the process, promises no outcome. */
export const nextSteps: NextStep[] = [
  {
    index: "01",
    title: "We read it",
    body: "Every enquiry is read by the people who would do the work, not routed through a sales desk first.",
  },
  {
    index: "02",
    title: "We come back with questions",
    body: "Usually a short reply asking the two or three things we need in order to say something useful — or a time to talk it through.",
  },
  {
    index: "03",
    title: "You get scope and a number",
    body: "Before anything starts, you get what is included, what it costs and how long it takes, in writing.",
  },
];

export type Faq = {
  question: string;
  answer: string;
};

/**
 * Questions people actually ask before a first call. Answers are deliberately
 * concrete where they can be and openly conditional where they cannot — an
 * invented price range would be worse than none.
 */
export const faqs: Faq[] = [
  {
    question: "Do you work with small businesses?",
    answer:
      "Yes. A large share of the work is founder-led and local. Scope is what changes between a small business and a larger one — the way we run the project does not.",
  },
  {
    question: "Do we have to take everything at once?",
    answer:
      "No. Projects range from a single campaign or a set of reels to a full digital rebuild. If one piece is the bottleneck, start there — we would rather fix the thing that is holding the rest back than sell a bundle.",
  },
  {
    question: "What does a project cost?",
    answer:
      "It depends on scope, and we would rather quote properly than post a number that means nothing. The budget field on the form is there to place you in a range so the first reply can be specific.",
  },
  {
    question: "Can you work with our existing site or agency?",
    answer:
      "Yes. We can take over an existing build, work alongside an in-house team, or handle one discipline while someone else runs the rest.",
  },
  {
    question: "Do you work remotely?",
    answer:
      "Yes — across India and internationally. The work is run over shared documents, calls and a tracked project board, so where everyone sits stops mattering fairly quickly.",
  },
  {
    question: "Who owns the work when it is done?",
    answer:
      "You do. Accounts, code, creative files and data stay yours, and we hand over access rather than holding it.",
  },
];
