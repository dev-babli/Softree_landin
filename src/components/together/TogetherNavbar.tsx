"use client"

import Link from "next/link"
import styles from "@/styles/together.module.css"

const navItems = [
  { label: "Platform", items: ["Serverless", "GPU Clusters", "Endpoints"] },
  { label: "Models", items: ["Llama 3", "Mixtral", "Stable Diffusion"] },
  { label: "Research", items: ["FlashAttention", "RedPajama"] },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "https://docs.together.ai" },
]

export function TogetherNavbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`${styles.container} flex items-center justify-between`}>
        <div className="flex items-center gap-12">
          <Link href="/together" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-sm transform rotate-45" />
            </div>
            <span className="font-bold text-xl tracking-tight">Together AI</span>
          </Link>

          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <div key={item.label} className={`${styles.navLink} group relative py-4`}>
                {item.href ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <span className="flex items-center gap-1">
                    {item.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-40 group-hover:rotate-180 transition-transform">
                      <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
                
                {!item.href && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                    <div className="bg-[#0e0e0e] border border-white/10 rounded-xl p-4 min-w-[200px] shadow-2xl">
                      {item.items?.map((subItem) => (
                        <Link 
                          key={subItem} 
                          href="#" 
                          className="block py-2 text-sm text-white/60 hover:text-white transition-colors"
                        >
                          {subItem}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            Login
          </Link>
          <Link href="#" className={styles.ctaButton}>
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}
