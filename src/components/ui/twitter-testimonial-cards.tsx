"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { FaTwitter } from 'react-icons/fa'

interface Testimonial {
  name: string
  handle: string
  content: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    name: "Alex Rivera",
    handle: "@arivera_dev",
    content: "The latency reduction we saw after switching to Softree's edge infrastructure was insane. 40% faster globally.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  },
  {
    name: "Sarah Chen",
    handle: "@schen_tech",
    content: "The most cinematic developer experience I've ever had. It's not just a tool, it's a productivity enhancer.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    name: "Marcus Thorne",
    handle: "@mthorne_cloud",
    content: "Softree's agentic AI pipeline handled our RAG deployment with zero manual tuning. Pure magic.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
  }
]

export function Testimonials({ isBento = false }: { isBento?: boolean }) {
  return (
    <div className={cn(
      "grid gap-4",
      isBento ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    )}>
      {testimonials.map((t, i) => (
        <motion.div
          key={t.handle}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-purple-500/30 transition-all group flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full overflow-hidden border border-white/10 bg-white/5">
                <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-tight">{t.name}</span>
                <span className="text-[10px] text-white/40 font-mono">{t.handle}</span>
              </div>
            </div>
            <FaTwitter className="text-sky-400 opacity-20 group-hover:opacity-100 transition-opacity" size={14} />
          </div>
          <p className="text-[11px] leading-relaxed text-white/70 italic p-1">
            "{t.content}"
          </p>
          <div className="mt-auto flex items-center gap-4 text-[9px] text-white/20 font-mono">
             <span>2:41 PM · Oct 12, 2025</span>
             <div className="flex items-center gap-1 group-hover:text-purple-400 transition-colors">
                <div className="size-1 rounded-full bg-purple-500" />
                <span>Verified Client</span>
             </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
