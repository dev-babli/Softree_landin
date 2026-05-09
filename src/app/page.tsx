import Homepage from "@/components/homepage/Homepage"
import SoftreeCohereNav from "@/components/homepage/SoftreeCohereNav"

/* The <main> landmark lives inside <Homepage /> (with id="main-content"
 * for the page-level skip-to-content link), so this top-level wrapper
 * is a div — never nest <main> inside another <main>. */
export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <SoftreeCohereNav />
      <Homepage />
    </div>
  )
}
