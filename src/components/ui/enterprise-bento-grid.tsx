import type { BentoGridItem } from "@/types/demo-page";

interface EnterpriseBentoGridProps {
  items: BentoGridItem[];
}

export function EnterpriseBentoGrid({ items }: EnterpriseBentoGridProps) {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-sky-400">
            Enterprise capabilities
          </p>
          <h2
            className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            style={{ lineHeight: "var(--tw-leading-tight)" }}
          >
            Designed for regulated, Microsoft-first teams.
          </h2>
        </div>
        <p
          className="max-w-md text-xs text-gray-300 sm:text-sm"
          style={{ lineHeight: "var(--tw-leading-tight)" }}
        >
          Each tile represents a discrete capability you can deploy independently
          or as part of a larger AI platform rollout.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.id}
              className={`emil-card-interactive liquid-glass group relative col-span-12 md:col-span-${item.colSpan} row-span-${item.rowSpan} overflow-hidden rounded-3xl p-5 hover:border-white/20`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#38bdf8_0,transparent_55%),radial-gradient(circle_at_bottom_right,#6366f1_0,transparent_55%)] opacity-20 transition-opacity duration-200 ease-out group-hover:opacity-30" />
              <div className="relative z-10 flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] text-gray-200">
                  <Icon className="h-3.5 w-3.5 text-sky-400" />
                  <span>{item.title}</span>
                </div>
                <p
                  className="text-xs text-gray-300"
                  style={{ lineHeight: "var(--tw-leading-tight)" }}
                >
                  {item.description}
                </p>
                <div className="mt-1 flex flex-wrap gap-1.5 text-[11px] text-gray-300">
                  {item.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5"
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

