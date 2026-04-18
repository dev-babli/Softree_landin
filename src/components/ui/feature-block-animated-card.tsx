"use client"

import { animate, motion } from "framer-motion"
import React, { useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  MotionGraphicPlaceholder,
  type MotionGraphicVariant,
} from "@/components/ui/motion-graphic-placeholder"

export interface AnimatedCardProps {
  className?: string
  motionVariant?: MotionGraphicVariant
  title?: React.ReactNode
  description?: React.ReactNode
  icons?: Array<{
    icon: React.ReactNode
    size?: "sm" | "md" | "lg"
    className?: string
  }>
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
}

export function AnimatedCard({
  className,
  motionVariant = "services",
  title,
  description,
  icons = [],
}: AnimatedCardProps) {
  return (
    <div
      className={cn(
        "liquid-glass mx-auto w-full max-w-sm rounded-xl p-8 group",
        className
      )}
    >
      <div
        className={cn(
          "relative h-[15rem] overflow-hidden rounded-xl md:h-[20rem]"
        )}
      >
        <MotionGraphicPlaceholder variant={motionVariant} />
        <div
          className={cn(
            "relative z-[1] h-full bg-neutral-300/10 [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]"
          )}
        >
          <AnimatedIcons icons={icons} />
        </div>
      </div>
      {title && (
        <h3 className="py-2 text-lg font-semibold text-[var(--c-fg)]">{title}</h3>
      )}
      {description && (
        <p className="max-w-sm text-sm font-normal text-[var(--c-fg-soft)]">{description}</p>
      )}
    </div>
  )
}

function AnimatedIcons({
  icons = [],
}: {
  icons?: NonNullable<AnimatedCardProps["icons"]>
}) {
  const scale = [1, 1.1, 1]
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"]

  useEffect(() => {
    if (!icons.length) return
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }
    const sequence = icons.map((_, index) => [
      `.circle-${index + 1}`,
      { scale, transform },
      { duration: 0.8 },
    ]) as Parameters<typeof animate>[0]

    const controls = animate(sequence, {
      repeat: Infinity,
      repeatDelay: 1,
    })

    return () => controls.stop()
  }, [icons])

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden p-8">
      <div className="flex flex-shrink-0 flex-row items-center justify-center gap-2">
        {icons.map((icon, index) => (
          <Container
            key={index}
            className={cn(sizeMap[icon.size || "lg"], `circle-${index + 1}`, icon.className)}
          >
            {icon.icon}
          </Container>
        ))}
      </div>
      <AnimatedSparkles />
    </div>
  )
}

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-center rounded-full bg-[rgba(248,248,248,0.01)] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]",
      className
    )}
    {...props}
  />
))
Container.displayName = "Container"

const AnimatedSparkles = () => (
  <div className="animate-move absolute top-20 z-40 m-auto h-40 w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent">
    <div className="absolute -left-10 top-1/2 h-32 w-10 -translate-y-1/2">
      <Sparkles />
    </div>
  </div>
)

const Sparkles = () => {
  const starConfigs = Array.from({ length: 12 }, (_, i) => {
    const baseTop = (i * 37) % 100
    const baseLeft = (i * 53) % 100
    const drift = (i % 3) - 1
    const opacity = 0.35 + ((i * 11) % 50) / 100
    const duration = 4 + (i % 5) * 0.45

    return { i, baseTop, baseLeft, drift, opacity, duration }
  })

  return (
    <div className="absolute inset-0">
      {starConfigs.map(({ i, baseTop, baseLeft, drift, opacity, duration }) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${baseTop}% + ${drift}px)`,
            left: `calc(${baseLeft}% + ${drift}px)`,
            opacity,
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${baseTop}%`,
            left: `${baseLeft}%`,
            width: "2px",
            height: "2px",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-black dark:bg-white"
        />
      ))}
    </div>
  )
}

