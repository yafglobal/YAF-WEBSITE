"use client";

import type { BranchConfig } from "@/lib/branches-config";
import BranchHero from "./BranchHero";
import BranchAbout from "./BranchAbout";
import BranchGatherings from "./BranchGatherings";
import BranchGallery from "./BranchGallery";
import BranchCTA from "./BranchCTA";

interface Props {
  branch: BranchConfig;
}

export default function BranchPage({ branch }: Props) {
  return (
    <>
      <BranchHero branch={branch} />
      <BranchAbout branch={branch} />
      <BranchGatherings branch={branch} />
      <BranchGallery branch={branch} />
      <BranchCTA branch={branch} />
    </>
  );
}
