"use client"

<<<<<<< HEAD
import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react"
=======
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
>>>>>>> 96e9abf (Refactor resource page to custom mouse-driven resizers with 4px handles and auto-collapse threshold)
import { toast } from "sonner"
import { Toaster } from "@/src/core/ui/components/sonner"
import type { ResourceEntity } from "../../domain/entities/resource.entity"

import LearningStyleNotesSidebar from "./learning-style-notes-sidebar"
import LearningStyleCourseMain from "./learning-style-course-main"
import LearningStyleRightPanel from "./learning-style-right-panel"

type ResourceViewerClientProps = {
  course: {
    id: string
    title: string
    description: string
    authorName?: string
    bibliographicBase: string
  }
  resources: ResourceEntity[]
  initialResourceId?: string
}

type ResourceLesson = {
  id: string
  title: string
  type: "video" | "pdf"
  resourceUrl: string
  durationMinutes: number
  completed: boolean
}

type ResourceCourseModel = {
  id: string
  title: string
  bibliographicBase: string
  modules: ResourceLesson[]
}

function mapResourceToLesson(resource: ResourceEntity): ResourceLesson {
  return {
    id: resource.id,
    title: resource.title,
    type: resource.type === "video" ? "video" : "pdf",
    resourceUrl: resource.resourceUrl,
    durationMinutes: resource.durationMinutes ?? 0,
    completed: Boolean(resource.completed),
  }
}







