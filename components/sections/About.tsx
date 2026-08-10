import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { contact } from "@/data/site";
import { heroDisciplines } from "@/data/content";

/**
 * About — a composition, not a wall of text.
 *
 * The section is built as a spread: a specimen stack on the left holding the four
 * disciplines as stacked ratio frames, and the argument on the right, broken into
 * three short blocks with a ruled capability strip underneath.
 *
 * The frames are offset by increasing left padding so they read as a physical
 * stack of artboards seen slightly from above. It is the one place on the site
 * where the frame grid is deliberately not aligned — everything else squares up,
 * so a single stepped stack registers as intentional rather than sloppy.
 */

const stack = [
  { ratio: "16 / 9", offset: "lg:ml-0", src: "/images/about/studio-1.jpg", alt: "Studio setup" },
  { ratio: "4 / 5", offset: "lg:ml-10", src: "/images/about/studio-2.jpg", alt: "Studio lighting" },
  { ratio: "9 / 16", offset: "lg:ml-20", src: "/images/about/studio-3.jpg", alt: "Studio mic" },
];

const capabilities = [
  "Digital marketing",
  "Paid social & search",
  "Search optimisation",
  "Web & app development",
  "Video & motion",
  "Brand & identity",
  "Content production",
  "AI automation",
];

export function About() {
  return (
    <Section id="about" tone="paper" ruled labelledBy="about-title">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
        {/* Specimen stack */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="label flex items-center gap-3 text-ink-2">
              <span className="reg-dot" aria-hidden="true" />
              About the studio
            </p>
          </Reveal>

          {/* Below `lg` the stack lies down into a specimen row on a common
              baseline height, so each frame's width is its ratio made literal —
              the same reading the hero uses. Equal-width columns instead would
              squash the 16:9 to a 57px sliver.

              The row bleeds and scrolls under 640px, exactly as the hero's does:
              the three ratios sum to 3.14× the shared height, which is 308px at
              h-22 and does not fit a 280px column at 320px wide. Scrolling keeps
              the frames legible instead of shrinking them to fit. */}
          <ul className="no-scrollbar -mx-5 mt-10 flex items-end gap-4 overflow-x-auto px-5 sm:mx-0 sm:overflow-visible sm:px-0 lg:mt-14 lg:block lg:space-y-5">
            {stack.map((item, i) => (
              <Reveal key={item.src} as="li" delay={i * 90} className={`shrink-0 ${item.offset}`}>
                <div
                  className="relative overflow-hidden rounded-xl lg:w-2/3"
                  style={{ aspectRatio: item.ratio }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Argument */}
        <div className="mt-14 lg:col-span-6 lg:col-start-7 lg:mt-0">
          <Reveal delay={60}>
            <h2 id="about-title" className="display-2">
              Built at the intersection of creativity, technology and growth
              <span className="text-accent-ink">.</span>
            </h2>
          </Reveal>

          <div className="mt-8 space-y-6 lg:mt-10">
            <Reveal delay={120}>
              <p className="lede">
                Mushfan Digital Studio is a digital partner for businesses that want their
                marketing, design and technology to pull in the same direction.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <p className="max-w-xl leading-relaxed text-ink-2">
                Most businesses end up with a website from one vendor, campaigns from another and
                creative from a third. The work is fine in isolation and disconnected in practice.
                We build the whole system — the site, the campaigns, the creative and the
                automation behind them — so each part makes the others work harder.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="max-w-xl leading-relaxed text-ink-2">
                We work with founders and marketing teams across {contact.serviceArea[0]} and
                remotely, on projects that range from a single campaign to a full digital
                rebuild. Small enough to stay close to the work, structured enough to run it
                properly.
              </p>
            </Reveal>
          </div>

          {/* Capability strip */}
          <Reveal delay={240}>
            <h3 className="label mt-12 text-ink-3">What we cover</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-8">
              {capabilities.map((capability) => (
                <li
                  key={capability}
                  className="hairline-t py-3 text-[0.9375rem] text-ink-2"
                >
                  {capability}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/contact" variant="primary" arrow data-cta="about-primary">
                Start a Project
              </ButtonLink>
              <p className="label text-ink-3">{heroDisciplines.join(" · ")}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
