import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";
import InspiredByOurValues from "./inspired";
import EngagementModels from "./model";
import Certifications from "@/app/services/business-applications/power-apps/certification";
import WhoWeAre from "./who";
import CoreCapabilities from "./core";
import ProcessTimeline from "./process";
import OriginalSVGStepper from "./process1";
import CTASection from "./cta";
import { HeroSection, MarketInsights } from "@/components/about";

/* ------------------------------------------------------------------ */
/* Fixed Width Config                                                  */
/* ------------------------------------------------------------------ */
const FIXED_WIDTH = "mx-auto max-w-8xl px-8 sm:px-10 md:px-14 lg:px-20";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <NavigationClient />

      {/* HERO (can be full-width internally) */}
      <HeroSection />
      <MarketInsights />
      {/* MAIN CONTENT – FIXED WIDTH */}
      <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
        <div className={FIXED_WIDTH}>
          <WhoWeAre />
          <CoreCapabilities />
          <ProcessTimeline />
          <OriginalSVGStepper />
          <InspiredByOurValues />
          <EngagementModels />
          <Certifications />
          <CTASection/>
        </div>
      </section>
      <Footer />
    </main>
  );
}
