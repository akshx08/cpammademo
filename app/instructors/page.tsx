import type { Metadata } from "next";
import Lineage from "@/components/Lineage";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: { absolute: "CPAMMA Instructors | State College Martial Arts Coaches" },
  description:
    "State College's most decorated staff — multiple-time champion BJJ black belts, pro Muay Thai and MMA fighters. Over 100 fights and countless titles, teaching 7 days a week.",
};

export default function InstructorsPage() {
  return (
    <>
      <div className="pt-16 md:pt-20">
        <Lineage />
      </div>
      <CtaBand
        headline="TRAIN WITH THE"
        accent="SOURCE."
        sub="Certified instructors teach every class — and every student trains with at least two different instructors."
      />
    </>
  );
}
