"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import { ChevronUp, ChevronDown } from "lucide-react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const testimonials = [
  {
    id: 0,
    map: "VNM",
    quote: "Osmo empowered me to take on any creative challenge",
    name: "Dang Nguyen",
    role: "Head of Creative",
    image: "https://osmo.b-cdn.net/website/author/dang-nguyen-270x270.avif",
    text: "Thanks to Osmo, I've won my first major awards and signed clients I once only dreamed of. Their powerful, easy-to-use effects feature cutting-edge code that has expanded my development skills. Joining this community is an easy choice for developers at any level who want to grow and succeed!",
  },
  {
    id: 1,
    map: "UK",
    quote: "This gets the official GSAP stamp of approval.",
    name: "Cassie Evans",
    role: "Education GSAP",
    image: "https://osmo.b-cdn.net/website/author/cassie-evans-270x270.avif",
    text: "Even if you know GSAP, it can be tricky to apply abstract animation concepts to real-world scenarios. Dennis and Ilja have come to the rescue with this treasure-trove of useful techniques. There's something for everyone here, grab-and-go or use the code as a jumping off point.",
  },
  {
    id: 2,
    map: "AUS",
    quote: "One of a kind platform for any developers out there.",
    name: "Huy (by Huy)",
    role: "Designer & YT creator",
    image: "https://osmo.b-cdn.net/website/author/by-huy-270x270.avif",
    text: "It's incredible to be able to see and learn how the pros implement their animations. If you love web animations and creative development, this platform this a no brainer. Just sign up already.",
  },
  {
    id: 3,
    map: "UK2",
    quote: "The creative developer's cheat code.",
    name: "Jordan Gilroy",
    role: "Web Designer",
    image: "https://osmo.b-cdn.net/website/author/jordan-gilroy-270x270.avif",
    text: "Osmo is a one-stop shop, offering everything from snippets to help you set up your site to advanced animations and interactions that elevate it to the next level. The resources are so easy to implement, and with some imagination, you can adapt them to create something unique.",
  },
  {
    id: 4,
    map: "SWE",
    quote: '"Even I" came across a few neat tricks I hadn\'t seen before.',
    name: "Jesper Landberg",
    role: "Creative Developer",
    image: "https://osmo.b-cdn.net/website/author/jesper-landberg-270x270.avif",
    text: "Osmo Supply is a gem for clever and well-thought-out code/no-code solutions for animations and components. It's a resource both beginners and seasoned pros will find incredibly useful. Lama stamp of approval on this one, and I'll deffo be coming back to it!",
  },
  {
    id: 5,
    map: "CA",
    quote: "The Osmo Vault has been a great partner in speeding up my projects",
    name: "Victor Work",
    role: "VW Lab",
    image: "https://osmo.b-cdn.net/website/author/victor-work-270x270.avif",
    text: "Osmo Supply has been a great partner in speeding and building up my projects since its release. I have used the vault in countless projects, and it's fantastic to be a part of such an inspiring community. Osmo, it's a must-have.",
  },
]

