"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const blogPosts = [
  {
    id: 1,
    title: "Designing for Emotion: The Secret to Memorable Brands.",
    category: "Advice",
    date: "Nov 14, 2025",
    image: "https://cdn.prod.website-files.com/6916390ccd119327e597f20f/69163a5192d7749a090ca88b_Blog-Image-1.jpg",
    href: "/blog-posts/designing-for-emotion-the-secret-to-memorable-brands-3",
  },
  {
    id: 2,
    title: "The Power of Minimalism in Modern Web Design.",
    category: "Advice",
    date: "Nov 14, 2025",
    image: "https://cdn.prod.website-files.com/6916390ccd119327e597f20f/69163a37dc79e51d34432ff1_Blog-Image-2.jpg",
    href: "/blog-posts/the-power-of-minimalism-in-modern-web-design",
  },
  {
    id: 3,
    title: "Building Digital Trust Through Strong Brand Identity.",
    category: "Advice",
    date: "Nov 14, 2025",
    image: "https://cdn.prod.website-files.com/6916390ccd119327e597f20f/69163a128551ce062ec12c66_Blog-Image-3.jpg",
    href: "/blog-posts/building-digital-trust-through-strong-brand-identity",
  },
]

export default function LightBlogSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none none",
      },
    })

    tl.from(titleRef.current, {
      y: 60,
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.8,
      ease: "power3.out",
    })

    tl.from(cardsRef.current?.querySelectorAll("[data-blog-card]") ?? [], {
      y: 80,
      opacity: 0,
      filter: "blur(8px)",
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    }, "-=0.4")
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative w-full bg-white py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[360px_1fr] lg:gap-16">
          {/* Left Title Section */}
          <div ref={titleRef}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1852FF]/20 bg-[#eef4ff] px-4 py-2">
              <Image
                src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/690f9e158664fc7bd2753513_Subtitle-Icon.svg"
                alt=""
                width={16}
                height={16}
                className="h-4 w-4"
              />
              <span className="text-sm font-medium text-[#1852FF]">News &amp; Articles</span>
            </div>
            
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#0a0a1a] md:text-4xl lg:text-5xl">
              Fresh Perspectives On{" "}
              <span className="text-[#1852FF]">Strategy.</span>
            </h2>
            
            <p className="mb-8 max-w-sm text-base leading-relaxed text-[#0a0a1a]/70">
              We combine strategy, creativity, and technology to help brands grow in the modern digital landscape.
            </p>
            
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-3 rounded-full bg-[#1852FF] px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#0a3acc]"
            >
              <span>View All Articles</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>

          {/* Right Blog Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                data-blog-card
                className="group flex flex-col"
              >
                {/* Image */}
                <Link href={post.href} className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  {/* Meta */}
                  <div className="mb-3 flex items-center gap-2 text-sm text-[#0a0a1a]/60">
                    <span className="font-medium text-[#1852FF]">{post.category}</span>
                    <span className="h-1 w-1 rounded-full bg-[#0a0a1a]/40" />
                    <span>{post.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 flex-1 text-lg font-semibold leading-snug text-[#0a0a1a] transition-colors group-hover:text-[#1852FF]">
                    <Link href={post.href}>{post.title}</Link>
                  </h3>

                  {/* Read More */}
                  <Link
                    href={post.href}
                    className="group/link inline-flex items-center gap-2 text-sm font-medium text-[#0a0a1a] transition-colors hover:text-[#1852FF]"
                  >
                    <span>Read More</span>
                    <span className="relative h-4 w-4 overflow-hidden">
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-4 group-hover/link:-translate-y-4" />
                      <ArrowUpRight className="absolute left-0 top-0 h-4 w-4 -translate-x-4 translate-y-4 transition-transform group-hover/link:translate-x-0 group-hover/link:translate-y-0" />
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
