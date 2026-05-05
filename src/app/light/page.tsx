import LightNavPro from "@/components/homepage-light/LightNavPro"
import TransferredSoftreeHero from "@/components/homepage/TransferredSoftreeHero"
import TransferredSoftreeHeroToolkit from "@/components/homepage/TransferredSoftreeHeroToolkit"
import LogoLoop from "@/components/brilliance/LogoLoop/LogoLoop"
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
  LightFAQ,
} from "@/components/homepage-light/LightSections"
import LightBentoGrid from "@/components/homepage-light/LightBentoGrid"
import LightFooterPro from "@/components/homepage-light/LightFooterPro"
import LightWhySoftree from "@/components/homepage-light/LightWhySoftree"
import LightCodePath from "@/components/homepage-light/LightCodePath"
import LightHorizontalCodePath from "@/components/homepage-light/LightHorizontalCodePath"
import LightForEnterprise from "@/components/homepage-light/LightForEnterprise"
import LightMidCTA from "@/components/homepage-light/LightMidCTA"
import LightFinalCTA from "@/components/homepage-light/LightFinalCTA"
import LightAIAgents from "@/components/homepage-light/LightAIAgents"
import LightGlobalShowcase from "@/components/homepage-light/LightGlobalShowcase"
import LightBlog from "@/components/homepage-light/LightBlog"
import { SoftreeBlogSection } from "@/components/homepage/SoftreeBlogSection"
import LightBlogSection from "@/components/homepage-light/LightBlogSection"
import FeaturesShowcase from "@/components/features/FeaturesShowcase"
import LightFeaturesV1 from "@/components/homepage-light/LightFeaturesV1"
import CoreFeatures from "@/components/homepage-light/CoreFeatures"
import LightBenefitSection from "@/components/homepage-light/LightBenefitSection"
import LightCoreFeatures from "@/components/homepage-light/LightCoreFeatures"
import LightAboutMerged from "@/components/homepage-light/LightAboutMerged"
import SoftreeServicesHero from "@/components/homepage-light/SoftreeServicesHero"
import LightExpertiseAccordion from "@/components/homepage-light/LightExpertiseAccordion"
import LightHowWeWork from "@/components/homepage-light/LightHowWeWork"
import LightIndustriesCarousel from "@/components/homepage-light/LightIndustriesCarousel"
import LightFAQAccordion from "@/components/homepage-light/LightFAQAccordion"
import LightFAQExact from "@/components/homepage-light/LightFAQExact"
import LightAwardsGrid from "@/components/homepage-light/LightAwardsGrid"
import VisionHero from "@/components/vision/VisionHero"
import { color } from "@/components/homepage-light/tokens"
import LightToolkitHero from "@/components/homepage-light/LightToolkitHero"

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

      {/* Partner / client logo marquee */}
      <section className="w-full border-y border-black/5 bg-[#f6f6f6] py-10">
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-[#111111]/50">
          Trusted by teams worldwide
        </p>
        <LogoLoop
          logos={[
            { src: "/images/google-logo-1.svg", alt: "Google", href: "#" },
            { src: "/images/kpmg-logo-1.svg", alt: "KPMG", href: "#" },
            { src: "/images/bcg-logo-1.svg", alt: "BCG", href: "#" },
            { src: "/images/logo/bayer.svg", alt: "Bayer", href: "#" },
            { src: "/images/americana-logo1.svg", alt: "Americana", href: "#" },
            { src: "/images/kfc-logo1.svg", alt: "KFC", href: "#" },
            { src: "/images/dominose-logo.svg", alt: "Domino's", href: "#" },
            { src: "/images/appi-blue-wht-logo.svg", alt: "APPI", href: "#" },
          ]}
          speed={60}
          logoHeight={36}
          gap={72}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#f6f6f6"
          ariaLabel="Softree partners and clients"
        />
      </section>

      <LightToolkitHero />
      <TransferredSoftreeHero />
      <SoftreeServicesHero />
      <LightAboutMerged />
      <LightAwardsGrid />
      <VisionHero />
      <LightFeaturesV1 />
      <LightBenefitSection />
      <LightCoreFeatures />
      <CoreFeatures />
      <LightExpertiseAccordion />
      <LightHowWeWork />
      <SoftreeBlogSection />
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
      <LightCodePath />
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
      <LightBlog />
      <LightAwardsGrid />
      <LightFAQExact />
      <LightFAQAccordion />
      <LightFAQ />
      <LightFinalCTA />
      <LightFooterPro />
    </main>
  )
}
