import type { Metadata } from "next"
import HomePageClone from "@/components/homepage-clone/HomePageClone"
import SoftreeCohereNav from "@/components/homepage-clone/SoftreeCohereNav"

export const metadata: Metadata = {
  title: "Softree Homepage Clone",
  description: "Safe GSAP storytelling homepage clone for Softree Technology.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function HomepageCloneRoute() {
  return (
    <>
      <SoftreeCohereNav />
      <HomePageClone />
    </>
  )
}