export default function LightTestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const AUTOPLAY_DURATION = 4000

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === activeIndex) return
    setIsAnimating(true)

    const direction = index > activeIndex ? 1 : -1
    const items = sliderRef.current?.querySelectorAll("[data-slide-item]")
    if (!items) return

    // Animate outgoing slide
    gsap.to(items[activeIndex], {
      y: direction * -30 * 16,
      z: -20 * 16,
      rotateX: direction * 60,
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    })

    // Animate incoming slide
    gsap.fromTo(
      items[index],
      {
        y: direction * 30 * 16,
        z: -20 * 16,
        rotateX: direction * -60,
        opacity: 1,
      },
      {
        y: 0,
        z: 0,
        rotateX: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => setIsAnimating(false),
      }
    )

    // Update visibility of other slides
    items.forEach((item, i) => {
      if (i !== activeIndex && i !== index) {
        gsap.set(item, {
          y: i < index ? -30 * 16 : 30 * 16,
          z: -20 * 16,
          rotateX: i < index ? 60 : -60,
          opacity: 0,
        })
      }
    })

    setActiveIndex(index)
  }, [activeIndex, isAnimating])

  const nextSlide = useCallback(() => {
    const next = (activeIndex + 1) % testimonials.length
    goToSlide(next)
  }, [activeIndex, goToSlide])

  const prevSlide = useCallback(() => {
    const prev = (activeIndex - 1 + testimonials.length) % testimonials.length
    goToSlide(prev)
  }, [activeIndex, goToSlide])

  // Autoplay
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      nextSlide()
    }, AUTOPLAY_DURATION)

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [nextSlide])

  // Initial setup
  useGSAP(() => {
    const items = sliderRef.current?.querySelectorAll("[data-slide-item]")
    if (!items) return

    items.forEach((item, i) => {
      if (i === activeIndex) {
        gsap.set(item, { y: 0, z: 0, rotateX: 0, opacity: 1, zIndex: 2 })
      } else if (i < activeIndex) {
        gsap.set(item, { y: -30 * 16, z: -20 * 16, rotateX: 60, opacity: 0, zIndex: 1 })
      } else {
        gsap.set(item, { y: 30 * 16, z: -20 * 16, rotateX: -60, opacity: 0, zIndex: 1 })
      }
    })
  }, [])

  // Scroll reveal animation
  useGSAP(() => {
    gsap.from(sectionRef.current?.querySelectorAll("[data-reveal]") ?? [], {
      y: 60,
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative w-full bg-white py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left - Globe */}
          <div data-reveal className="relative">
            <div className="mb-4">
              <p className="text-2xl font-semibold tracking-tight text-[#0a0a1a]">
                <span className="text-[#1852FF]">Connect</span>
                <br />
                Worldwide
              </p>
            </div>

            {/* Globe SVG */}
            <div className="relative mx-auto aspect-square max-w-[380px]">
              <svg
                viewBox="0 0 380 380"
                className="absolute inset-0 h-full w-full"
                style={{ color: "#1852FF" }}
              >
                <path
                  d="M190.023 369.047V379.047L189.52 379.045L189.547 369.046C189.706 369.046 189.865 369.047 190.023 369.047Z"
                  fill="currentColor"
                />
                <circle
                  cx="190"
                  cy="190"
                  r="184.5"
                  stroke="#e5e7eb"
                  strokeWidth="11"
                  fill="none"
                />
                <circle
                  cx="190"
                  cy="190"
                  r="184.5"
                  stroke="currentColor"
                  strokeWidth="11"
                  fill="none"
                  strokeDasharray="1160"
                  strokeDashoffset="560"
                  transform="rotate(-90 190 190)"
                  style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
              </svg>

              {/* Globe Map */}
              <div className="absolute inset-4 flex items-center justify-center">
                <Image
                  src="https://osmo.b-cdn.net/website/bandwidth/quote-map-base.avif"
                  alt="Globe"
                  width={300}
                  height={300}
                  className="h-full w-full object-contain opacity-80"
                />
              </div>
            </div>

            <p className="mt-4 text-lg font-medium text-[#1852FF]">
              Softree&apos;s Global
              <br />
              Community
            </p>
          </div>

          {/* Right - Slider */}
          <div data-reveal className="relative">
            <div
              ref={sliderRef}
              className="relative h-[500px] overflow-hidden md:h-[550px]"
              style={{ perspective: "1000px" }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  data-slide-item
                  className="absolute inset-1 rounded-2xl border border-[#0a0a1a]/10 bg-[#f8f9fc] p-6 md:p-8"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    pointerEvents: index === activeIndex ? "auto" : "none",
                  }}
                >
                  {/* Quote */}
                  <h3 className="mb-6 text-xl font-bold leading-tight tracking-tight text-[#0a0a1a] md:text-2xl lg:text-3xl">
                    {testimonial.quote}
                  </h3>

                  {/* Lower Content */}
                  <div className="mt-auto">
                    {/* Author Info */}
                    <div className="mb-6 flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-[#1852FF]/20">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-[#0a0a1a]">
                          {testimonial.name}
                        </h4>
                        <span className="inline-block rounded-full bg-[#0a0a1a] px-3 py-1 text-xs font-medium text-white">
                          {testimonial.role}
                        </span>
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-sm leading-relaxed text-[#0a0a1a]/70 md:text-base">
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bullets */}
            <div className="mt-6 flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`group relative h-8 w-8 rounded-full border transition-colors ${
                    index === activeIndex
                      ? "border-[#1852FF] bg-[#1852FF]/10"
                      : "border-[#0a0a1a]/20 hover:border-[#1852FF]/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div
                    className={`absolute left-1/2 top-1/2 h-0.5 w-3 -translate-x-1/2 -translate-y-1/2 transition-colors ${
                      index === activeIndex ? "bg-[#1852FF]" : "bg-[#0a0a1a]/30"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute bottom-0 right-0 flex gap-2">
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#0a0a1a]/20 transition-colors hover:border-[#1852FF] hover:bg-[#1852FF]/10 disabled:opacity-50"
                aria-label="Previous slide"
              >
                <ChevronUp className="h-5 w-5 text-[#0a0a1a] transition-colors group-hover:text-[#1852FF]" />
              </button>
              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#0a0a1a]/20 transition-colors hover:border-[#1852FF] hover:bg-[#1852FF]/10 disabled:opacity-50"
                aria-label="Next slide"
              >
                <ChevronDown className="h-5 w-5 text-[#0a0a1a] transition-colors group-hover:text-[#1852FF]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
