import LightNavPro from "@/components/homepage-light/LightNavPro"
import TransferredSoftreeHeroToolkit from "@/components/homepage/TransferredSoftreeHeroToolkit"
import LightFeaturesBento from "@/components/homepage-light/LightFeaturesBento"
import LightEnterpriseCards from "@/components/homepage-light/LightEnterpriseCards"
import LightTrustedPartner from "@/components/homepage-light/LightTrustedPartner"
import LightHeroEngine from "@/components/homepage-light/LightHeroEngine"
import LightProductShowcase from "@/components/homepage-light/LightProductShowcase"
import LightServices from "@/components/homepage-light/LightServices"
import LightServicesTabs from "@/components/homepage-light/LightServicesTabs"
import LightStackedSlides from "@/components/homepage-light/LightStackedSlides"
import {
  LightFeatures,
  LightStats,
  LightIndustries,
  LightShowcase,
  LightTestimonials,
} from "@/components/homepage-light/LightSections"
import LightBentoGrid from "@/components/homepage-light/LightBentoGrid"
import LightFooterPro from "@/components/homepage-light/LightFooterPro"
import LightWhySoftree from "@/components/homepage-light/LightWhySoftree"
import LightHorizontalCodePath from "@/components/homepage-light/LightHorizontalCodePath"
import LightForEnterprise from "@/components/homepage-light/LightForEnterprise"
import LightMidCTA from "@/components/homepage-light/LightMidCTA"
import LightFinalCTA from "@/components/homepage-light/LightFinalCTA"
import LightAIAgents from "@/components/homepage-light/LightAIAgents"
import LightGlobalShowcase from "@/components/homepage-light/LightGlobalShowcase"
import LightBlogSection from "@/components/homepage-light/LightBlogSection"
import FeaturesShowcase from "@/components/features/FeaturesShowcase"
import CoreFeatures from "@/components/homepage-light/CoreFeatures"
import LightHowItWorks from "@/components/homepage-light/LightHowItWorks"
import LightTestimonialGrid from "@/components/homepage-light/LightTestimonialGrid"
import LightIntegrationOrbit from "@/components/homepage-light/LightIntegrationOrbit"
import LightTradingJourney from "@/components/homepage-light/LightTradingJourney"
import LightGrowSection from "@/components/homepage-light/LightGrowSection"
import LightSmartFeatures from "@/components/homepage-light/LightSmartFeatures"
import LightBenefitSection from "@/components/homepage-light/LightBenefitSection"
import LightAboutMerged from "@/components/homepage-light/LightAboutMerged"
import SoftreeServicesHero from "@/components/homepage-light/SoftreeServicesHero"
import LightExpertiseAccordion from "@/components/homepage-light/LightExpertiseAccordion"
import LightHowWeWork from "@/components/homepage-light/LightHowWeWork"
import LightIndustriesCarousel from "@/components/homepage-light/LightIndustriesCarousel"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import LightAwardsGrid from "@/components/homepage-light/LightAwardsGrid"
import VisionHero from "@/components/vision/VisionHero"
import Herov1 from "@/components/scalora-hero/Herov1"
import { color } from "@/components/homepage-light/tokens"

function Divider() {
  return (
    <div
      aria-hidden
      className="w-full"
      style={{
        height: 1,
        background: `linear-gradient(90deg, transparent 0%, ${color.mistral}44 15%, ${color.flame}55 50%, ${color.mistral}44 85%, transparent 100%)`,
      }}
    />
  )
}

export default function LightHomepage() {
  return (
    <main className="relative w-full">
      <LightNavPro />
      <TransferredSoftreeHeroToolkit />
      <SoftreeServicesHero />
      <Herov1 />
      <LightAboutMerged />
      <LightAwardsGrid />
      <VisionHero />
      <LightBenefitSection />
      <CoreFeatures />
      <LightHowItWorks />
      <LightTestimonialGrid />
      <LightSmartFeatures />
      <LightGrowSection />
      <LightIntegrationOrbit />
      <LightTradingJourney />
      <LightExpertiseAccordion />
      <LightHowWeWork />
      <LightBlogSection />
      <LightEnterpriseCards />
      <LightTrustedPartner />
      <LightFeaturesBento />
      <LightHeroEngine />
      <LightProductShowcase />
      <FeaturesShowcase />
      <Divider />
      <LightServicesTabs />
      <Divider />
      <LightServices />
      <Divider />
      <LightFeatures />
      <Divider />
      <LightWhySoftree />
      <Divider />
      <LightStackedSlides />
      <Divider />
      <LightHorizontalCodePath />
      <Divider />
      <LightForEnterprise />
      <Divider />
      <LightMidCTA />
      <LightStats />
      <Divider />
      <LightShowcase />
      <Divider />
      <LightAIAgents />
      <Divider />
      <LightGlobalShowcase />
      <Divider />
      <LightBentoGrid />
      <LightIndustries />
      <LightIndustriesCarousel />
      <Divider />
      <LightTestimonials />
      <LightFAQExact />
      <LightFinalCTA />
      <LightFooterPro />
    </main>
  )
}
