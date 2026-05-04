import LightAIGallery from "@/components/homepage-light/LightAIGallery"

export default function LightAIGalleryShowcasePage() {
  return (
    <main className="min-h-screen w-full bg-[#060112] text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16 md:px-12 md:py-24">
        <header className="max-w-3xl text-balance text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
            Showcase · Dark AI Hero
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
            LightAIGallery hero, isolated and ready to review
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
            This page renders the rebuilt ultraviolet AI art hero in isolation so you can review
            the orbit system, headline animation, and neon gallery cards without the rest of the
            Light homepage framing it.
          </p>
        </header>

        <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_120px_rgba(82,0,140,0.55)]">
          <LightAIGallery />
        </div>

        <footer className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">How to explore</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
              Scroll the hero to watch GSAP scroll triggers animate the orbit icons, headline,
              marquee cards, and prompt bar. The cards use <code>next/image</code> for optimized
              loading and retain the neon saturation from the reference shot.
            </p>
          </div>
          <ul className="grid gap-2 text-sm text-white/70">
            <li>• Entrance animations: triggered on first viewport entry.</li>
            <li>• Parallax: gallery cards drift subtly with scroll.</li>
            <li>• CTA + rating chip: staged with delayed reveals.</li>
          </ul>
        </footer>
      </section>
    </main>
  )
}
