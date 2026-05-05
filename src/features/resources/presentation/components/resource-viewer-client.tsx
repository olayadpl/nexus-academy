"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
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

  const COLLAPSED_PX = 72
  const SIDE_MIN_PX = 200
  const SIDE_DEFAULT_LEFT_PX = 280
  const SIDE_DEFAULT_RIGHT_PX = SIDE_DEFAULT_LEFT_PX
  const RESIZER_PX = 4
  const MAIN_MIN_PX = 420

  const [leftWidthPx, setLeftWidthPx] = useState<number>(SIDE_DEFAULT_LEFT_PX)
  const [rightWidthPx, setRightWidthPx] = useState<number>(SIDE_DEFAULT_RIGHT_PX)
  const [leftPrevWidthPx, setLeftPrevWidthPx] = useState<number>(SIDE_DEFAULT_LEFT_PX)
  const [rightPrevWidthPx, setRightPrevWidthPx] = useState<number>(SIDE_DEFAULT_RIGHT_PX)
  const [isResizingLeft, setIsResizingLeft] = useState(false)
  const [isResizingRight, setIsResizingRight] = useState(false)

  // Refs to track pointer start positions for resizing.
  const leftResizeStartXRef = useRef<number | null>(null)
  const rightResizeStartXRef = useRef<number | null>(null)

  const toggleLeft = useCallback(() => {
    if (leftCollapsed) {
      setLeftCollapsed(false)
      setLeftWidthPx(SIDE_DEFAULT_LEFT_PX)
      return
    }
    setLeftPrevWidthPx(leftWidthPx)
    setLeftCollapsed(true)
    setLeftWidthPx(COLLAPSED_PX)
  }, [leftCollapsed, leftPrevWidthPx, leftWidthPx])

  const toggleRight = useCallback(() => {
    if (rightCollapsed) {
      setRightCollapsed(false)
      setRightWidthPx(SIDE_DEFAULT_RIGHT_PX)
      return
    }
    setRightPrevWidthPx(rightWidthPx)
    setRightCollapsed(true)
    setRightWidthPx(COLLAPSED_PX)
  }, [rightCollapsed, rightPrevWidthPx, rightWidthPx])

  const stopResizing = useCallback(() => {
    // End any active resize operation. No click-vs-drag heuristics here to match reference behavior.
    setIsResizingLeft(false)
    setIsResizingRight(false)
    leftResizeStartXRef.current = null
    rightResizeStartXRef.current = null
  }, [])

  const handleResize = useCallback((event: PointerEvent) => {
    const container = containerRef.current?.getBoundingClientRect()
    if (!container) return

    // Compute the current side widths (collapsed or actual)
    const rightCurrent = rightCollapsed ? COLLAPSED_PX : rightWidthPx
    const leftCurrent = leftCollapsed ? COLLAPSED_PX : leftWidthPx

    if (isResizingLeft) {
      const nextWidth = event.clientX - container.left

      // If the user drags below a small threshold, collapse
      if (nextWidth < 60) {
        if (!leftCollapsed) setLeftPrevWidthPx(leftWidthPx)
        setLeftCollapsed(true)
        setLeftWidthPx(COLLAPSED_PX)
        return
      }

      // Otherwise, expand and set width respecting the max allowed
      const maxLeft = Math.max(
        SIDE_MIN_PX,
        container.width - rightCurrent - MAIN_MIN_PX - RESIZER_PX * 2
      )
      setLeftCollapsed(false)
      setLeftWidthPx(Math.min(Math.max(nextWidth, SIDE_MIN_PX), maxLeft))
    }

    if (isResizingRight) {
      const nextWidth = container.right - event.clientX

      if (nextWidth < 60) {
        if (!rightCollapsed) setRightPrevWidthPx(rightWidthPx)
        setRightCollapsed(true)
        setRightWidthPx(COLLAPSED_PX)
        return
      }

      const maxRight = Math.max(
        SIDE_MIN_PX,
        container.width - leftCurrent - MAIN_MIN_PX - RESIZER_PX * 2
      )
      setRightCollapsed(false)
      setRightWidthPx(Math.min(Math.max(nextWidth, SIDE_MIN_PX), maxRight))
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

    const onPointerMove = (event: PointerEvent) => handleResize(event as unknown as MouseEvent)
    const onPointerUp = () => stopResizing()

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
    document.body.style.userSelect = "none"
    document.body.style.cursor = "col-resize"

    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
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
    <div className="flex h-[calc(100svh-3.5rem)] max-h-[calc(100svh-3.5rem)] min-h-0 flex-col overflow-hidden bg-muted/30 font-sans">
      <div className="flex flex-1 min-h-0 overflow-hidden p-2.5">
        <div className="w-full h-full min-h-0">
          <div className="w-full min-h-0 h-full relative flex" ref={containerRef}>
            <div
              className="hidden lg:flex lg:h-full lg:min-h-0 lg:max-h-full lg:flex-col shrink-0 transition-[width] duration-150 relative"
              style={{ width: leftCollapsed ? COLLAPSED_PX : leftWidthPx }}
            >
              <LearningStyleNotesSidebar
                resourceId={activeResourceId}
                collapsed={leftCollapsed}
                onToggleCollapse={toggleLeft}
                disableInternalScroll={false}
              />

              {/* Inner hit area on collapsed state so user can drag the edge to open without using the toggle button */}
              {leftCollapsed && (
                <div
                  className="hidden lg:block absolute top-0 bottom-0 right-0"
                  style={{ width: RESIZER_PX, cursor: 'col-resize', zIndex: 30 }}
                  onPointerDown={(event: React.PointerEvent) => {
                    event.preventDefault()
                    event.stopPropagation()
                    leftResizeStartXRef.current = event.clientX
                    setIsResizingLeft(true)
                  }}
                />
              )}
            </div>

            <div
              className="hidden lg:block h-full shrink-0 cursor-col-resize hover:bg-border/60 active:bg-border/80"
              style={{ width: RESIZER_PX }}
              onPointerDown={(event: React.PointerEvent) => {
                event.preventDefault()
                event.stopPropagation()
                leftResizeStartXRef.current = event.clientX
                setIsResizingLeft(true)
              }}
            />

            <div className="relative min-w-0 min-h-0 h-full max-h-full flex-1 rounded-2xl border border-white/30 bg-background/60 backdrop-blur-md shadow-sm overflow-hidden">
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
              onPointerDown={(event: React.PointerEvent) => {
                event.preventDefault()
                event.stopPropagation()
                rightResizeStartXRef.current = event.clientX
                setIsResizingRight(true)
              }}
            />

            <div
              className="hidden lg:flex lg:h-full lg:min-h-0 lg:max-h-full lg:flex-col shrink-0 transition-[width] duration-150 relative"
              style={{ width: rightCollapsed ? COLLAPSED_PX : rightWidthPx }}
            >
              <LearningStyleRightPanel
                course={courseModel}
                activeLessonId={activeResourceId}
                onSelectLesson={setActiveResourceId}
                collapsed={rightCollapsed}
                onToggleCollapse={toggleRight}
                disableInternalScroll={false}
              />

              {/* Inner hit area on collapsed state to allow dragging from the collapsed panel edge */}
              {rightCollapsed && (
                <div
                  className="hidden lg:block absolute top-0 bottom-0 left-0"
                  style={{ width: RESIZER_PX, cursor: 'col-resize', zIndex: 30 }}
                  onMouseDown={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    rightResizeStartXRef.current = event.clientX
                    setIsResizingRight(true)
                  }}
                  onTouchStart={(event) => {
                    event.preventDefault()
                    rightResizeStartXRef.current = event.touches?.[0]?.clientX ?? null
                    setIsResizingRight(true)
                  }}
                />
              )}
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
