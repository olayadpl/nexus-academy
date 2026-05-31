"use client"

import { useEffect, useMemo, useState, useTransition } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

import type { RecommendedResourceEntity } from "../../domain/entities/recommended-resource.entity"
import { listRecommendedResourcesAction } from "../states/recommended-resources.actions"

interface ExploreRecommendedResourcesProps {
  resources: RecommendedResourceEntity[]
}

function formatDuration(minutes: number) {
  if (!minutes) return ""
  const totalMinutes = Math.max(0, Math.round(minutes))
  const hours = Math.floor(totalMinutes / 60)
  const mins = totalMinutes % 60

  if (hours > 0) {
    return `${hours}:${String(mins).padStart(2, "0")}`
  }

  return `${mins}:00`
}

function getCategories(resources: RecommendedResourceEntity[]) {
  const bucket = new Map<string, number>()

  for (const resource of resources) {
    const category = resource.category?.trim() || "General"
    bucket.set(category, (bucket.get(category) ?? 0) + 1)
  }

  return Array.from(bucket.entries()).map(([label, count]) => ({ label, count }))
}

export function ExploreRecommendedResources({ resources }: ExploreRecommendedResourcesProps) {
  const [items, setItems] = useState(resources)
  const [, startTransition] = useTransition()
  const categories = useMemo(() => getCategories(items), [items])

  useEffect(() => {
    let mounted = true

    const refresh = async () => {
      try {
        const next = await listRecommendedResourcesAction()
        if (!mounted) return
        startTransition(() => {
          setItems(next)
        })
      } catch (error) {
        console.error("ExploreRecommendedResources refresh error:", error)
      }
    }

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        refresh()
      }
    }, 5000)

    const handleFocus = () => {
      refresh()
    }

    window.addEventListener("focus", handleFocus)

    return () => {
      mounted = false
      clearInterval(interval)
      window.removeEventListener("focus", handleFocus)
    }
  }, [])

  return (
    <section className="mt-10 space-y-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold md:text-[1.375rem]">Recursos recomendados</h2>
        </div>
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category.label}
                className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground"
              >
                {category.label}
                <span className="ml-2 rounded-full bg-background px-2 py-0.5 text-[10px] text-foreground">
                  {category.count}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-muted/30 p-6 text-sm text-muted-foreground">
          Aun no hay recursos recomendados.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((resource) => {
            if (resource.type === "pdf") {
              const pdfCoverUrl = resource.thumbnailUrl

              return (
                <a
                  key={resource.id}
                  href={resource.resourceUrl || "#"}
                  className="group flex flex-col gap-3"
                  target={resource.resourceUrl ? "_blank" : undefined}
                  rel={resource.resourceUrl ? "noreferrer" : undefined}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-[0_18px_40px_-18px_rgba(15,23,42,0.6)]">
                    <div className="aspect-[3/4] w-full bg-muted">
                      {pdfCoverUrl ? (
                        <Image
                          src={pdfCoverUrl}
                          alt={resource.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-muted to-muted/60" />
                      )}
                    </div>
                  </div>
                </a>
              )
            }

            const durationLabel = formatDuration(resource.durationMinutes)

            return (
              <a
                key={resource.id}
                href={resource.resourceUrl || "#"}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
                target={resource.resourceUrl ? "_blank" : undefined}
                rel={resource.resourceUrl ? "noreferrer" : undefined}
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  {resource.thumbnailUrl ? (
                    <Image
                      src={resource.thumbnailUrl}
                      alt={resource.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-slate-200 to-slate-300" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                      <Play className="h-4 w-4 fill-white text-white" />
                    </div>
                  </div>
                  {durationLabel && (
                    <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-white">
                      {durationLabel}
                    </span>
                  )}
                </div>
                <div className="space-y-1 p-3">
                  <p className="text-sm font-semibold text-foreground line-clamp-2">{resource.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {resource.authorName || "Nexus Academy"}
                  </p>
                  <div className="text-[11px] text-muted-foreground">{resource.category}</div>
                </div>
              </a>
            )
          })}
        </div>
      )}
    </section>
  )
}
