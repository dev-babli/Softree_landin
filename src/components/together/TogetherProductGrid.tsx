"use client"

import { motion } from "framer-motion"
import styles from "@/styles/together.module.css"

const products = [
  {
    title: "Inference",
    description: "Deploy and scale the world's most powerful open-source models with industry-leading performance and pricing.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20L12 2 2 12z"/></svg>
    )
  },
  {
    title: "Fine-tuning",
    description: "Customize models with your data using efficient techniques like QLoRA and full fine-tuning on our H100 clusters.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    )
  },
  {
    title: "GPU Clusters",
    description: "On-demand and reserved H100 GPU clusters for large-scale training and inference with low-latency interconnects.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
    )
  }
]

export function TogetherProductGrid() {
  return (
    <section className="py-24 bg-[#080808]">
      <div className={styles.container}>
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">A complete AI platform.</h2>
          <p className="text-lg text-white/50 max-width-xl"> everything you need to build, train, and deploy AI at scale.</p>
        </div>

        <div className={styles.featureGrid}>
          {products.map((product, idx) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={styles.card}
            >
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 text-white/80 border border-white/10">
                {product.icon}
              </div>
              <h3 className={styles.cardTitle}>{product.title}</h3>
              <p className={styles.cardDescription}>{product.description}</p>
              
              <div className="mt-8 flex items-center gap-2 text-white/40 group-hover:text-white transition-colors cursor-pointer text-sm font-semibold uppercase tracking-wider">
                Learn more
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transform transition-transform group-hover:translate-x-1">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
