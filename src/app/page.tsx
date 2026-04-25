import Homepage from "@/components/homepage/Homepage"
import SoftreeCohereNav from "@/components/homepage/SoftreeCohereNav"

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <SoftreeCohereNav />
      <Homepage />
    </main>
  )
}
