import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Hero from "@/components/hero/Hero";
import SpaceBackground from "@/components/scene/SpaceBackground";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Judging from "@/components/sections/Judging";
import Marquee from "@/components/sections/Marquee";
import Partners from "@/components/sections/Partners";
import Prizes from "@/components/sections/Prizes";
import Timeline from "@/components/sections/Timeline";
import Tracks from "@/components/sections/Tracks";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <SpaceBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <div className="relative bg-gradient-to-b from-transparent via-void/55 to-void/80">
          <Marquee />
          <About />
          <Tracks />
          <Timeline />
          <Prizes />
          <Judging />
          <Experience />
          <Partners />
          <Faq />
          <Contact />
          <FinalCta />
          <Footer />
        </div>
      </main>
    </>
  );
}
