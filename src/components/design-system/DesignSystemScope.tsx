"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import type { DesignSystemAppearance } from "@/components/design-system/types"

export function designSystemSurfaceClass(appearance: DesignSystemAppearance) {
  return cn(
    "ds-scope bg-background text-foreground",
    appearance === "light" ? "ds-light" : "ds-dark"
  )
}

export function DesignSystemScope({
  appearance,
  className,
  children,
}: {
  appearance: DesignSystemAppearance
  className?: string
  children: ReactNode
}) {
  return (
    <div
      data-appearance={appearance}
      className={cn(designSystemSurfaceClass(appearance), "shrink-0", className)}
    >
      {children}
    </div>
  )
}
