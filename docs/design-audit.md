**Mushfan Digital Studio — UI/UX design audit**

Reviewed 16 September 2026. The visual foundation is strong: restrained orange accents, confident typography, a clear grid, and recognizable framing around the work. The largest improvements are to mobile navigation, credibility, the order of information, media playback, and the contact journey.

This audit covers the current local website at `/`, `/about`, and `/contact`. It includes visual inspection in Chrome at 1440 × 900 and 1366 × 768, responsive checks at widths of 320, 390, and 768 pixels, keyboard checks, source review, and automated accessibility checks. These are local browser observations, not production analytics, a conversion study, or a full accessibility certification. Website source files were not changed.

**Priority order**

| Priority | Improvement | Reason |
| --- | --- | --- |
| P0 — before launch | Fix the mobile menu after scrolling | Page text visibly overlaps navigation. |
| P0 | Replace placeholder testimonials and demo results | Current proof undermines trust. |
| P0 | Repair policy and social destinations; verify enquiry delivery | Essential trust and contact paths are incomplete. |
| P1 — next iteration | Show strong work much earlier | Visitors encounter several screens of explanation before the portfolio. |
| P1 | Tighten the hero and state the offer concretely | The primary hero action falls below a common laptop viewport. |
| P1 | Give reels usable playback controls and load them on demand | Visitors cannot properly inspect the work; media transfer is excessive. |
| P1 | Restore studio images on phones and tablets | All three image boxes collapse to zero size. |
| P1 | Simplify the contact page and preserve service selection | The current journey asks for unnecessary scrolling and repeated input. |
| P1 | Repair keyboard access and results semantics | Automated checks found specific accessibility defects. |
| P2 — visual refinement | Strengthen type hierarchy, image consistency, and the studio story | The page needs more variety in emphasis and more evidence of the people behind the work. |

**1. Mobile menu: repair the overlay first**

At 390 × 844, open the menu after scrolling. Its white background measures only 64 pixels tall while the menu content extends down the viewport. The page remains visible behind the links, creating overlapping text. See the [captured menu](audit-evidence/mobile-menu-after-scroll.png).

The scrolled navbar applies a backdrop filter, which changes the containing block for the fixed menu nested inside it. Render the overlay outside that header, or use a native modal dialog in the browser's top layer. Make the entire overlay opaque and ensure the background is inert while open. Preserve the existing Escape handling and focus restoration, which worked in the keyboard check.

Acceptance: an opaque viewport-filling menu at the top and after scrolling, at small widths and in landscape; background content cannot be interacted with; closing restores focus.

Source: `components/layout/Navbar.tsx:77`, `components/layout/MobileNav.tsx:121`.

**2. Replace placeholder proof with credible evidence**

The three testimonials still display “Client name” and “Business name.” Their source explicitly identifies the quotes as placeholders, yet the notice is disabled. The +120% reach, +85% engagement, and +40% leads figures are also described in source as demo data with their notice disabled.

Replace these with approved client quotes and attributable results, or remove those sections until the material is available. A useful result names the client or context, the metric, the comparison period, and Mushfan's contribution. Verify the separate “50+ projects,” “25+ businesses,” and experience figures before relying on them. Replace “Multiple industries served” with recognizable industries or omit it.

Place one strong piece of verified proof near the top. Three attributable projects are more useful than a larger collection of unsupported claims.

Source: `data/content.ts:43`, `data/content.ts:136`, `data/content.ts:183`.

**3. Repair trust and contact destinations**

Both `/privacy-policy` and `/terms` returned 404. Instagram, Facebook, LinkedIn, and YouTube links currently point to the platforms' homepages rather than studio profiles. Publish the intended pages and link to real profiles; omit profiles that are not maintained.

The contact endpoint only delivers email when its provider configuration is present. Neither required setting was present in the audit process, and no local environment file was found. Production configuration was not checked. The browser's undelivered state was tested with an intercepted response, so no enquiry was sent.

Verify delivery before launch. When sending fails, keep the visitor's draft available for editing/retry, provide a short explanation, and offer direct email. The current fallback explains deployment configuration and asks the visitor to complete another step in their mail app. That adds friction at the point of conversion.

