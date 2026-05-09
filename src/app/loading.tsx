export default function Loading() {
  return (
    <div className="relative grid min-h-screen place-items-center bg-[#F3F0EE]">
      <span className="sr-only">Loading…</span>
      <div className="flex items-center gap-3 text-[10.5px] font-semibold uppercase tracking-[0.28em] text-[#0E0E0F]/55">
        <span
          aria-hidden
          className="block h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF6B00]"
        />
        Loading
      </div>
    </div>
  )
}
