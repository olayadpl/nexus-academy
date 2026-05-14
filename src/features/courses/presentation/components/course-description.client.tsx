"use client"

import React, { useEffect, useRef, useState } from "react"
import { useLocale } from "@/src/core/ui/hooks/use-locale"
import { getCoursesTranslations } from "@/src/features/courses/i18n/strings"

type Props = {
  description?: string
}

export default function CourseDescription({ description = "" }: Props) {
  const { locale } = useLocale()
  const t = getCoursesTranslations(locale)
  const ref = useRef<HTMLDivElement | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [showToggle, setShowToggle] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const checkOverflow = () => {
      // scrollHeight gives full height, clientHeight is the clamped height when line-clamp is applied
      setShowToggle(el.scrollHeight > el.clientHeight + 1)
    }

    checkOverflow()
    window.addEventListener("resize", checkOverflow)
    return () => window.removeEventListener("resize", checkOverflow)
  }, [description])

  return (
    <div>
      <div
        ref={ref}
        className={expanded ? "text-lg text-muted-foreground" : "text-lg text-muted-foreground line-clamp-5"}
      >
        {description}
      </div>

      {showToggle && (
        <button
          type="button"
          onClick={() => setExpanded((s) => !s)}
          className="mt-2 text-sm font-semibold text-primary"
        >
          {expanded ? t.courseDescription.showLess : t.courseDescription.showMore}
        </button>
      )}
    </div>
  )
}
