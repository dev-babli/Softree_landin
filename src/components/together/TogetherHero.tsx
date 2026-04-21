"use client"

import { motion } from "framer-motion"
import styles from "@/styles/together.module.css"

export function TogetherHero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[12px] font-semibold text-white/80 uppercase tracking-wider">
              Together Turbo is live
            </span>
          </div>

          <h1 className={styles.heroTitle}>
            The AI Native Cloud. <br />
            <span className="text-white/40">Build what's next.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Together AI is the fastest cloud platform for building and running generative AI. 
            Powered by world-leading research and infrastructure.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button className={styles.ctaButton}>
              Start Building Now
            </button>
            <button className={styles.secondaryButton}>
              Read the Research
            </button>
          </div>
        </motion.div>

        {/* Visual Element: A subtle gradient orb or mesh in the background could go here */}
        <div className="relative mt-20 perspective-1000">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full aspect-[21/9] bg-gradient-to-b from-white/10 to-transparent border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative"
          >
             <div className="absolute inset-0 bg-[url('https://cdn.prod.website-files.com/64f6916c57f724300e84f67c/64f6916c57f724300e84f6d4_hero-grid.svg')] opacity-20 bg-center" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-transparent" />
             
             {/* Simple representation of a dashboard/terminal */}
             <div className="absolute top-12 left-12 right-12 bottom-0 bg-[#0a0a0a] border border-white/5 rounded-t-xl p-8 overflow-hidden">
                <div className="flex gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-red-500/40" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                  <div className="w-2 h-2 rounded-full bg-green-500/40" />
                </div>
                <div className="space-y-4 font-mono text-sm text-white/40">
                  <p className="text-white/80">$ together inference start llama-3-70b-instruct</p>
                  <p>Downloading model shards...</p>
                  <p>Loading weights onto 8x H100 SXM5...</p>
                  <p className="text-green-400">Model ready. 128 tok/s achieved.</p>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
