import Homepage from "@/components/homepage/Homepage"
import CohereNavClient from "@/components/CohereNavClient"

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <CohereNavClient />
      <Homepage />
    </main>
  )
}