export function ResourceViewerClient({ course, resources, initialResourceId }: ResourceViewerClientProps) {
  const [resourceItems, setResourceItems] = useState(resources)
  const initial = initialResourceId
    ? resourceItems.find((item) => item.id === initialResourceId) ?? resourceItems[0] ?? null
    : resourceItems[0] ?? null
  const [activeResourceId, setActiveResourceId] = useState(initial?.id ?? "")
  const activeResource = resourceItems.find((item) => item.id === activeResourceId) ?? null

  const courseModel = useMemo<ResourceCourseModel>(() => {
    return {
      id: course.id,
      title: course.title,
      bibliographicBase: course.bibliographicBase,
      modules: resourceItems.map(mapResourceToLesson),
    }
  }, [course.bibliographicBase, course.id, course.title, resourceItems])

  const activeLesson = courseModel.modules.find((lesson) => lesson.id === activeResourceId) ?? null

  const containerRef = useRef<HTMLDivElement | null>(null)

  const [leftCollapsed, setLeftCollapsed] = useState(false)
  const [rightCollapsed, setRightCollapsed] = useState(false)
  const COLLAPSED_PX = 64
  const SIDE_MIN_PX = 200
  const SIDE_DEFAULT_LEFT_PX = 280
  const SIDE_DEFAULT_RIGHT_PX = 320
  const RESIZER_PX = 4
  const MAIN_MIN_PX = 420

<<<<<<< HEAD
  // collapsed minimum percent (based on COLLAPSED_PX and container width) to ensure panels never shrink smaller than the sidebar icon width
  const [collapsedMinPercent, setCollapsedMinPercent] = useState<number>(2)
  const [sideMinPercent, setSideMinPercent] = useState<number>(10)

  // refs to avoid re-entrant auto-collapse
  const isAutoCollapsingLeftRef = useRef(false)
  const isAutoCollapsingRightRef = useRef(false)

  // update collapsedMinPercent whenever container width changes
  useEffect(() => {
    function updateCollapsedPercent() {
      const containerWidth = containerRef.current?.getBoundingClientRect().width || (typeof window !== 'undefined' ? window.innerWidth : 1)
      const p = Math.max(2, Math.round((COLLAPSED_PX / Math.max(1, containerWidth)) * 100))
      const minSideP = Math.max(p, Math.round((SIDE_MIN_PX / Math.max(1, containerWidth)) * 100))
      setCollapsedMinPercent(p)
      setSideMinPercent(minSideP)
    }
    updateCollapsedPercent()
    let ro: ResizeObserver | null = null
    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(updateCollapsedPercent)
      ro.observe(containerRef.current)
    }
    window.addEventListener("resize", updateCollapsedPercent)
    return () => {
      window.removeEventListener("resize", updateCollapsedPercent)
      if (ro) ro.disconnect()
    }
  }, [containerRef, COLLAPSED_PX])

  // helper to compute middle size given left/right
  const computeMiddlePercent = (l = leftSizePercent, r = rightSizePercent) => {
    const mid = Math.max(5, 100 - l - r)
    return mid
  }

  // Toggle collapse: measure current width and store percent before collapsing so we can restore
  function toggleLeft(opts?: { forcePrevPercent?: number }) {
    const container = containerRef.current?.getBoundingClientRect()
    const leftRect = leftInnerRef.current?.getBoundingClientRect()
    if (!container) {
      setLeftCollapsed((c) => !c)
      return
    }

    if (!leftCollapsed) {
      // collapsing: save percent then set collapsed percent based on COLLAPSED_PX
      if (opts?.forcePrevPercent != null) {
        setLeftPrevPercent(Math.max(0, Math.round(opts.forcePrevPercent)))
      } else if (leftRect) {
        const p = Math.max(0, Math.round((leftRect.width / container.width) * 100))
        setLeftPrevPercent(p)
      }
      const collapsedP = Math.max(2, Math.round((COLLAPSED_PX / container.width) * 100))

      // try panel API first
      if (leftPanelRef.current?.resize) {
        leftPanelRef.current.resize(`${COLLAPSED_PX}px`)
      }

      // ensure layout: use groupRef to set explicit layout mapping
      try {
        const rightP = rightSizePercent
        const mainP = Math.max(1, 100 - collapsedP - rightP)
        groupRef.current?.setLayout({ left: collapsedP, main: mainP, right: rightP })
      } catch {}

      setLeftSizePercent(collapsedP)
      setLeftCollapsed(true)
    } else {
      // expanding: restore previous percent (fallback to 20)
      const restore = Math.max(leftPrevPercent ?? 20, sideMinPercent)
      if (leftPanelRef.current?.resize) leftPanelRef.current.resize(`${restore}%`)
      try {
        const rightP = rightSizePercent
        const mainP = Math.max(1, 100 - restore - rightP)
        groupRef.current?.setLayout({ left: restore, main: mainP, right: rightP })
      } catch {}
      setLeftSizePercent(restore)
      setLeftPrevPercent(null)
=======
  const [leftWidthPx, setLeftWidthPx] = useState<number>(SIDE_DEFAULT_LEFT_PX)
  const [rightWidthPx, setRightWidthPx] = useState<number>(SIDE_DEFAULT_RIGHT_PX)
  const [leftPrevWidthPx, setLeftPrevWidthPx] = useState<number>(SIDE_DEFAULT_LEFT_PX)
  const [rightPrevWidthPx, setRightPrevWidthPx] = useState<number>(SIDE_DEFAULT_RIGHT_PX)
  const [isResizingLeft, setIsResizingLeft] = useState(false)
  const [isResizingRight, setIsResizingRight] = useState(false)

  const toggleLeft = useCallback(() => {
    if (leftCollapsed) {
>>>>>>> 96e9abf (Refactor resource page to custom mouse-driven resizers with 4px handles and auto-collapse threshold)
      setLeftCollapsed(false)
      setLeftWidthPx(Math.max(SIDE_MIN_PX, leftPrevWidthPx))
      return
    }
    setLeftPrevWidthPx(leftWidthPx)
    setLeftCollapsed(true)
    setLeftWidthPx(COLLAPSED_PX)
  }, [leftCollapsed, leftPrevWidthPx, leftWidthPx])

<<<<<<< HEAD
    if (!rightCollapsed) {
      if (opts?.forcePrevPercent != null) {
        setRightPrevPercent(Math.max(0, Math.round(opts.forcePrevPercent)))
      } else if (rightRect) {
        const p = Math.max(0, Math.round((rightRect.width / container.width) * 100))
        setRightPrevPercent(p)
      }
      const collapsedP = Math.max(2, Math.round((COLLAPSED_PX / container.width) * 100))

      if (rightPanelRef.current?.resize) {
        rightPanelRef.current.resize(`${COLLAPSED_PX}px`)
      }

      try {
        const leftP = leftSizePercent
        const mainP = Math.max(1, 100 - leftP - collapsedP)
        groupRef.current?.setLayout({ left: leftP, main: mainP, right: collapsedP })
      } catch {}

      setRightSizePercent(collapsedP)
      setRightCollapsed(true)
    } else {
      const restore = Math.max(rightPrevPercent ?? 20, sideMinPercent)
      if (rightPanelRef.current?.resize) rightPanelRef.current.resize(`${restore}%`)
      try {
        const leftP = leftSizePercent
        const mainP = Math.max(1, 100 - leftP - restore)
        groupRef.current?.setLayout({ left: leftP, main: mainP, right: restore })
      } catch {}
      setRightSizePercent(restore)
      setRightPrevPercent(null)
=======
  const toggleRight = useCallback(() => {
    if (rightCollapsed) {
>>>>>>> 96e9abf (Refactor resource page to custom mouse-driven resizers with 4px handles and auto-collapse threshold)
      setRightCollapsed(false)
      setRightWidthPx(Math.max(SIDE_MIN_PX, rightPrevWidthPx))
      return
    }
    setRightPrevWidthPx(rightWidthPx)
    setRightCollapsed(true)
    setRightWidthPx(COLLAPSED_PX)
  }, [rightCollapsed, rightPrevWidthPx, rightWidthPx])

<<<<<<< HEAD
  // auto-collapse side panels when their inner width goes below SIDE_MIN_PX to prevent layout breakage
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return
    const observers: ResizeObserver[] = []

    function observeSide(ref: RefObject<HTMLDivElement | null>, side: "left" | "right") {
      if (!ref.current) return
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = entry.target.getBoundingClientRect().width
          if (side === "left") {
            if (w < SIDE_MIN_PX && !leftCollapsed && !isAutoCollapsingLeftRef.current) {
              isAutoCollapsingLeftRef.current = true
              toggleLeft({ forcePrevPercent: leftSizePercent })
              setTimeout(() => (isAutoCollapsingLeftRef.current = false), 300)
            }
          } else if (w < SIDE_MIN_PX && !rightCollapsed && !isAutoCollapsingRightRef.current) {
            isAutoCollapsingRightRef.current = true
            toggleRight({ forcePrevPercent: rightSizePercent })
            setTimeout(() => (isAutoCollapsingRightRef.current = false), 300)
          }
        }
      })
      ro.observe(ref.current)
      observers.push(ro)
    }

    observeSide(leftInnerRef, "left")
    observeSide(rightInnerRef, "right")

    return () => {
      observers.forEach((o) => o.disconnect())
    }
  }, [leftCollapsed, leftSizePercent, rightCollapsed, rightSizePercent, toggleLeft, toggleRight])

  function handlePanelCollapseMeasure(side: "left" | "right") {
    // measure width of panel and update corresponding percent - used before collapsing
=======
  const stopResizing = useCallback(() => {
    setIsResizingLeft(false)
    setIsResizingRight(false)
  }, [])

  const handleResize = useCallback((event: MouseEvent) => {
>>>>>>> 96e9abf (Refactor resource page to custom mouse-driven resizers with 4px handles and auto-collapse threshold)
    const container = containerRef.current?.getBoundingClientRect()
    if (!container) return

    const rightCurrent = rightCollapsed ? COLLAPSED_PX : rightWidthPx
    const leftCurrent = leftCollapsed ? COLLAPSED_PX : leftWidthPx

    if (isResizingLeft) {
      const maxLeft = Math.max(
        SIDE_MIN_PX,
        container.width - rightCurrent - MAIN_MIN_PX - RESIZER_PX * 2
      )
      const nextWidth = event.clientX - container.left

      if (nextWidth < SIDE_MIN_PX) {
        if (!leftCollapsed) setLeftPrevWidthPx(leftWidthPx)
        setLeftCollapsed(true)
        setLeftWidthPx(COLLAPSED_PX)
        setIsResizingLeft(false)
        return
      }

      setLeftCollapsed(false)
      setLeftWidthPx(Math.min(nextWidth, maxLeft))
    }

    if (isResizingRight) {
      const maxRight = Math.max(
        SIDE_MIN_PX,
        container.width - leftCurrent - MAIN_MIN_PX - RESIZER_PX * 2
      )
      const nextWidth = container.right - event.clientX

      if (nextWidth < SIDE_MIN_PX) {
        if (!rightCollapsed) setRightPrevWidthPx(rightWidthPx)
        setRightCollapsed(true)
        setRightWidthPx(COLLAPSED_PX)
        setIsResizingRight(false)
        return
      }

      setRightCollapsed(false)
      setRightWidthPx(Math.min(nextWidth, maxRight))
    }
  }, [
    isResizingLeft,
    isResizingRight,
    leftCollapsed,
    leftWidthPx,
    rightCollapsed,
    rightWidthPx,
  ])

  useEffect(() => {
    if (!isResizingLeft && !isResizingRight) return

    const onMouseMove = (event: MouseEvent) => handleResize(event)
    const onMouseUp = () => stopResizing()

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    document.body.style.userSelect = "none"
    document.body.style.cursor = "col-resize"

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
    }
  }, [handleResize, isResizingLeft, isResizingRight, stopResizing])

  function handleSaveNote() {
    toast.success("Note saved", {
      description: "Your note has been saved successfully.",
    })
  }

  function handleMarkAsCompleted() {
    if (!activeResourceId) return
    setResourceItems((current) =>
      current.map((item) => (item.id === activeResourceId ? { ...item, completed: true } : item))
    )
    if (activeLesson) {
      toast.success("Module completed", {
        description: `${activeLesson.title} marcado como completado.`,
      })
    }
  }

  if (!activeResource) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">No hay recursos para este curso.</div>
      </main>
    )
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-muted/30 font-sans">
      <div className="flex flex-1 min-h-0 overflow-hidden p-4 md:p-6">
        <div className="w-full min-h-0">
          <div className="w-full min-h-0 h-full relative flex" ref={containerRef}>
            <div
              className="hidden lg:flex lg:flex-col h-full min-h-0 shrink-0 transition-[width] duration-150"
              style={{ width: leftCollapsed ? COLLAPSED_PX : leftWidthPx }}
            >
              <LearningStyleNotesSidebar
                resourceId={activeResourceId}
                collapsed={leftCollapsed}
                onToggleCollapse={toggleLeft}
                disableInternalScroll={true}
              />
            </div>

            <div
              className="hidden lg:block h-full shrink-0 cursor-col-resize hover:bg-border/60 active:bg-border/80"
              style={{ width: RESIZER_PX }}
              onMouseDown={(event) => {
                event.preventDefault()
                event.stopPropagation()
                setIsResizingLeft(true)
              }}
            />

            <div className="relative min-w-0 min-h-0 h-full flex-1 rounded-2xl border border-white/30 bg-background/60 backdrop-blur-md shadow-sm">
              <div className="h-full min-h-0 overflow-auto">
                <LearningStyleCourseMain
                  course={courseModel}
                  activeLesson={activeLesson}
                  onSaveNote={handleSaveNote}
                />
              </div>

              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={handleMarkAsCompleted}
                  disabled={!activeLesson || activeLesson.completed}
                  className="h-8 rounded-md border border-border bg-card px-3 text-xs font-medium text-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {activeLesson?.completed ? "Completado" : "Marcar completado"}
                </button>
              </div>
            </div>

            <div
              className="hidden lg:block h-full shrink-0 cursor-col-resize hover:bg-border/60 active:bg-border/80"
              style={{ width: RESIZER_PX }}
              onMouseDown={(event) => {
                event.preventDefault()
                event.stopPropagation()
                setIsResizingRight(true)
              }}
            />

            <div
              className="hidden lg:flex lg:flex-col h-full min-h-0 shrink-0 transition-[width] duration-150"
              style={{ width: rightCollapsed ? COLLAPSED_PX : rightWidthPx }}
            >
              <LearningStyleRightPanel
                course={courseModel}
                activeLessonId={activeResourceId}
                onSelectLesson={setActiveResourceId}
                collapsed={rightCollapsed}
                onToggleCollapse={toggleRight}
                disableInternalScroll={true}
              />
            </div>

            {(isResizingLeft || isResizingRight) && (
              <div className="hidden lg:block absolute inset-0 z-40 bg-transparent cursor-col-resize" />
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
