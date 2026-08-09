import Image from "next/image";
import { Section, SectionHead, DemoNote } from "@/components/ui/Section";
import { Marquee } from "@/components/ui/Marquee";
import { ReelVisual } from "@/components/ui/Visuals";
import { Play } from "@/components/ui/Icons";
import { SHOW_REELS_NOTICE, reels, type Reel } from "@/data/content";

/**
 * Reels — a continuously sliding rail of 9:16 specimens.
 *
 * Sits on white, directly after Services: the creative work is the first thing
 * shown once the offer has been stated. Dark is now used once on the site, in
 * the footer, so this section carries its weight through the rail gesture and
 * the run of tall frames rather than through a change of surface.
 *
 * The rail slides on its own — see components/ui/Marquee.tsx for the loop and
 * the pause control. It bleeds past the shell on both edges, with the negative
 * margins mirroring the shell's own padding at each breakpoint (20 / 32 / 56px)
 * so the motion runs edge to edge. The cards deliberately do not scroll-snap
 * any more: snapping fights a track that is already moving.
 *
 * Cards carry no scroll reveal. A card fading up while the track slides reads
 * as two competing motions, and the duplicate copy that makes the loop seamless
 * would reveal on its own schedule — the seam would announce itself.
 *
 * On the play affordance: it renders only on cards that have a `videoUrl`. A
 * play button that opens nothing is a promise the page can't keep, so
 * placeholder cards show their ratio tag instead and the notice below says
 * plainly what they are.
 */

export function Reels() {
  return (
    <Section id="reels" tone="paper" ruled labelledBy="reels-title">
      <SectionHead
        index="02"
        label="Reels"
        titleId="reels-title"
        title="Stories That Move"
        lede="From scroll-stopping ads to polished brand content, we create visuals designed for attention."
      />

      <div className="mt-14 lg:mt-20">
        <Marquee
          label="Showreel"
          duration="64s"
          // Bleed to the section edges, then fade there. The fade runs a little
          // wider than the bleed so it reads as a soft edge rather than a band
          // sitting exactly on the shell's padding.
          className="-mx-5 px-5 [--marquee-fade:2.5rem] sm:-mx-8 sm:px-8 sm:[--marquee-fade:4rem] xl:-mx-14 xl:px-14 xl:[--marquee-fade:6rem]"
        >
          {reels.map((reel) => (
            // The right margin is what spaces the cards, not a flex `gap` —
            // the loop's -50% only lands seamlessly if every card advances by
            // the same amount, including the last one before the seam.
            <li
              key={reel.id}
              className="mr-4 w-[62vw] max-w-[17rem] shrink-0 sm:mr-6 sm:w-[15rem] lg:w-[16.5rem]"
            >
              <ReelCard reel={reel} />
            </li>
          ))}
        </Marquee>

        {SHOW_REELS_NOTICE ? (
          <DemoNote>
            Placeholder compositions standing in for the real edits — each card takes a thumbnail
            and a video link from the content file once the cut is published.
          </DemoNote>
        ) : null}
      </div>
    </Section>
  );
}

function ReelCard({ reel }: { reel: Reel }) {
  const media = (
    <div className="frame relative overflow-hidden" style={{ aspectRatio: "9 / 16" }}>
      <div className="absolute inset-0">
        {reel.videoUrl ? (
          // autoPlay requires muted — browsers block unmuted autoplay.
          // playsInline prevents iOS from going fullscreen on play.
          <video
            src={reel.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : reel.poster ? (
          <Image
            src={reel.poster}
            alt={reel.posterAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 17rem, 62vw"
            className="object-cover"
          />
        ) : (
          <ReelVisual reel={reel} />
        )}
      </div>
    </div>
  );

  const meta = (
    <>
      <p className="label mt-4 text-accent-ink">{reel.category}</p>
      <p className="mt-2 text-[0.9375rem] leading-snug font-semibold text-ink">{reel.title}</p>
    </>
  );

  return (
    <article className="group">
      {media}
      {meta}
    </article>
  );
}
