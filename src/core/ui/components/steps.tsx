"use client"

import React from "react"
import Link from "next/link"
import { PlayCircle, FileText } from "lucide-react"
import { cn } from "@/src/core/ui/lib/utils"

type StepsProps = {
  children: React.ReactNode
}

export function Steps({ children }: StepsProps) {
  return <ol className="space-y-2">{children}</ol>
}

type StepItemProps = {
  index: number
  title: string
  href?: string
  duration?: string
  type?: string
}

export function StepItem({ index, title, href = "#", duration, type }: StepItemProps) {
  const Icon = type === "video" ? PlayCircle : FileText

  return (
    <li className="flex items-start gap-3 rounded-md p-2 transition-colors">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">{index + 1}</div>

      <div className="flex-1">
        <Link href={href} className="block no-underline">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div className="font-medium text-foreground">{title}</div>
            </div>

            <div className="text-sm text-muted-foreground">{duration}</div>
          </div>
        </Link>
      </div>
    </li>
  )
}
