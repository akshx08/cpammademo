import BootLoader from "@/components/BootLoader";
import Hero from "@/components/Hero";
import FighterDeconstructed from "@/components/FighterDeconstructed";
import ProgramsTeaser from "@/components/home/ProgramsTeaser";
import ScheduleTeaser from "@/components/home/ScheduleTeaser";
import Proof from "@/components/Proof";
import CtaBand from "@/components/CtaBand";

/** landing — the cinematic front door; every section routes deeper */
export default function Home() {
  return (
    <>
      <BootLoader />
      <Hero />
      <FighterDeconstructed />
      <ProgramsTeaser />
      <ScheduleTeaser />
      <Proof />
      <CtaBand />
    </>
  );
}
