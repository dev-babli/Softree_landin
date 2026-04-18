import NavigationClient from "@/components/sections/navigation-client"
import Homepage from "@/components/homepage/Homepage"

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <NavigationClient />
      <Homepage />
    </main>
  )
}
