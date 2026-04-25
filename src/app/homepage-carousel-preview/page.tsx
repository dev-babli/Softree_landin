import type { Metadata } from "next"
import SoftreeCapabilityCarousel from "@/components/homepage/SoftreeCapabilityCarousel"

export const metadata: Metadata = {
  title: "Softree Services Carousel Preview",
  description: "No-index preview route for the reusable Softree services Swiper carousel.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function HomepageCarouselPreviewPage() {
  return (
    <main>
      <SoftreeCapabilityCarousel />
    </main>
  )
}
