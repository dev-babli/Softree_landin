import type { Metadata } from "next"
import { RevolutHeroCarousel } from "@/components/homepage/RevolutHeroCarousel"

export const metadata: Metadata = {
  title: "Homepage Final | Softree Technology",
  description: "Softree homepage final build preview.",
}

export default function HomepageFinalPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black text-white">
      <RevolutHeroCarousel />
    </main>
  )
}
