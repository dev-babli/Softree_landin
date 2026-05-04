import type { Metadata } from "next"
import TransferredSoftreeHero from "@/components/homepage/TransferredSoftreeHero"
import SoftreeServicesHero from "@/components/homepage-light/SoftreeServicesHero"
import LightAboutMerged from "@/components/homepage-light/LightAboutMerged"
import { HeroEnterpriseCards } from "@/components/brilliance/HeroEnterpriseCards"
import LightNavPro from "@/components/homepage-light/LightNavPro"
import LightFinalCTA from "@/components/homepage-light/LightFinalCTA"
import LightFooterPro from "@/components/homepage-light/LightFooterPro"
import { FlowOrchestrator } from "@/components/ultimate-flow/FlowOrchestrator"
import { FlowHud } from "@/components/ultimate-flow/FlowHud"
import { FlowSeam } from "@/components/ultimate-flow/FlowSeam"

export const metadata: Metadata = {
  title: "Softree · Ultimate Flow",
  description:
    "An award-craft, single-narrative experience. Hero. Services. About. Enterprise. Engineered to flow as one.",
}

export default function UltimateFlowPage() {
  return (
    <main className="relative w-full bg-black text-white">
      <LightNavPro />
      <FlowHud />

      <FlowOrchestrator>
        <section
          data-flow-section
          data-flow-label="Hero · Three Pillars"
          data-flow-tone="dark"
          className="relative"
        >
          <TransferredSoftreeHero />
        </section>

        <FlowSeam
          tone="dark-to-light"
          label="01 → 02"
          caption="From the brand stage to the studio. Where Softree turns ambition into operational software."
        />

        <section
          data-flow-section
          data-flow-label="Services · The Studio"
          data-flow-tone="light"
          className="relative"
        >
          <SoftreeServicesHero />
        </section>

        <FlowSeam
          tone="light"
          label="02 → 03"
          caption="Behind every shipped product, a team and a number. Here is ours."
        />

        <section
          data-flow-section
          data-flow-label="About · Numbers & Story"
          data-flow-tone="light"
          className="relative"
        >
          <LightAboutMerged />
        </section>

        <FlowSeam
          tone="light-to-dark"
          label="03 → 04"
          caption="Now zoom into the engine room — the cards that show what we ship for enterprise teams."
        />

        <section
          data-flow-section
          data-flow-label="Enterprise · Capability Stack"
          data-flow-tone="dark"
          className="relative"
        >
          <HeroEnterpriseCards />
        </section>
      </FlowOrchestrator>

      <LightFinalCTA />
      <LightFooterPro />
    </main>
  )
}
