import type { Metadata } from "next"
import Homepage from "@/components/homepage-light-clone/Homepage"
import LightNav from "@/components/homepage-light/LightNav"

export const metadata: Metadata = {
  title: "Softree — Light Edition",
  description:
    "Softree homepage in the warm Mistral / Mastercard light theme — AI, modern apps, Microsoft 365, and data analytics.",
}

export default function HomepageLightPage() {
  return (
    <>
      <LightNav />
      <Homepage />
    </>
  )
}
