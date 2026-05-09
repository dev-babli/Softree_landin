import Link from "next/link"

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center bg-[#F3F0EE] px-6 text-[#0E0E0F]">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-[#0E0E0F]/55">
          404 · Page not found
        </span>
        <h1
          className="font-semibold tracking-[-0.04em]"
          style={{ fontSize: "clamp(48px, 8vw, 96px)", lineHeight: 0.95 }}
        >
          We can&rsquo;t find that page.
        </h1>
        <p className="max-w-md text-[15px] leading-[1.55] text-[#0E0E0F]/70">
          The page you&rsquo;re looking for moved or never existed. From here you can head home, browse services, or get in touch.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#0E0E0F] px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-[#0E0E0F]/15 px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#0E0E0F] transition-colors duration-200 hover:bg-[#0E0E0F]/5"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-[#0E0E0F]/15 px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#0E0E0F] transition-colors duration-200 hover:bg-[#0E0E0F]/5"
          >
            Contact
          </Link>
        </div>
      </div>
    </main>
  )
}
