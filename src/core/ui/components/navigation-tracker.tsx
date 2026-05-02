"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import type { NavigationHistoryType } from "@/src/features/history/domain/entities/navigation-history.entity"
import { addNavigationHistoryAction } from "@/src/features/history/presentation/states/history.actions"

function resolveHistoryType(pathname: string): NavigationHistoryType {
  if (/^\/resource\/[^/]+/.test(pathname) || /^\/resources\//.test(pathname)) {
    return "resource"
  }

  if (/^\/courses\/[^/]+/.test(pathname)) {
    return "course"
  }

  if (/^\/briefs\/[^/]+/.test(pathname)) {
    return "brief"
  }

  if (/^\/assessments\/[^/]+/.test(pathname)) {
    return "assessment"
  }

  return "page"
}

function shouldTrack(pathname: string, type: NavigationHistoryType): boolean {
  if (type === "page") {
    return false
  }

  if (pathname === "/login" || pathname === "/signup") {
    return false
  }

  return true
}

export function NavigationTracker() {
  const pathname = usePathname()
  const trackedRef = useRef("")

  useEffect(() => {
    if (!pathname || trackedRef.current === pathname) {
      return
    }

    const type = resolveHistoryType(pathname)

    if (!shouldTrack(pathname, type)) {
      trackedRef.current = pathname
      return
    }

    const title = document.title || pathname

    const track = async () => {
      await addNavigationHistoryAction({
        url: pathname,
        title,
        type,
      })
      trackedRef.current = pathname
    }

    void track()
  }, [pathname])

  return null
}