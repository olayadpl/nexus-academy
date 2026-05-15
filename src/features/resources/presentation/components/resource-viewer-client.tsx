"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { Toaster } from "@/src/core/ui/components/sonner"
import { useLocale } from "@/src/core/ui/hooks/use-locale"
import { getTranslations } from "@/src/lib/i18n/translations"
import type { ResourceEntity } from "../../domain/entities/resource.entity"
import type { ResourceCourseModel, ResourceLesson } from "./resource-viewer.types"
import { mapResourceToLesson } from "./resource-viewer.utils"
import LearningStyleNotesSidebar from "./learning-style-notes-sidebar"
import LearningStyleCourseMain from "./learning-style-course-main"
import LearningStyleRightPanel from "./learning-style-right-panel"

type ResourceViewerClientProps = {
  course: {
    id: string
    title: string
    description: string
    authorName?: string
  }
  resources: ResourceEntity[]
  initialResourceId?: string
  courseModules?: {
    id: string
    title: string
    resources: {
      id: string
      title: string
      type: "video" | "pdf" | "form"
      youtubeUrl?: string
      videoFile?: string
      documentFile?: string
      formId?: string
      durationMinutes: number
      completed: boolean
    }[]
  }[]
}

const COLLAPSED_PX = 72
const SIDE_MIN_PX = 200
const SIDE_DEFAULT_PX = 280
const RESIZER_PX = 4
const MAIN_MIN_PX = 420

function buildCourseModel(
  courseId: string,
  courseTitle: string,
  resourceItems: ResourceEntity[],
  courseModules?: ResourceViewerClientProps["courseModules"],
  t?: { resourceViewer: { moduleLabel: (n: number) => string } }
): ResourceCourseModel {
  if (courseModules && courseModules.length > 0) {
    return {
      id: courseId,
      title: courseTitle,
      modules: courseModules.map((section, sectionIdx) => ({
        id: section.id,
        title: section.title,
        resources: section.resources.map((r, lessonIdx) => ({
          id: r.id,
          title: r.title,
          type: r.type,
          videoUrl: r.videoFile,
          documentUrl: r.documentFile,
          youtubeUrl: r.youtubeUrl,
          formId: r.formId,
          durationMinutes: r.durationMinutes,
          completed: r.completed,
          step: (lessonIdx % 3) + 1,
        })),
      })),
    }
  }

  const lessonsPerModule = 3
  const moduleMap = new Map<number, { id: string; title: string; resources: ResourceLesson[] }>()

  resourceItems.forEach((resource, index) => {
    const moduleIndex = Math.floor(index / lessonsPerModule)
    const lessonStep = (index % lessonsPerModule) + 1

    if (!moduleMap.has(moduleIndex)) {
      moduleMap.set(moduleIndex, {
        id: `section-${moduleIndex + 1}`,
        title: t?.resourceViewer.moduleLabel(moduleIndex + 1) ?? `Module ${moduleIndex + 1}`,
        resources: [],
      })
    }

    const mapped = mapResourceToLesson(resource)
    moduleMap.get(moduleIndex)!.resources.push({ ...mapped, step: lessonStep })
  })

  return {
    id: courseId,
    title: courseTitle,
    modules: Array.from(moduleMap.values()).sort((a, b) => {
      const aNum = parseInt(a.id.replace("section-", ""))
      const bNum = parseInt(b.id.replace("section-", ""))
      return aNum - bNum
    }),
  }
}