Source: `data/site.ts:49`, `data/site.ts:109`, `app/api/contact/route.ts:74`, `components/sections/ContactForm.tsx:376`.

**4. Bring the work forward and shorten the homepage**

At 1440 pixels wide, the homepage is approximately 13,029 pixels tall. The services section alone occupies 2,713 pixels, and the portfolio starts around 5,161 pixels down. At 390 pixels wide, the homepage is roughly 15,648 pixels tall and the portfolio starts around 4,741 pixels down. Navigation offers a shortcut, but the natural reading journey delays the strongest evidence.

Recommended order:

**Concise hero → compact verified proof → three selected projects → service overview → optional showreel → concise process and studio introduction → client quote → contact action.**

Keep detailed service deliverables and the extended studio explanation on deeper pages or clearly labeled disclosures. Fold results into the projects that produced them. Reduce repeated section padding, especially where a large title and a paragraph consume most of a screen before the useful content begins. Initial direction: 80–112 pixels of section padding on desktop and 48–64 pixels on mobile, adjusted to the content.

Acceptance: a featured project is visible within the first two screenfuls, and each section adds new information to the buying decision.

Source: `app/page.tsx`, `components/sections/Services.tsx`, `components/ui/Section.tsx`.

**5. Make the hero more specific and easier to act on**

“Transforming Ideas Into Digital Growth” communicates ambition but does little to identify what a visitor can buy. The large three-line treatment dominates desktop. At 1366 × 768, the hero's “Start a Project” button starts around y=780, below the viewport; the separate header CTA remains available. The phone hero keeps its actions visible and has comfortable button sizing.

Try a concrete headline such as “Websites, campaigns and content that grow your business,” with a short supporting line naming the audience and the benefit of one coordinated team. Keep “Start a project” as the primary action and “View selected work” as the secondary action. Reduce desktop heading size and surrounding spacing enough to show both actions at 1366 × 768.

Use a real project preview as the memorable visual element, framed in the site's existing artboard style. The faint moving background adds visual noise and substantial media weight without showing the quality of the studio's work.

Source: `components/sections/Hero.tsx:72`. [Current desktop hero](audit-evidence/home-desktop-top.png).

**6. Turn portfolio browsing into an evaluation journey**

The portfolio has useful subject matter, but most entries emphasize general scope and marketing adjectives. Several “View project” links lead directly to a live website or a whole YouTube channel. The “Next Could Be Yours” card also says “View project” while taking the visitor to contact.

For the strongest three projects, provide a short case study: client problem, delivered scope, Mushfan's role, representative visuals, and an attributable result where available. Keep live-site links as secondary actions and label their destination accurately: “Visit website” or “Watch video.” Give the enquiry card “Start a project.”

Use a consistent visual treatment while keeping details large enough to inspect. On mobile, a curated selection followed by “See all work” would reduce the almost 3,900-pixel portfolio section. Service actions should preserve the chosen service in the enquiry form rather than sending every visitor to an empty generic form.

Source: `data/projects.ts`, `components/sections/Portfolio.tsx`, `components/sections/Services.tsx:68`.

**7. Make video viewing intentional and lightweight**

The homepage renders 17 video elements: one hero background and two copies of eight reels. Reel cards offer no playback, sound, seeking, or fullscreen controls. Clicking “Pause” stops the moving rail but leaves the visible videos playing; their playback times continued advancing in the browser check.

A cache-disabled local Chrome check recorded approximately 48.5 MiB of video transfer within a few seconds, before scrolling to the reels. This is a diagnostic sample, not a production page-weight or Core Web Vitals score; caching and browser media policies affect the exact amount.

Use poster thumbnails and a visible “Play” control. Open the chosen clip in an accessible player with pause, sound, seeking, fullscreen, and captions where appropriate. Load video when the visitor requests it; keep duplicate decorative items as images. Replace the hero video with a lightweight still or the existing grid. Respect reduced-motion settings in actual video playback as well as CSS animation.

