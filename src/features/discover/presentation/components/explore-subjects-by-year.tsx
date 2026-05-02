"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Card } from "@/src/core/ui/components/card"
import { ChevronLeft, ChevronRight, Code, Database, PenTool, BookOpen, Grid } from "lucide-react"
import type { DiscoverSubjectEntity } from "../../domain/entities/discover.entity"

interface ExploreSubjectsByYearProps {
  subjects: DiscoverSubjectEntity[]
}

const palette = [
  { bg: "bg-rose-100 dark:bg-rose-900/30", icon: "text-rose-600 dark:text-rose-300" },
  { bg: "bg-amber-100 dark:bg-amber-900/30", icon: "text-amber-600 dark:text-amber-300" },
  { bg: "bg-sky-100 dark:bg-sky-900/30", icon: "text-sky-600 dark:text-sky-300" },
  { bg: "bg-lime-100 dark:bg-lime-900/30", icon: "text-lime-600 dark:text-lime-300" },
  { bg: "bg-violet-100 dark:bg-violet-900/30", icon: "text-violet-600 dark:text-violet-300" },
  { bg: "bg-emerald-100 dark:bg-emerald-900/30", icon: "text-emerald-600 dark:text-emerald-300" },
]

function getIcon(title: string) {
  const t = title.toLowerCase()
  if (t.includes("program") || t.includes("programación") || t.includes("code") || t.includes("desarrollo")) return Code
  if (t.includes("data") || t.includes("datos") || t.includes("estad")) return Database
  if (t.includes("dise") || t.includes("design")) return PenTool
  if (t.includes("comunic") || t.includes("comunicación")) return BookOpen
  return Grid
}

function pseudoCount(id: string) {
  let sum = 0
  for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i)
  return (sum % 12) + 1
}

export function ExploreSubjectsByYear({ subjects }: ExploreSubjectsByYearProps) {
  const outerRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  useEffect(() => {
    const outer = outerRef.current
    const update = () => {
      if (!outer || !listRef.current) return
      setCanPrev(outer.scrollLeft > 0)
      setCanNext(outer.scrollWidth > outer.clientWidth + outer.scrollLeft + 1)
    }

    update()
    outer?.addEventListener("scroll", update)
    window.addEventListener("resize", update)
    return () => {
      outer?.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [subjects])

  const scrollStep = (direction: "left" | "right") => {
    const outer = outerRef.current
    const list = listRef.current
    if (!outer || !list) return

    const firstChild = list.children[0] as HTMLElement | undefined
    const gap = parseFloat(getComputedStyle(list).gap || "12") || 12
    const cardWidth = firstChild ? firstChild.getBoundingClientRect().width : Math.min(240, outer.clientWidth * 0.6)
    const delta = Math.round(cardWidth + gap)

    outer.scrollBy({ left: direction === "left" ? -delta : delta, behavior: "smooth" })
  }

  return (
    <div className="mb-6 max-w-264 ">
      <h2 className="text-lg font-semibold mb-3">Asignaturas</h2>

      {subjects.length === 0 ? (
        <p className="text-sm text-muted-foreground">No hay asignaturas asignadas para tu año.</p>
      ) : (
        <div className="relative">
          <button
            aria-label="previous"
            onClick={() => scrollStep("left")}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 p-1 shadow ${canPrev ? "" : "opacity-40 pointer-events-none"}`}>
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="overflow-hidden">
            <div ref={outerRef} className="overflow-x-auto py-2 max-w-full min-h-0 no-scrollbar" style={{ touchAction: 'pan-x', overscrollBehavior: 'contain' as any }}>
              <div ref={listRef} className="flex gap-3 px-4 snap-x snap-mandatory">
                {subjects.map((subject, idx) => {
                  const Icon = getIcon(subject.title) as any
                  const colorClass = palette[idx % palette.length].bg
                  const count = pseudoCount(subject.id)

                  return (
                    <Link key={subject.id} href={subject.href} className="shrink-0 w-44 sm:w-48 md:w-52 lg:w-56 snap-start">
                      <Card className={`h-20 p-3 transition-shadow hover:shadow-md flex-row flex items-center gap-3 ${colorClass}`}>
                        <div className="flex-none flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 dark:bg-muted/10 shadow-sm">
                          <Icon className={`w-5 h-5 ${palette[idx % palette.length].icon}`} />
                        </div>

                        <div className="flex flex-col truncate">
                          <div className="text-sm font-semibold truncate">{subject.title}</div>
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{subject.description}</div>
                          <div className="text-xs text-muted-foreground mt-1">{count} recursos</div>
                        </div>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          <button
            aria-label="next"
            onClick={() => scrollStep("right")}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 p-1 shadow ${canNext ? "" : "opacity-40 pointer-events-none"}`}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}
