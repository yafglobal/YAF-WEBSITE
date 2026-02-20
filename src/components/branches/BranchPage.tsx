"use client";

import type { BranchConfig } from "@/lib/branches-config";
import BranchHero from "./BranchHero";
import BranchAbout from "./BranchAbout";
import BranchGatherings from "./BranchGatherings";
import BranchGallery from "./BranchGallery";
import BranchCTA from "./BranchCTA";
import CanadaAtmosphere from "./canada/CanadaAtmosphere";
import CanadaWisdom from "./canada/CanadaWisdom";
import CanadaLeaders from "./canada/CanadaLeaders";

interface Props {
  branch: BranchConfig;
}

const isCanada = (slug: string) => slug === "canada";

export default function BranchPage({ branch }: Props) {
  return (
    <>
      <BranchHero branch={branch} />
      {isCanada(branch.slug) && <CanadaAtmosphere />}
      <BranchAbout branch={branch} />
      {isCanada(branch.slug) && <CanadaWisdom />}
      {isCanada(branch.slug) && <CanadaLeaders />}
      <BranchGatherings branch={branch} />
      <BranchGallery branch={branch} />
      <BranchCTA branch={branch} />
    </>
  );
}
