import TransferredSoftreeHeroToolkit from "@/components/homepage/TransferredSoftreeHeroToolkit"
import LightNavPro from "@/components/homepage-light/LightNavPro"
import LightFooterPro from "@/components/homepage-light/LightFooterPro"

export const metadata = {
  title: "Hero + Toolkit Demo | Softree",
  description:
    "Demo: TransferredSoftreeHero intro → LightToolkitHero radial carousel after-scroll reveal.",
}

export default function HeroToolkitDemoPage() {
  return (
    <main className="relative w-full bg-[#f6f6f6]">
      <LightNavPro />
      <TransferredSoftreeHeroToolkit />

      {/* Spacer so the pin releases cleanly before the footer */}
      <section className="w-full bg-[#f6f6f6] py-24 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-[#111111] md:text-4xl">
            That&apos;s the combined experience.
          </h2>
          <p className="mt-4 text-[15px] text-[#111111]/60">
            Intro hero from <code className="rounded bg-[#eaeaea] px-1.5 py-0.5 text-[13px]">TransferredSoftreeHero</code>{" "}
            → on scroll, the mask expands and reveals the{" "}
            <code className="rounded bg-[#eaeaea] px-1.5 py-0.5 text-[13px]">LightToolkitHero</code>{" "}
            radial carousel instead of the original 3-card setup.
          </p>
        </div>
      </section>

      <LightFooterPro />
    </main>
  )
}
