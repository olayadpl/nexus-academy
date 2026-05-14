"use client"

import { cn } from "@/src/core/ui/lib/utils"

interface SpotlightProps {
  className?: string
  fill?: string
}

export function Spotlight({ className, fill = "white" }: SpotlightProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 top-0 h-[300px] w-[500px] opacity-0 transition-opacity duration-500 group-hover:opacity-100",
        className
      )}
    >
      <div
        className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,white)]"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${fill} 0%, transparent 70%)`,
        }}
      />
    </div>
  )
}