Source: `components/sections/Reels.tsx:78`, `components/ui/Marquee.tsx:69`, `components/sections/Hero.tsx`.

**8. Restore the studio imagery on smaller screens**

All three homepage studio images measured 0 × 0 pixels at viewport widths of 320, 390, and 768 pixels. They loaded and displayed correctly on desktop. Their containers have aspect ratios but lack a usable base width or height inside the mobile flex layout.

Give the mobile image containers explicit dimensions, or use one strong full-width studio photograph. Avoid an unexplained horizontally scrolling strip when a single image would communicate the studio more clearly.

Source: `components/sections/About.tsx:64`.

**9. Put the enquiry form closer to the visitor**

The form begins around y=715 on desktop and y=585 on a 390-pixel phone viewport. The mobile submit button is around y=1446 before any validation errors. Seven fields are presented even though only name, email, and project details are required. The contact page reaches approximately 6,271 pixels on mobile.

Use a shorter contact introduction. Start with name, email, and a brief project description; put optional company, phone, and budget fields behind a clearly labeled optional-details control. Preserve a service chosen elsewhere. Bring direct email/phone and the reply expectation alongside the form rather than far below it on mobile. Condense the “what happens next” content; consider accessible FAQ disclosures where they improve scanning.

Keep the current explicit labels, autocomplete attributes, inline errors, and focus on the first invalid field. Empty submission correctly highlighted name, email, and project details, and moved focus to name.

Source: `app/contact/page.tsx:48`, `components/sections/ContactForm.tsx:49`. [Current contact page](audit-evidence/contact-desktop-top.png).

**10. Refine the hierarchy and make the studio recognizable**

Keep the paper/charcoal/orange palette, Sora/Manrope pairing, strong alignment, and restrained borders. Refine their application:

- Reserve the largest type for the main proposition. Section headings and individual service titles currently use the same display size, making many elements compete. Start with desktop section headings around 40–56 pixels and service titles around 28–36 pixels.
- Increase useful labels, form labels, and supporting instructions to approximately 12–14 pixels. The current 10–11-pixel uppercase mono treatment is best restricted to optional decorative metadata. Keep body text around 16–18 pixels.
- Use varied, purposeful section compositions: one featured project, a compact service overview, a short process, and a human studio introduction. Repeated large headlines, rules, and long pale surfaces flatten the rhythm.
- The `/about` page is approximately 6,397 pixels tall on desktop and contains no images. Add actual people, roles, studio photographs, and a concise explanation of the FN Group relationship. Consolidate repeated descriptions of marketing/design/technology.
- Improve the framing and consistency of real imagery. Service illustrations should support comprehension; the main proof should come from recognizable work and people.

Source: `app/globals.css:51`, `components/sections/Services.tsx:68`, `app/about/page.tsx`.

**11. Complete the accessibility details**

The automated homepage check found three rule categories: invalid definition-list grouping, definition terms nested outside valid grouping, and a reduced-motion reel scroller without keyboard access. The checked contact form state produced no automated violations. This does not establish full accessibility conformance.

Correct the results list structure so each term and description form a valid group. Make the reel scroller keyboard reachable and give clips real controls. Enlarge the small rail control to a comfortable touch target, aiming for 44 × 44 pixels. Keep the existing visible focus treatment, skip link, form labels, and reduced-motion treatment for CSS effects. Verify the repaired menu with keyboard and assistive technology.

Source: `components/sections/Results.tsx:35`, `components/ui/Marquee.tsx`, `app/globals.css`.

**Suggested implementation sequence**

1. Repair the menu and image sizing, remove placeholder proof, fix link destinations, and verify contact delivery.
2. Rework the hero and homepage order; publish three strong case studies; simplify contact and service handoff.
3. Replace bulk autoplay with controlled video playback; refine type sizes, spacing, imagery, and keyboard behavior.
4. Validate on actual phones and a production build. Check the path from landing to selected work to enquiry, along with real loading performance. After launch, measure project views, CTA clicks, form starts, errors, and successful submissions to guide the next iteration.
