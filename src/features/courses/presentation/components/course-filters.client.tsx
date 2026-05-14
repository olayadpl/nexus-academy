"use client"

import React, { useEffect, useRef } from "react"
import { Filter } from "lucide-react"
import { useLocale } from "@/src/core/ui/hooks/use-locale"
import { getCoursesTranslations } from "@/src/features/courses/i18n/strings"

export default function CourseFilters() {
  const { locale } = useLocale()
  const t = getCoursesTranslations(locale)
  const detailsRef = useRef<HTMLDetailsElement | null>(null)

  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      const el = detailsRef.current
      if (!el) return
      if (el.open && !el.contains(e.target as Node)) {
        el.open = false
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (detailsRef.current) detailsRef.current.open = false
      }
    }

    document.addEventListener("click", handleDocumentClick)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("click", handleDocumentClick)
      document.removeEventListener("keydown", handleKey)
    }
  }, [])

  return (
    <div className="ml-4">
      <div className="relative">
        <details ref={detailsRef} className="relative">
          <summary className="list-none">
            <div className="inline-flex h-9 items-center gap-2 rounded-full border px-3 text-sm font-semibold transition-colors border-border bg-background text-foreground cursor-pointer hover:bg-primary/10 hover:text-primary">
              <Filter className="h-4 w-4" />
              <span>{t.courseFilters.filters}</span>
            </div>
          </summary>

          <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-popover border border-border p-2 text-popover-foreground shadow-md z-50">
            <div className="px-2 text-xs uppercase text-muted-foreground font-medium">{t.courseFilters.sortBy}</div>
            <label className="flex items-center gap-2 px-2 py-1 text-sm">
              <input type="checkbox" className="h-4 w-4" name="sort_popular" style={{ accentColor: "var(--color-secondary)" }} />
              <span>{t.courseFilters.mostPopular}</span>
            </label>
            <label className="flex items-center gap-2 px-2 py-1 text-sm">
              <input type="checkbox" className="h-4 w-4" name="sort_most_viewed" style={{ accentColor: "var(--color-secondary)" }} />
              <span>{t.courseFilters.mostViewed}</span>
            </label>
            <div className="my-1 h-px bg-border -mx-2" />
            <div className="px-2 mt-1 text-xs uppercase text-muted-foreground font-medium">{t.courseFilters.categories}</div>
            <label className="flex items-center gap-2 px-2 py-1 text-sm">
              <input type="checkbox" className="h-4 w-4" name="cat_design" style={{ accentColor: "var(--color-secondary)" }} />
              <span>{t.courseFilters.design}</span>
            </label>
            <label className="flex items-center gap-2 px-2 py-1 text-sm">
              <input type="checkbox" className="h-4 w-4" name="cat_programming" style={{ accentColor: "var(--color-secondary)" }} />
              <span>{t.courseFilters.programming}</span>
            </label>
            <label className="flex items-center gap-2 px-2 py-1 text-sm">
              <input type="checkbox" className="h-4 w-4" name="cat_databases" style={{ accentColor: "var(--color-secondary)" }} />
              <span>{t.courseFilters.databases}</span>
            </label>
            <label className="flex items-center gap-2 px-2 py-1 text-sm">
              <input type="checkbox" className="h-4 w-4" name="cat_devops" style={{ accentColor: "var(--color-secondary)" }} />
              <span>{t.courseFilters.devops}</span>
            </label>
          </div>
        </details>
      </div>
    </div>
  )
}
