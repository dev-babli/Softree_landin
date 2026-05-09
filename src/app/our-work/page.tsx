import type { Metadata } from "next"
import SoftreeProjectShowcase from "@/components/homepage/SoftreeProjectShowcase"

export const metadata: Metadata = {
  title: "Our Work | Softree",
  description:
    "Explore Softree project showcases with a sticky visual portfolio experience.",
}

export default function OurWorkPage() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <SoftreeProjectShowcase />
    </main>
  )
}
