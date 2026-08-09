import { Hero } from "@/components/sections/Hero";
import { TrustStats } from "@/components/sections/TrustStats";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Reels } from "@/components/sections/Reels";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Results } from "@/components/sections/Results";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStats />
      <Services />
      <Reels />
      <Portfolio />
      <Process />
      <About />
      <Testimonials />
      <Results />
      <CTA />
    </>
  );
}
