"use client";

import { useState } from "react";
import { CheckCircle2, Clock3, TriangleAlert } from "lucide-react";

export function SystemSignalsSection() {
  const [view, setView] = useState<"live" | "archive">("live");

  return (
    <section className="mx-auto w-full max-w-[1200px] bg-[#F7F5F3] px-6 py-12 text-[#37322F] md:px-10">
      <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-6">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded border border-black/10 bg-[#E0DEDB] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-indigo-600 shadow-sm">
              SIG_01
            </span>
          </div>
          <h2 className="text-2xl font-medium tracking-tight text-[#37322F] md:text-3xl">
            System Signals
          </h2>
          <p className="mt-2 max-w-[58ch] text-sm font-light leading-relaxed text-[#605A57]">
            Live telemetry highlights and archived signal snapshots-at a glance, without leaving the command surface.
          </p>
        </div>

        <div className="hidden items-center rounded border border-black/10 bg-white p-1 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)] sm:flex">
          <div className="relative flex w-full items-center">
            <div
              className={`absolute top-0 bottom-0 w-1/2 rounded border border-black/5 bg-[#E0DEDB] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_2px_4px_0_rgba(0,0,0,0.05)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                view === "archive" ? "translate-x-full" : "translate-x-0"
              }`}
            />
            <button
              className={`relative z-10 w-24 flex-1 py-1.5 text-center font-mono text-xs uppercase tracking-wider transition-colors duration-300 ${
                view === "live" ? "text-[#37322F]" : "text-[#828387] hover:text-[#37322F]"
              }`}
              onClick={() => setView("live")}
            >
              Live
            </button>
            <button
              className={`relative z-10 w-24 flex-1 py-1.5 text-center font-mono text-xs uppercase tracking-wider transition-colors duration-300 ${
                view === "archive" ? "text-[#37322F]" : "text-[#828387] hover:text-[#37322F]"
              }`}
              onClick={() => setView("archive")}
            >
              Archive
            </button>
          </div>
        </div>
      </div>


      <div className="min-h-[400px]">
        {view === "live" ? (
          <div className="space-y-6 opacity-100 transition-all duration-300">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
              <article className="group relative flex flex-col rounded-xl border border-[#27272a] bg-[#18181b] p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_1px_2px_0_rgba(0,0,0,0.5),0_4px_12px_0_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-0.5 lg:col-span-2">
                <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-lg border border-white/5 bg-gradient-to-b from-[#202023] to-[#18181b] p-6 md:flex-row">
                  <div className="relative h-48 w-full overflow-hidden rounded border border-[#27272a] bg-[#0f0f11] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] md:h-auto md:w-1/2">
                    <img
                      src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3abecb91-7a25-48a9-994b-1afb799b6db7_800w.webp"
                      alt="Signal Map"
                      className="h-full w-full object-cover opacity-60 mix-blend-luminosity transition-all duration-500 group-hover:opacity-100 group-hover:mix-blend-normal"
                    />
                    <div className="absolute left-3 top-3 rounded border border-[#27272a] bg-[#18181b] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-500 shadow-sm">
                      ALERT
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col justify-center pt-2 md:w-1/2">
                    <h3 className="mb-3 text-xl font-medium tracking-tight text-slate-100 drop-shadow-md md:text-2xl">
                      Latency spike detected in EU-West nodes
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-slate-400">
                      Automated traffic shaping rerouted 4.2TB of inference requests to US-East, maintaining SLA
                      thresholds without manual intervention.
                    </p>
                    <div className="mt-auto rounded border border-[#27272a] bg-[#111113] p-3 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.6)]">
                      <div className="flex items-center justify-between font-mono text-xs text-slate-500">
                        <div className="flex items-center gap-2">
                          <TriangleAlert className="h-4 w-4 text-amber-500/80" />
                          <span>SYS_REROUTE</span>
                        </div>
                        <span className="text-cyan-500/80">T-02:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              <article className="group relative flex flex-col rounded-xl border border-[#27272a] bg-[#18181b] p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_1px_2px_0_rgba(0,0,0,0.5),0_4px_12px_0_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-0.5">
                <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-white/5 bg-gradient-to-b from-[#202023] to-[#18181b] p-5">
                  <div className="relative mb-5 h-36 w-full overflow-hidden rounded border border-[#27272a] bg-[#0f0f11] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                    <img
                      src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/variants/01649452-7e40-44c3-89cd-683f4030d473/800w.jpg"
                      alt="Model Cache"
                      className="h-full w-full object-cover opacity-60 mix-blend-luminosity transition-all duration-500 group-hover:opacity-100 group-hover:mix-blend-normal"
                    />
                    <div className="absolute left-2 top-2 rounded border border-[#27272a] bg-[#18181b] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-400 shadow-sm">
                      PATCH
                    </div>
                  </div>

                  <h3 className="mb-2 text-base font-medium tracking-tight text-slate-100 drop-shadow-md">
                    Inference routing updated for lower jitter
                  </h3>
                  <p className="mb-6 flex-grow text-xs leading-relaxed text-slate-400">
                    New kernel-level optimizations deployed across all edge caching nodes.
                  </p>
                  <div className="rounded border border-[#27272a] bg-[#111113] p-2 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.6)]">
                    <div className="flex items-center justify-between font-mono text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500/80" />
                        VERIFIED
                      </span>
                      <span className="text-slate-400">T-01:00</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { k: "NODE_LOAD", v: "72%", s: "saturation", status: "OPTIMIZED", color: "text-cyan-500/80" },
                { k: "QUEUE_DEPTH", v: "1,284", s: "pending", status: "BURSTING", color: "text-amber-500/80" },
                { k: "TRACE_DRIFT", v: "+0.19", s: "variance", status: "NOMINAL", color: "text-emerald-500/80" },
              ].map((card) => (
                <div
                  key={card.k}
                  className="group relative flex h-full flex-col rounded-xl border border-[#27272a] bg-[#18181b] p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_2px_8px_0_rgba(0,0,0,0.4)] transition-colors hover:border-[#3f3f46]"
                >
                  <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-white/5 bg-gradient-to-b from-[#202023] to-[#18181b] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{card.k}</span>
                      <span className={`font-mono text-[9px] ${card.color}`}>{card.status}</span>
                    </div>
                    <div className="mb-1 flex items-end gap-2">
                      <div className="font-mono text-3xl tracking-tight text-slate-100">{card.v}</div>
                      <div className="mb-1.5 font-mono text-[11px] text-slate-500">{card.s}</div>
                    </div>
                    <div className="mt-auto border-t border-[#27272a] pt-3">
                      <div className="font-mono text-[9px] uppercase text-slate-500">Health</div>
                      <div className="font-mono text-xs text-slate-300">Nominal</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 opacity-100 transition-all duration-300 md:grid-cols-3">
            {[
              ["SNAPSHOT_24H", "Last 24 hours", "3 anomalies"],
              ["SNAPSHOT_7D", "Last 7 days", "11 anomalies"],
              ["SNAPSHOT_30D", "Last 30 days", "42 anomalies"],
            ].map(([tag, title, stat]) => (
              <div
                key={tag}
                className="group relative flex h-full flex-col rounded-xl border border-[#27272a] bg-[#131315] p-1 opacity-80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-opacity hover:opacity-100"
              >
                <div className="flex h-full flex-col justify-between rounded-lg border border-white/5 p-5">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">{tag}</span>
                    <span className="rounded border border-[#3f3f46] bg-[#27272a] px-1.5 py-0.5 font-mono text-[9px] text-slate-400">
                      ARCHIVED
                    </span>
                  </div>
                  <div>
                    <div className="mb-1 font-mono text-xl tracking-tight text-slate-300">{title}</div>
                    <div className="font-mono text-[11px] text-slate-600">{stat}</div>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-[#27272a] pt-4 font-mono text-[10px] text-slate-600">
                    <Clock3 className="h-3.5 w-3.5" />
                    <span>Synced</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