function useResizablePanels() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const leftResizeStartXRef = useRef<number | null>(null)
  const rightResizeStartXRef = useRef<number | null>(null)

  const [leftCollapsed, setLeftCollapsed] = useState(false)
  const [rightCollapsed, setRightCollapsed] = useState(false)
  const [leftWidthPx, setLeftWidthPx] = useState(SIDE_DEFAULT_PX)
  const [rightWidthPx, setRightWidthPx] = useState(SIDE_DEFAULT_PX)
  const [leftPrevWidthPx, setLeftPrevWidthPx] = useState(SIDE_DEFAULT_PX)
  const [rightPrevWidthPx, setRightPrevWidthPx] = useState(SIDE_DEFAULT_PX)
  const [isResizingLeft, setIsResizingLeft] = useState(false)
  const [isResizingRight, setIsResizingRight] = useState(false)

  const toggleLeft = useCallback(() => {
    if (leftCollapsed) {
      setLeftCollapsed(false)
      setLeftWidthPx(SIDE_DEFAULT_PX)
      return
    }
    setLeftPrevWidthPx(leftWidthPx)
    setLeftCollapsed(true)
    setLeftWidthPx(COLLAPSED_PX)
  }, [leftCollapsed, leftWidthPx])

  const toggleRight = useCallback(() => {
    if (rightCollapsed) {
      setRightCollapsed(false)
      setRightWidthPx(SIDE_DEFAULT_PX)
      return
    }
    setRightPrevWidthPx(rightWidthPx)
    setRightCollapsed(true)
    setRightWidthPx(COLLAPSED_PX)
  }, [rightCollapsed, rightWidthPx])

  const stopResizing = useCallback(() => {
    setIsResizingLeft(false)
    setIsResizingRight(false)
    leftResizeStartXRef.current = null
    rightResizeStartXRef.current = null
  }, [])

  const handleResize = useCallback(
    (event: PointerEvent) => {
      const container = containerRef.current?.getBoundingClientRect()
      if (!container) return

      const rightCurrent = rightCollapsed ? COLLAPSED_PX : rightWidthPx
      const leftCurrent = leftCollapsed ? COLLAPSED_PX : leftWidthPx

      if (isResizingLeft) {
        const nextWidth = event.clientX - container.left
        if (nextWidth < 60) {
          if (!leftCollapsed) setLeftPrevWidthPx(leftWidthPx)
          setLeftCollapsed(true)
          setLeftWidthPx(COLLAPSED_PX)
          return
        }
        const maxLeft = Math.max(SIDE_MIN_PX, container.width - rightCurrent - MAIN_MIN_PX - RESIZER_PX * 2)
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
        const maxRight = Math.max(SIDE_MIN_PX, container.width - leftCurrent - MAIN_MIN_PX - RESIZER_PX * 2)
        setRightCollapsed(false)
        setRightWidthPx(Math.min(Math.max(nextWidth, SIDE_MIN_PX), maxRight))
      }
    },
    [isResizingLeft, isResizingRight, leftCollapsed, leftWidthPx, rightCollapsed, rightWidthPx]
  )

  useEffect(() => {
    if (!isResizingLeft && !isResizingRight) return

    const onPointerMove = (event: PointerEvent) => handleResize(event)
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

  const startLeftResize = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    leftResizeStartXRef.current = e.clientX
    setIsResizingLeft(true)
  }

  const startRightResize = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    rightResizeStartXRef.current = e.clientX
    setIsResizingRight(true)
  }

  return {
    containerRef,
    leftCollapsed,
    rightCollapsed,
    leftWidthPx,
    rightWidthPx,
    isResizingLeft,
    isResizingRight,
    toggleLeft,
    toggleRight,
    startLeftResize,
    startRightResize,
  }
}

export function ResourceViewerClient({ course, resources, initialResourceId, courseModules }: ResourceViewerClientProps) {
  const { locale } = useLocale()
  const t = getTranslations(locale)
  const [resourceItems, setResourceItems] = useState(resources)

  const initial = initialResourceId
    ? resourceItems.find((item) => item.id === initialResourceId) ?? resourceItems[0] ?? null
    : resourceItems[0] ?? null
  const [activeResourceId, setActiveResourceId] = useState(initial?.id ?? "")
  const activeResource = resourceItems.find((item) => item.id === activeResourceId) ?? null

  const courseModel = useMemo(
    () => buildCourseModel(course.id, course.title, resourceItems, courseModules, t),
    [course.id, course.title, resourceItems, courseModules, t]
  )

  const activeLesson = useMemo(
    () => courseModel.modules.flatMap((m) => m.resources).find((l) => l.id === activeResourceId) ?? null,
    [courseModel.modules, activeResourceId]
  )

  const { leftCollapsed, rightCollapsed, leftWidthPx, rightWidthPx, isResizingLeft, isResizingRight, toggleLeft, toggleRight, containerRef, startLeftResize, startRightResize } = useResizablePanels()

  const handleSaveNote = useCallback(() => {
    toast.success(t.resourceViewer.noteSavedTitle, { description: t.resourceViewer.noteSavedDescription })
  }, [t])

  const handleMarkAsCompleted = useCallback(() => {
    if (!activeResourceId) return
    setResourceItems((current) => current.map((item) => (item.id === activeResourceId ? { ...item, completed: true } : item)))
  }, [activeResourceId])

  if (!activeResource) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">{t.resourceViewer.noResources}</div>
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
              {leftCollapsed && (
                <div
                  className="hidden lg:block absolute top-0 bottom-0 right-0"
                  style={{ width: RESIZER_PX, cursor: "col-resize", zIndex: 30 }}
                  onPointerDown={startLeftResize}
                />
              )}
            </div>

            <div
              className="hidden lg:block h-full shrink-0 cursor-col-resize hover:bg-border/60 active:bg-border/80"
              style={{ width: RESIZER_PX }}
              onPointerDown={startLeftResize}
            />

            <div className="relative min-w-0 min-h-0 h-full max-h-full flex-1 rounded-2xl border border-white/30 bg-background/60 backdrop-blur-md shadow-sm overflow-hidden">
              <div className="h-full min-h-0 overflow-auto">
                <LearningStyleCourseMain course={courseModel} activeLesson={activeLesson} onSaveNote={handleSaveNote} />
              </div>
            </div>

            <div
              className="hidden lg:block h-full shrink-0 cursor-col-resize hover:bg-border/60 active:bg-border/80"
              style={{ width: RESIZER_PX }}
              onPointerDown={startRightResize}
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
              {rightCollapsed && (
                <div
                  className="hidden lg:block absolute top-0 bottom-0 left-0"
                  style={{ width: RESIZER_PX, cursor: "col-resize", zIndex: 30 }}
                  onPointerDown={startRightResize}
                />
              )}
            </div>

            {(isResizingLeft || isResizingRight) && <div className="hidden lg:block absolute inset-0 z-40 bg-transparent cursor-col-resize" />}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}