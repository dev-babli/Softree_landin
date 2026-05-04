import CardWalletShowcase from "@/components/card-wallet-showcase/CardWalletShowcase"

export default function CardWalletShowcasePage() {
  return (
    <main className="min-h-screen w-full bg-[#05040a] text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 md:px-12 md:py-24">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60">
            Showcase · Pixel Perfect
          </p>
          <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
            Card Wallet Hero — exact video frames
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
            This component uses the actual rendered MP4 from the source video,
            giving a true pixel-perfect match. The 4s loop plays seamlessly,
            with an optional text overlay and mouse-reactive parallax.
          </p>
        </header>

        <CardWalletShowcase
          headline="Choose your card"
          subline="Premium metal cards with instant spending notifications"
          cta="Get started"
        />

        <footer className="rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-sm leading-relaxed text-white/70 backdrop-blur">
          The video is served as an H.264 MP4 (0.32 MB) and loops automatically.
          A poster PNG shows while the video loads. Set{" "}
          <code>mouseParallax=&#123;false&#125;</code> to disable the overlay drift.
        </footer>
      </section>
    </main>
  )
}
