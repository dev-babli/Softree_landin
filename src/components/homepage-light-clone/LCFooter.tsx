"use client"

/**
 * LCFooter — light clone of TogetherFooter.
 * Source is already on a near-white #fbfbfb canvas. We re-skin to cream tokens
 * and keep the giant wordmark + accent dot.
 */

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { color, shadow } from "./tokens"

export function LCFooter() {
  return (
    <footer className="relative w-full overflow-hidden pt-24 pb-8 flex flex-col items-center" style={{ background: color.canvas, color: color.ink }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .footer_link .transition-icon { opacity: 0; transform: translateX(-50%); transition: all 0.3s ease; }
        .footer_link:hover .transition-icon { opacity: 1; transform: translateX(0%); }
      `}} />

      <div className="relative z-10 w-full max-w-[1440px] px-4 md:px-8 flex flex-col items-center">
        <div className="flex flex-col items-center text-center mt-8 mb-20 lg:mb-28">
          <h2 className="text-[32px] md:text-4xl lg:text-[40px] font-semibold tracking-[-0.02em] mb-4" style={{ color: color.ink }}>
            Start building on Softree Technology
          </h2>
          <div className="mb-7" style={{ color: color.slate }}>
            <p className="text-[15px] font-medium max-w-2xl px-4">
              From enterprise solutions and custom development to large-scale production deployment
            </p>
          </div>
          <a href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] hover:scale-[1.02] transition-transform duration-300"
            style={{ background: color.ink, color: color.lifted }}>
            Get Started now
          </a>
        </div>

        <div className="w-full rounded-[32px] md:rounded-[40px] p-8 md:p-14 lg:p-[72px_72px_48px] relative overflow-hidden"
          style={{ background: color.lifted, border: `1px solid ${color.dustTaupe}`, boxShadow: shadow.golden }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 mb-24 w-full">
            <div className="lg:col-span-3 pt-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" viewBox="0 0 43 40" fill="none">
                <path d="M41.5581 5.36307C38.5903 0.237447 32.0163 -1.51861 26.876 1.44026C23.5688 3.34406 21.6606 6.71038 21.5104 10.2524L32.252 10.2661L32.2507 11.1845H21.5098C21.579 12.8585 22.0431 14.5267 22.9414 16.0784C25.9092 21.204 32.4831 22.9601 37.6241 20.0006C42.7651 17.0417 44.5265 10.4874 41.5581 5.36177V5.36307Z" fill={color.flame} />
                <path d="M1.44161 5.35989C-1.52614 10.4855 0.235183 17.0392 5.37553 19.9987C8.68275 21.9025 12.5612 21.8667 15.713 20.2258L10.3546 10.9444L11.153 10.4862L16.5232 19.7598C17.9424 18.8629 19.16 17.6282 20.0582 16.0765C23.026 10.9509 21.2647 4.39725 16.1243 1.43772C10.9827 -1.5218 4.40935 0.23426 1.44161 5.35989Z" fill={color.sunshine} />
                <path d="M21.4978 40.0003C27.4339 40.0003 32.2459 35.2027 32.2459 29.2843C32.2459 25.4767 30.2757 22.1462 27.2747 20.245L21.8915 29.5128L21.0944 29.0526L26.4645 19.779C24.9761 19.0018 23.2944 18.5684 21.4972 18.5684C15.561 18.5684 10.749 23.3659 10.749 29.2843C10.749 35.2027 15.561 40.0003 21.4972 40.0003H21.4978Z" fill={color.mistral} />
              </svg>
            </div>

            <div className="lg:col-span-9 grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 w-full">
              {[
                { title: "Services", links: [
                  { name: "Full Stack Development", href: "/services" },
                  { name: "Mobile App Dev", href: "/services" },
                  { name: "SharePoint Solutions", href: "/services" },
                  { name: "Power Platform", href: "/services" },
                  { name: "Cloud & DevOps", href: "/services" },
                  { name: "AI & ML Solutions", href: "/services" },
                ]},
                { title: "Technologies", links: [
                  { name: "See all technologies", href: "/services" },
                  { name: "React / Next.js", href: "/services" },
                  { name: "Flutter", href: "/services" },
                  { name: "Angular", href: "/services" },
                  { name: "Node.js", href: "/services" },
                  { name: ".NET / C#", href: "/services" },
                  { name: "Python", href: "/services" },
                ]},
                { title: "Engagement", links: [
                  { name: "Dedicated Teams", href: "/services" },
                  { name: "Project Based", href: "/services" },
                  { name: "Enterprise", href: "/contact" },
                ]},
                { title: "Resources", links: [
                  { name: "Blog", href: "/blog" },
                  { name: "About us", href: "/about-us" },
                  { name: "Careers", href: "/careers" },
                  { name: "Customer Stories", href: "/case-studies" },
                  { name: "Support", href: "/contact" },
                ]},
              ].map((col) => (
                <div key={col.title}>
                  <div className="pt-3 mb-4" style={{ borderTop: `1px solid ${color.dustTaupe}` }}>
                    <p className="text-[10px] font-semibold tracking-[0.1em] uppercase" style={{ color: color.slate }}>{col.title}</p>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {col.links.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className="footer_link group flex items-center text-[13px] font-medium transition-colors" style={{ color: color.charcoal }}>
                          {link.name}
                          <span className="hidden lg:block ml-2 transition-icon" style={{ color: color.dustTaupe }}>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Giant wordmark */}
          <div className="w-full flex justify-center mt-auto mb-10 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 891 205" fill="none" className="max-w-[891px] w-full h-auto mx-auto" style={{ color: color.ink }}>
              <text x="0" y="175" fontFamily="Inter, system-ui, sans-serif" fontSize="200" fontWeight="800" letterSpacing="-8" fill="currentColor" fillOpacity="0.10">
                softree.
              </text>
            </svg>
            <div className="absolute" style={{ bottom: "28%", right: "32%", width: 12, height: 12, borderRadius: "50%", background: color.flame }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12 w-full mt-2">
            <div className="lg:col-span-3 flex items-end">
              <p className="text-[9px] font-mono tracking-widest uppercase leading-relaxed font-semibold" style={{ color: color.slate }}>
                © {new Date().getFullYear()} Softree Technology.<br />All Rights Reserved.
              </p>
            </div>
            <div className="lg:col-span-9 flex justify-between items-end w-full">
              <div className="flex items-center gap-6">
                <a href="/privacy-policy" className="text-[12px] font-medium transition-colors" style={{ color: color.slate }}>Privacy Policy</a>
                <a href="/privacy-policy" className="text-[12px] font-medium transition-colors" style={{ color: color.slate }}>Terms of service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default LCFooter
