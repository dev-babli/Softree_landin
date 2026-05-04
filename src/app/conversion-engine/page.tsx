import type { Metadata } from "next"
import LightNavPro from "@/components/homepage-light/LightNavPro"
import LightFooterPro from "@/components/homepage-light/LightFooterPro"
import { ConversionHero } from "@/components/conversion-engine/ConversionHero"
import { ConversionTrustWall } from "@/components/conversion-engine/ConversionTrustWall"
import { ConversionLeadFunnel } from "@/components/conversion-engine/ConversionLeadFunnel"
import { ConversionCTAStack } from "@/components/conversion-engine/ConversionCTAStack"

export const metadata: Metadata = {
  title: "Softree · Conversion Engine",
  description:
    "Stop losing months to vendors who can't ship. Book a 30-min strategy call and leave with an outcome roadmap — whether you choose Softree or not.",
}

export default function ConversionEnginePage() {
  return (
    <main className="relative w-full">
      <LightNavPro />
      <ConversionHero />
      <ConversionTrustWall />
      <ConversionLeadFunnel />
      <ConversionCTAStack />
      <LightFooterPro />
    </main>
  )
}
