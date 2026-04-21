"use client"

import { motion } from "framer-motion"
import styles from "@/styles/together.module.css"

const researchItems = [
  {
    title: "FlashAttention-3",
    description: "Fast and Memory-Efficient Exact Attention with Recursive Attention and IO-Awareness.",
    date: "July 2024"
  },
  {
    title: "RedPajama-V2",
    description: "An open dataset with 30 trillion tokens for training large language models.",
    date: "October 2023"
  },
  {
    title: "Together MoE",
    description: "Exploring Mixture-of-Experts architectural efficiency for open-source foundation models.",
    date: "January 2024"
  }
]

export function TogetherResearchSection() {
  return (
    <section className="py-24">
      <div className={styles.container}>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">Powered by research.</h2>
            <p className="text-lg text-white/50">
              We contribute to the open-source community through cutting-edge research in distributed training, 
              inference optimization, and dataset curation.
            </p>
          </div>
          <button className={styles.secondaryButton}>
            Browse All Papers
          </button>
        </div>

        <div className="space-y-4">
          {researchItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col md:flex-row justify-between p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-pointer"
            >
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2 block">
                  {item.date}
                </span>
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/50 line-clamp-2 md:line-clamp-none">
                  {item.description}
                </p>
              </div>
              <div className="mt-6 md:mt-0 flex items-center gap-4">
                <div className="px-4 py-2 border border-white/10 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-all">
                  Read Paper
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
