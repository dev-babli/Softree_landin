import LightNav from "@/components/homepage-light/LightNav"
import LightFooter from "@/components/homepage-light/LightFooter"
import MotionHero from "@/components/homepage-light/motion/MotionHero"
import {
  MotionMindset,
  MotionSteps,
  MotionTutorials,
  MotionInspiration,
  MotionTools,
  MotionCTA,
} from "@/components/homepage-light/motion/MotionSections"

const NAV_LINKS = [
  { label: "Mindset", href: "#mindset" },
  { label: "Roadmap", href: "#steps" },
  { label: "Tutorials", href: "#tutorials" },
  { label: "Tools", href: "#tools" },
  { label: "Home", href: "/light" },
]

export default function LightMotionPage() {
  return (
    <main className="relative w-full">
      <LightNav
        links={NAV_LINKS}
        cta={{ label: "Work with us", href: "#contact" }}
        homeHref="/light/motion"
      />
      <MotionHero />
      <MotionMindset />
      <MotionSteps />
      <MotionTutorials />
      <MotionInspiration />
      <MotionTools />
      <MotionCTA />
      <LightFooter />
    </main>
  )
}
