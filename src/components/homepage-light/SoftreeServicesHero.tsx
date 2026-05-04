"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

function TextCycle() {
  const words = ["Innovation", "Growth", "Scale", "Impact", "Results"]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length)
        setIsAnimating(false)
      }, 300)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="relative inline-block min-w-[140px] text-[#1852FF]">
      <motion.span
        key={currentIndex}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={
          isAnimating
            ? { opacity: 0, y: -20, filter: "blur(8px)" }
            : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="inline-block"
      >
        {words[currentIndex]}
      </motion.span>
      <motion.span
        className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-current"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ originX: 0 }}
      />
    </span>
  )
}

function BrandMarquee() {
  const brands = [
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2aefb0c5c9128f0dd58b6_Brand%2007.webp",
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2aefb0f49bca3c1742f2f_Brand%2003.webp",
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2aefbf5f22f3b3bf85a8a_Brand%2001.webp",
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2aefb9dd713edf13a284f_Brand%2002.webp",
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2aefbeb9a99a07522dd00_Brand%2004.webp",
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2aefb0adf56b97802a9be_Brand%2006.webp",
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2aefbc5fc2db00a959c3f_Brand%2005.webp",
  ]

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-32 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-32 bg-gradient-to-l from-white to-transparent" />
      <motion.div
        className="flex items-center gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {[...brands, ...brands].map((src, i) => (
          <div
            key={i}
            className="relative h-12 w-32 shrink-0 opacity-50 transition-opacity hover:opacity-100"
          >
            <img
              src={src}
              alt={`Brand ${i + 1}`}
              className="h-full w-full object-contain grayscale"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function AnimatedButton({ href = "/contact" }: { href?: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-[#0a0a1a]/10 bg-[#0a0a1a] px-5 py-2.5 backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-5 overflow-hidden">
        <motion.span
          className="block text-sm font-medium text-white"
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          LET&apos;S TALK
        </motion.span>
        <motion.span
          className="absolute left-0 top-full block text-sm font-medium text-white"
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          LET&apos;S TALK
        </motion.span>
      </div>
      <div className="relative h-3 w-3 overflow-hidden">
        <motion.svg
          width="10"
          height="12"
          viewBox="0 0 10 12"
          fill="none"
          className="absolute"
          animate={{ x: isHovered ? "250%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <path
            d="M9.61648 5.8006L0.360093 0.0358623C0.250469 -0.0329162 0.105835 0.000195883 0.0370565 0.109843C0.0155525 0.144118 0.00328985 0.183378 0.0014624 0.223799C-0.000365041 0.264221 0.00830504 0.304427 0.0266285 0.340503L2.85674 5.99955L0.0254568 11.6595C-0.0331514 11.7749 0.0128727 11.916 0.128261 11.9746C0.164336 11.9929 0.204543 12.0016 0.244965 11.9998C0.285387 11.998 0.324647 11.9857 0.358921 11.9642L9.61531 6.19944C9.7253 6.13127 9.75924 5.98683 9.69104 5.87681C9.67198 5.84605 9.64606 5.82013 9.61531 5.80107L9.61648 5.8006Z"
            fill="#1852FF"
          />
        </motion.svg>
        <motion.svg
          width="10"
          height="12"
          viewBox="0 0 10 12"
          fill="none"
          className="absolute"
          initial={{ x: "-250%" }}
          animate={{ x: isHovered ? "0%" : "-250%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <path
            d="M9.61648 5.8006L0.360093 0.0358623C0.250469 -0.0329162 0.105835 0.000195883 0.0370565 0.109843C0.0155525 0.144118 0.00328985 0.183378 0.0014624 0.223799C-0.000365041 0.264221 0.00830504 0.304427 0.0266285 0.340503L2.85674 5.99955L0.0254568 11.6595C-0.0331514 11.7749 0.0128727 11.916 0.128261 11.9746C0.164336 11.9929 0.204543 12.0016 0.244965 11.9998C0.285387 11.998 0.324647 11.9857 0.358921 11.9642L9.61531 6.19944C9.7253 6.13127 9.75924 5.98683 9.69104 5.87681C9.67198 5.84605 9.64606 5.82013 9.61531 5.80107L9.61648 5.8006Z"
            fill="#1852FF"
          />
        </motion.svg>
      </div>
    </Link>
  )
}

function ServiceCard({
  number,
  title,
  image,
  href = "#",
}: {
  number: string
  title: string
  image: string
  href?: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <motion.div
          className="relative h-full w-full"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 flex flex-col justify-end gap-1 p-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-full rounded-lg bg-white/40 backdrop-blur-sm"
              initial={{ height: 0 }}
              animate={{ height: isHovered ? 12 + i * 4 : 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 text-[#0a0a1a]/70">
        <span className="text-xs font-medium text-[#0a0a1a]/40">({number})</span>
        <span className="text-sm font-medium transition-colors group-hover:text-[#0a0a1a]">
          {title}
        </span>
      </div>
    </Link>
  )
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0a0a1a]/5 text-[#0a0a1a]/60 backdrop-blur-sm transition-all hover:bg-[#0a0a1a]/10 hover:text-[#0a0a1a]"
    >
      {children}
    </a>
  )
}

export default function SoftreeServicesHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const services = [
    {
      number: "01",
      title: "AI & Automation",
      image: "/whysoftree/ai.webp",
    },
    {
      number: "02",
      title: "Web Development",
      image: "/whysoftree/web dev.webp",
    },
    {
      number: "03",
      title: "Microsoft Solutions",
      image: "/whysoftree/microsoft.webp",
    },
    {
      number: "04",
      title: "Data Analytics",
      image: "/whysoftree/data.webp",
    },
    {
      number: "05",
      title: "Digital Workspace",
      image: "/whysoftree/web.webp",
    },
  ]

  const avatars = [
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d47_Hero%20Client%201.webp",
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d45_Hero%20Client%202.webp",
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d4b_Hero%20Client%203.webp",
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d4d_Hero%20Client%204.webp",
    "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c3757217df10d7688f6d49_Hero%20Client%205.webp",
  ]

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-white">
      {/* Header */}
      <motion.div
        className="flex w-full items-start justify-between px-6 py-6 lg:px-12"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-[#0a0a1a] lg:text-5xl">
            Softree<span className="align-super text-sm">®</span>
          </h1>
          <h1 className="text-3xl font-bold tracking-tight text-[#0a0a1a] lg:text-5xl">
            _Studio
          </h1>
        </div>

        {/* Profile Card - Desktop */}
        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-3 rounded-xl border border-[#0a0a1a]/10 bg-[#f8f9fc] p-2 pr-4">
            <img
              src="https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c2c8febe5ed42eae483183_Hero%201%20Profile.webp"
              alt="Team Lead"
              className="h-12 w-12 rounded-lg object-cover"
            />
            <div>
              <div className="text-sm font-medium text-[#0a0a1a]">Softree Team</div>
              <div className="text-xs text-[#0a0a1a]/60">Digital Solutions</div>
            </div>
          </div>
          <AnimatedButton />
        </div>
      </motion.div>

      {/* Hero Horizontal Line */}
      <motion.div
        className="-mt-4 mb-6 w-full px-6 lg:px-12"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#0a0a1a]/20 to-transparent" />
      </motion.div>

      {/* Main Hero Content */}
      <div className="relative w-full px-6 pb-8 lg:px-12">
        {/* Video Background Container */}
        <motion.div
          className="relative w-full overflow-hidden rounded-3xl"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
              poster="https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_poster.0000000.jpg"
            >
              <source
                src="https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_mp4.mp4"
                type="video/mp4"
              />
              <source
                src="https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_webm.webm"
                type="video/webm"
              />
            </video>
            {/* Light Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 via-white/60 to-orange-50/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex min-h-[600px] flex-col justify-between p-6 lg:min-h-[700px] lg:p-12">
            {/* Top Content */}
            <div className="flex flex-col justify-between gap-8 lg:flex-row">
              {/* Left - Avatar Group & Title */}
              <div className="flex flex-col gap-6">
                {/* Avatar Group */}
                <div className="flex items-center">
                  <div className="flex -space-x-3">
                    {avatars.map((avatar, i) => (
                      <motion.div
                        key={i}
                        className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                      >
                        <img
                          src={avatar}
                          alt={`Client ${i + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Title with Text Cycle */}
                <motion.div
                  className="max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h2 className="text-2xl font-semibold leading-tight text-[#0a0a1a] lg:text-4xl">
                    We Build Digital Solutions with{" "}
                    <TextCycle />
                  </h2>
                </motion.div>
              </div>

              {/* Right - Social Media */}
              <div className="flex flex-col items-end gap-6">
                <div className="hidden flex-col gap-2 lg:flex">
                  <SocialIcon href="https://instagram.com" label="Instagram">
                    <svg width="20" height="20" viewBox="0 0 23 23" fill="currentColor">
                      <path d="M16.6957 0H5.56522C2.49322 0 0 2.49322 0 5.56522V16.6957C0 19.7677 2.49322 22.2609 5.56522 22.2609H16.6957C19.7677 22.2609 22.2609 19.7677 22.2609 16.6957V5.56522C22.2609 2.49322 19.7677 0 16.6957 0ZM11.1304 16.6957C8.05844 16.6957 5.56522 14.2024 5.56522 11.1304C5.56522 8.05844 8.05844 5.56522 11.1304 5.56522C14.2024 5.56522 16.6957 8.05844 16.6957 11.1304C16.6957 14.2024 14.2024 16.6957 11.1304 16.6957ZM17.0852 6.2553C16.473 6.2553 15.9722 5.75444 15.9722 5.14226C15.9722 4.53009 16.473 4.02922 17.0852 4.02922C17.6974 4.02922 18.1983 4.53009 18.1983 5.14226C18.1983 5.75444 17.6974 6.2553 17.0852 6.2553Z" />
                      <path d="M11.1301 14.4703C12.9743 14.4703 14.4693 12.9753 14.4693 11.1311C14.4693 9.28697 12.9743 7.79199 11.1301 7.79199C9.286 7.79199 7.79102 9.28697 7.79102 11.1311C7.79102 12.9753 9.286 14.4703 11.1301 14.4703Z" />
                    </svg>
                  </SocialIcon>
                  <SocialIcon href="https://linkedin.com" label="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 23 23" fill="currentColor">
                      <path d="M22.2611 22.261V14.108C22.2611 10.101 21.3985 7.04016 16.7237 7.04016C14.4698 7.04016 12.9672 8.26451 12.355 9.4332H12.2993V7.4019H7.875V22.261H12.4941V14.8871C12.4941 12.9393 12.8559 11.0749 15.2489 11.0749C17.6141 11.0749 17.6419 13.2732 17.6419 14.9984V22.2332H22.2611V22.261Z" />
                      <path d="M0.361328 7.40149H4.98045V22.2606H0.361328V7.40149Z" />
                      <path d="M2.6713 0C1.19652 0 0 1.19652 0 2.6713C0 4.14608 1.19652 5.37043 2.6713 5.37043C4.14608 5.37043 5.3426 4.14608 5.3426 2.6713C5.3426 1.19652 4.14608 0 2.6713 0Z" />
                    </svg>
                  </SocialIcon>
                  <SocialIcon href="https://x.com" label="X">
                    <svg width="20" height="20" viewBox="0 0 23 23" fill="currentColor">
                      <path d="M13.2036 9.42559L21.3125 -0.000366211H19.391L12.35 8.18406L6.72639 -0.000366211H0.240234L8.74423 12.3759L0.240234 22.2605H2.1619L9.59734 13.6175L15.5363 22.2605H22.0224L13.2031 9.42559H13.2036ZM10.5716 12.485L9.70999 11.2526L2.8543 1.44623H5.80586L11.3385 9.36026L12.2001 10.5927L19.3919 20.8797H16.4403L10.5716 12.4854V12.485Z" />
                    </svg>
                  </SocialIcon>
                </div>
              </div>
            </div>

            {/* Bottom - Service Cards */}
            <motion.div
              className="mt-auto pt-12"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                {services.map((service, i) => (
                  <motion.div
                    key={service.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                  >
                    <ServiceCard {...service} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile Social & CTA */}
        <div className="mt-6 flex flex-col gap-4 lg:hidden">
          <div className="flex items-center gap-2 text-sm text-[#0a0a1a]/60">
            <span>Follow Us</span>
          </div>
          <div className="flex gap-2">
            <SocialIcon href="https://instagram.com" label="Instagram">
              <svg width="20" height="20" viewBox="0 0 23 23" fill="currentColor">
                <path d="M16.6957 0H5.56522C2.49322 0 0 2.49322 0 5.56522V16.6957C0 19.7677 2.49322 22.2609 5.56522 22.2609H16.6957C19.7677 22.2609 22.2609 19.7677 22.2609 16.6957V5.56522C22.2609 2.49322 19.7677 0 16.6957 0ZM11.1304 16.6957C8.05844 16.6957 5.56522 14.2024 5.56522 11.1304C5.56522 8.05844 8.05844 5.56522 11.1304 5.56522C14.2024 5.56522 16.6957 8.05844 16.6957 11.1304C16.6957 14.2024 14.2024 16.6957 11.1304 16.6957ZM17.0852 6.2553C16.473 6.2553 15.9722 5.75444 15.9722 5.14226C15.9722 4.53009 16.473 4.02922 17.0852 4.02922C17.6974 4.02922 18.1983 4.53009 18.1983 5.14226C18.1983 5.75444 17.6974 6.2553 17.0852 6.2553Z" />
                <path d="M11.1301 14.4703C12.9743 14.4703 14.4693 12.9753 14.4693 11.1311C14.4693 9.28697 12.9743 7.79199 11.1301 7.79199C9.286 7.79199 7.79102 9.28697 7.79102 11.1311C7.79102 12.9753 9.286 14.4703 11.1301 14.4703Z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://linkedin.com" label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 23 23" fill="currentColor">
                <path d="M22.2611 22.261V14.108C22.2611 10.101 21.3985 7.04016 16.7237 7.04016C14.4698 7.04016 12.9672 8.26451 12.355 9.4332H12.2993V7.4019H7.875V22.261H12.4941V14.8871C12.4941 12.9393 12.8559 11.0749 15.2489 11.0749C17.6141 11.0749 17.6419 13.2732 17.6419 14.9984V22.2332H22.2611V22.261Z" />
                <path d="M0.361328 7.40149H4.98045V22.2606H0.361328V7.40149Z" />
                <path d="M2.6713 0C1.19652 0 0 1.19652 0 2.6713C0 4.14608 1.19652 5.37043 2.6713 5.37043C4.14608 5.37043 5.3426 4.14608 5.3426 2.6713C5.3426 1.19652 4.14608 0 2.6713 0Z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://x.com" label="X">
              <svg width="20" height="20" viewBox="0 0 23 23" fill="currentColor">
                <path d="M13.2036 9.42559L21.3125 -0.000366211H19.391L12.35 8.18406L6.72639 -0.000366211H0.240234L8.74423 12.3759L0.240234 22.2605H2.1619L9.59734 13.6175L15.5363 22.2605H22.0224L13.2031 9.42559H13.2036ZM10.5716 12.485L9.70999 11.2526L2.8543 1.44623H5.80586L11.3385 9.36026L12.2001 10.5927L19.3919 20.8797H16.4403L10.5716 12.4854V12.485Z" />
              </svg>
            </SocialIcon>
          </div>
          <p className="text-sm text-[#0a0a1a]/60">
            We help businesses create fast, user-friendly digital solutions that drive growth.
          </p>
          <AnimatedButton />
        </div>
      </div>

      {/* Brand Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <BrandMarquee />
      </motion.div>
    </section>
  )
}
