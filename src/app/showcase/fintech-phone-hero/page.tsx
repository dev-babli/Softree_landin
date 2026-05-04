import FintechPhoneCardsHero from "@/components/fintech-phone-cards/FintechPhoneCardsHero"

export default function FintechPhoneHeroPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      <section className="mx-auto flex w-full flex-col gap-10">
        <header className="px-6 pt-16 md:px-12 md:pt-24 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60">
            Showcase · Fintech Phone Hero
          </p>
          <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
            3D phone with floating payment cards
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
            A premium hero component recreating a 4s looping product animation.
            Four cards glide diagonally across a perspective-angled smartphone
            with glass reflections, neon glows, and a mirrored conveyor loop.
          </p>
        </header>

        <FintechPhoneCardsHero />

        <footer className="mx-6 mb-16 rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-sm leading-relaxed text-white/70 backdrop-blur md:mx-12">
          Pass a <code>cards</code> prop to swap gradient, label, or motion paths.
          Set <code>animate=&#123;false&#125;</code> to freeze the pose for static shots.
          Uses CSS <code>preserve-3d</code> + Framer Motion — no image assets required.
        </footer>
      </section>
    </main>
  )
}
