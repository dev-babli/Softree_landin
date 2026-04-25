import type { Metadata } from "next"
import NavigationClient from "@/components/sections/navigation-client"
import WebDevelopmentStoryExperience from "./WebDevelopmentStoryExperience"

export const metadata: Metadata = {
  title: "Web Application Development | Softree Technology",
  description:
    "Softree builds fast, secure, production-ready web applications with strategy, UX, engineering, integrations, and launch systems.",
}

export default function WebAppDevelopmentPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <NavigationClient />
      <WebDevelopmentStoryExperience />
    </main>
  )
}
