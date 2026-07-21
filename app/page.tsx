import Atmosphere from "@/components/Atmosphere";
import BootLoader from "@/components/BootLoader";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import FighterDeconstructed from "@/components/FighterDeconstructed";
import Modules from "@/components/Modules";
import ScheduleEngine from "@/components/ScheduleEngine";
import Lineage from "@/components/Lineage";
import Proof from "@/components/Proof";
import Access from "@/components/Access";

/**
 * CPAMMA — the fighter system.
 * Fixed layers (atmosphere, nav, boot) live OUTSIDE the smooth-scroll
 * transform wrapper; everything that scrolls lives inside it.
 */
export default function Home() {
  return (
    <>
      <Atmosphere />
      <BootLoader />
      <Nav />
      <SmoothScroll>
        <main className="relative z-10">
          <Hero />
          <FighterDeconstructed />
          <Modules />
          <ScheduleEngine />
          <Lineage />
          <Proof />
          <Access />
        </main>
      </SmoothScroll>
    </>
  );
}
