"use client"

import { cn } from "@/src/core/ui/lib/utils"

interface GridPatternProps {
  width?: number
  height?: number
  x?: number
  y?: number
  strokeDasharray?: string
  className?: string
}

export function GridPattern({
  width = 40,
  height = 40,
  x = 0,
  y = 0,
  strokeDasharray = "0",
  className,
}: GridPatternProps) {
  const patternId = "grid-pattern-dashed"

  return (
    <svg
      width={width}
      height={height}
      className={cn("absolute inset-0 h-full w-full", className)}
    >
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          x={x}
          y={y}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${width} 0 L 0 0 0 ${height}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray={strokeDasharray}
            className="text-muted-foreground/20"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}