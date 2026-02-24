"use client";

import type { BranchConfig } from "@/lib/branches-config";
import { NATIONAL_PASTORS } from "@/lib/national-pastors-config";
import BranchHero from "./BranchHero";
import BranchAbout from "./BranchAbout";
import BranchGatherings from "./BranchGatherings";
import BranchGallery from "./BranchGallery";
import BranchCTA from "./BranchCTA";
import NationalPastorSpotlight from "./NationalPastorSpotlight";
import CanadaAtmosphere from "./canada/CanadaAtmosphere";
import CanadaWisdom from "./canada/CanadaWisdom";
import AfricaGenesis from "./africa/AfricaGenesis";
import AfricaImpact from "./africa/AfricaImpact";
import EuropeShowcase from "./europe/EuropeShowcase";
import EuropeExpressions from "./europe/EuropeExpressions";
import USAPraiseCollage from "./usa/USAPraiseCollage";
import USAMovement from "./usa/USAMovement";

interface Props {
  branch: BranchConfig;
}

export default function BranchPage({ branch }: Props) {
  const { slug } = branch;
  const nationalPastor = NATIONAL_PASTORS[slug];

  return (
    <>
      <BranchHero branch={branch} />

      {/* Branch-specific content sections */}
      {slug === "africa" && <AfricaGenesis />}
      {slug === "africa" && <AfricaImpact />}
      {slug === "canada" && <CanadaAtmosphere />}
      {slug === "europe" && <EuropeShowcase />}
      {slug === "europe" && <EuropeExpressions />}
      {slug === "usa" && <USAPraiseCollage />}
      {slug === "usa" && <USAMovement />}

      <BranchAbout branch={branch} />

      {slug === "canada" && <CanadaWisdom />}

      {/* National Youth Pastor spotlight — rendered for all four branches */}
      {nationalPastor && <NationalPastorSpotlight {...nationalPastor} />}

      <BranchGatherings branch={branch} />
      <BranchGallery branch={branch} />
      <BranchCTA branch={branch} />
    </>
  );
}
