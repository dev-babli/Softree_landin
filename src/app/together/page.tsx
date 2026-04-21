"use client"

import { ReactLenis } from "lenis/react"
import { TogetherAnnouncementBar } from "@/components/together/TogetherAnnouncementBar"
import { TogetherNavbar } from "@/components/together/TogetherNavbar"
import { TogetherHero } from "@/components/together/TogetherHero"
import { TogetherProductGrid } from "@/components/together/TogetherProductGrid"
import { TogetherResearchSection } from "@/components/together/TogetherResearchSection"
import { TogetherFooter } from "@/components/together/TogetherFooter"
import styles from "@/styles/together.module.css"

export default function TogetherPage() {
  return (
    <ReactLenis root>
      <main className={styles.togetherScope}>
        <TogetherAnnouncementBar />
        <TogetherNavbar />
        
        <div className="relative">
          {/* Background decoration elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-[800px] pointer-events-none overflow-hidden">
            <div className="absolute -top-[400px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-white/[0.03] blur-[120px] rounded-full" />
          </div>

          <TogetherHero />
          
          <div className="relative z-10">
            <TogetherProductGrid />
            <TogetherResearchSection />
            
            {/* Customer Stories / Testimonials could be added here */}
            <section className="py-24 border-t border-white/5">
              <div className={styles.container}>
                <div className="flex flex-wrap items-center justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                  {/* Mock logos */}
                  <div className="text-2xl font-bold tracking-tighter">ZILLIZ</div>
                  <div className="text-2xl font-bold tracking-tighter">COHERE</div>
                  <div className="text-2xl font-bold tracking-tighter">UPSTAGE</div>
                  <div className="text-2xl font-bold tracking-tighter">SNORKEL</div>
                  <div className="text-2xl font-bold tracking-tighter">ADOBE</div>
                </div>
              </div>
            </section>

            <TogetherFooter />
          </div>
        </div>
      </main>
    </ReactLenis>
  )
}
