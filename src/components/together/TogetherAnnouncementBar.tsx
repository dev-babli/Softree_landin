"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import styles from "@/styles/together.module.css"

const announcements = [
  "Together AI raises $106M Series C to scale AI infrastructure",
  "Introducing Together Turbo: 10x faster inference for Llama 3",
  "Research: FlashAttention-3 is now available on Together API",
]

export function TogetherAnnouncementBar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className={styles.announcementBar}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="text-[11px] font-bold tracking-widest uppercase bg-white/10 px-2 py-0.5 rounded">
            News
          </span>
          <span className="text-[13px] font-medium text-white/90">
            {announcements[index]}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="ml-1 opacity-60"
          >
            <path
              d="M3.5 1.5L8.5 6L3.5 10.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
