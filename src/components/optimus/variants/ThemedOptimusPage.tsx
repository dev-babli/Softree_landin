"use client";

import { Navigation } from "@/components/optimus/landing/navigation";
import { SplitFlapHero, LanyardShowcase } from "@/components/optimus/landing/split-flap-hero";
import { FeaturesSection } from "@/components/optimus/landing/features-section";
import { HowItWorksSection } from "@/components/optimus/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/optimus/landing/infrastructure-section";
import { MetricsSection } from "@/components/optimus/landing/metrics-section";
import { IntegrationsSection } from "@/components/optimus/landing/integrations-section";
import { SecuritySection } from "@/components/optimus/landing/security-section";
import { DevelopersSection } from "@/components/optimus/landing/developers-section";
import { TestimonialsSection } from "@/components/optimus/landing/testimonials-section";
import { SoftreeCTASection } from "@/components/shared/softree-cta-section";
import { FooterSection } from "@/components/optimus/landing/footer-section";
import { GlassMotionCardsGrid } from "@/components/ui/glass-motion-cards";
import { ThemedOptimusLayout } from "@/components/optimus/variants/ThemedOptimusLayout";

export function ThemedOptimusPage({ theme }: { theme: "ocean" | "emerald" | "sunset" | "optimus" }) {
  return (
    <ThemedOptimusLayout theme={theme}>
      <main className="relative min-h-screen overflow-x-hidden noise-overlay">
        <Navigation />

        <div data-theme={theme} className="theme-wrapper transition-colors duration-500">
          <SplitFlapHero />
        </div>

        <LanyardShowcase />

        <FeaturesSection appearance="light" />
        <HowItWorksSection />
        <InfrastructureSection />
        <MetricsSection />
        <IntegrationsSection />
        <SecuritySection />
        <DevelopersSection />
        <TestimonialsSection />
        <SoftreeCTASection variant="optimus" appearance="dark" />

        <FooterSection appearance="dark" />
      </main>
    </ThemedOptimusLayout>
  );
}
