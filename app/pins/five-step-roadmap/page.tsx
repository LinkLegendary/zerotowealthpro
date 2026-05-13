import type { Metadata } from "next";

import FiveStepDebtFixRoadmapPin from "@/components/pinterest/FiveStepDebtFixRoadmapPin";


export const metadata: Metadata = {
  title: "Pinterest Graphic - Five Step Roadmap",
  robots: {
    index: false,
    follow: false,
  },
};
export default function FiveStepRoadmapPinPage() {
  return (
    <main className="min-h-screen bg-neutral-200 p-10">
      <FiveStepDebtFixRoadmapPin />
    </main>
  );
}