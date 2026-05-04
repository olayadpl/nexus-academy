"use client"

import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import {
  Bookmark,
  BookmarkCheck,
  Bot,
  Clock,
  Download,
  FileText,
  MoreHorizontal,
  NotebookPen,
  PanelLeft,
  PanelRight,
  Play,
  Plus,
  SendHorizontal,
  Share2,
  Star,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  Video,
  X,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/core/ui/components/accordion"
import { Badge } from "@/src/core/ui/components/badge"
import { Button } from "@/src/core/ui/components/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/src/core/ui/components/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/core/ui/components/tabs"
import { Textarea } from "@/src/core/ui/components/textarea"
import { Toaster } from "@/src/core/ui/components/sonner"
import { cn } from "@/src/core/ui/lib/utils"
import type { ResourceEntity } from "../../domain/entities/resource.entity"

import LearningStyleNotesSidebar from "./learning-style-notes-sidebar"
import LearningStyleCourseMain from "./learning-style-course-main"
import LearningStyleRightPanel from "./learning-style-right-panel"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/src/core/ui/components/resizable"
import { usePanelRef, useGroupRef } from "react-resizable-panels"

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

type NoteCard = {
  id: string
  title: string
  description: string
  createdAt: string
  tone: "blue" | "yellow"
}

type ChatMessage = {
  id: string
  text: string
  time: string
}

type LearningNoteItem = {
  id: number
  timestamp: string
  text: string
  createdAt: string
}

type RelatedVideoItem = {
  id: number
  title: string
  instructor: string
  duration: string
  rating: string
  students: string
  thumbnail: string
  badge: string | null
}

const SEED_NOTES: NoteCard[] = [
  {
    id: "n1",
    title: "Idea principal",
    description: "Este recurso explica el flujo general y los conceptos base.",
    createdAt: "Hace 2 horas",
    tone: "blue",
  },
  {
    id: "n2",
    title: "Recordatorio",
    description: "Revisar el ejemplo del minuto 04:30 para la tarea.",
    createdAt: "Hace 1 hora",
    tone: "yellow",
  },
]

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "a1",
    text: "¡Hola! Soy tu asistente. Pregúntame sobre este recurso.",
    time: "Ahora",
  },
]

const LEARNING_NOTES_SEED: LearningNoteItem[] = [
  {
    id: 1,
    timestamp: "2:14",
    text: "Key point: eye contact should be held for 3-5 seconds max before breaking naturally.",
    createdAt: "Yesterday",
  },
  {
    id: 2,
    timestamp: "7:42",
    text: "Open body language formula: uncrossed arms and a slight forward lean.",
    createdAt: "Yesterday",
  },
  {
    id: 3,
    timestamp: "15:03",
    text: "Mirror technique: matching the other person pace builds rapport.",
    createdAt: "2 days ago",
  },
  {
    id: 4,
    timestamp: "22:55",
    text: "FORD method for small talk: Family, Occupation, Recreation, Dreams.",
    createdAt: "2 days ago",
  },
]

const LEARNING_RELATED_VIDEOS: RelatedVideoItem[] = [
  {
    id: 1,
    title: "The Science of First Impressions",
    instructor: "Dr. Mark Elliot",
    duration: "45 min",
    rating: "4.8",
    students: "98,402",
    thumbnail: "/images/related-1.jpg",
    badge: "Popular",
  },
  {
    id: 2,
    title: "Public Speaking Mastery: Zero to Hero",
    instructor: "Sarah Connors",
    duration: "2.1h",
    rating: "4.7",
    students: "210,115",
    thumbnail: "/images/related-2.jpg",
    badge: "Bestseller",
  },
  {
    id: 3,
    title: "Social Confidence Blueprint",
    instructor: "James Harlow",
    duration: "1.8h",
    rating: "4.6",
    students: "54,780",
    thumbnail: "/images/related-3.jpg",
    badge: null,
  },
]

const LEARNING_DESCRIPTION_PARAGRAPHS = [
  "In this comprehensive course, you will unlock the secrets of effortless communication in real situations.",
  "You will practice body language fundamentals and rapport techniques to keep conversations natural.",
]

const LEARNING_WHAT_YOU_WILL_LEARN = [
  "Master confident eye contact and open body language",
  "Eliminate filler words and awkward pauses",
  "Use the mirror technique to build instant rapport",
  "Navigate difficult conversations with confidence",
  "Apply the FORD method for engaging small talk",
]

const LEARNING_REQUIREMENTS = [
  "No prior experience needed",
  "A willingness to practice with real people",
]

function toYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace("www.", "")

    if (host === "youtu.be") {
      const videoId = parsed.pathname.split("/").filter(Boolean)[0]
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        const videoId = parsed.searchParams.get("v")
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null
      }
      if (parsed.pathname.startsWith("/embed/")) {
        return url
      }
    }
  } catch {
    return null
  }

  return null
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

  // Refs and collapse state for custom resizable layout (no Sidebar component)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const leftInnerRef = useRef<HTMLDivElement | null>(null)
  const rightInnerRef = useRef<HTMLDivElement | null>(null)

  const leftPanelRef = usePanelRef()
  const rightPanelRef = usePanelRef()
  const groupRef = useGroupRef()

  const [leftCollapsed, setLeftCollapsed] = useState(false)
  const [rightCollapsed, setRightCollapsed] = useState(false)

  // percent-based sizes (used as defaultSize for panels). Values are 0-100.
  const [leftSizePercent, setLeftSizePercent] = useState<number>(20)
  const [rightSizePercent, setRightSizePercent] = useState<number>(20)

  // store previous sizes to restore after uncollapse
  const [leftPrevPercent, setLeftPrevPercent] = useState<number | null>(null)
  const [rightPrevPercent, setRightPrevPercent] = useState<number | null>(null)

  const COLLAPSED_PX = 64 // icon width when collapsed

  // Minimum side column width in pixels before auto-collapsing to avoid content deformation
  const SIDE_MIN_PX = 200

  // collapsed minimum percent (based on COLLAPSED_PX and container width) to ensure panels never shrink smaller than the sidebar icon width
  const [collapsedMinPercent, setCollapsedMinPercent] = useState<number>(2)

  // refs to avoid re-entrant auto-collapse
  const isAutoCollapsingLeftRef = useRef(false)
  const isAutoCollapsingRightRef = useRef(false)

  // update collapsedMinPercent whenever container width changes
  useEffect(() => {
    function updateCollapsedPercent() {
      const containerWidth = containerRef.current?.getBoundingClientRect().width || (typeof window !== 'undefined' ? window.innerWidth : 1)
      const p = Math.max(2, Math.round((COLLAPSED_PX / Math.max(1, containerWidth)) * 100))
      setCollapsedMinPercent(p)
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

  // auto-collapse side panels when their inner width goes below SIDE_MIN_PX to prevent layout breakage
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return
    const observers: ResizeObserver[] = []

    function observeSide(ref: React.RefObject<HTMLDivElement>, side: 'left' | 'right') {
      if (!ref.current) return
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = entry.target.getBoundingClientRect().width
          if (side === 'left') {
            if (w < SIDE_MIN_PX && !leftCollapsed && !isAutoCollapsingLeftRef.current) {
              isAutoCollapsingLeftRef.current = true
              try {
                // use toggle so prev percent is saved and layout adjusted consistently
                toggleLeft()
              } catch (e) {}
              setTimeout(() => (isAutoCollapsingLeftRef.current = false), 300)
            }
          } else {
            if (w < SIDE_MIN_PX && !rightCollapsed && !isAutoCollapsingRightRef.current) {
              isAutoCollapsingRightRef.current = true
              try {
                toggleRight()
              } catch (e) {}
              setTimeout(() => (isAutoCollapsingRightRef.current = false), 300)
            }
          }
        }
      })
      ro.observe(ref.current)
      observers.push(ro)
    }

    observeSide(leftInnerRef, 'left')
    observeSide(rightInnerRef, 'right')

    return () => {
      observers.forEach((o) => o.disconnect())
    }
  }, [leftInnerRef.current, rightInnerRef.current, leftCollapsed, rightCollapsed, toggleLeft, toggleRight])

  // helper to compute middle size given left/right
  const computeMiddlePercent = (l = leftSizePercent, r = rightSizePercent) => {
    const mid = Math.max(5, 100 - l - r)
    return mid
  }

  // Toggle collapse: measure current width and store percent before collapsing so we can restore
  function toggleLeft() {
    const container = containerRef.current?.getBoundingClientRect()
    const leftRect = leftInnerRef.current?.getBoundingClientRect()
    if (!container) {
      setLeftCollapsed((c) => !c)
      return
    }

    if (!leftCollapsed) {
      // collapsing: save percent then set collapsed percent based on COLLAPSED_PX
      if (leftRect) {
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
      const restore = leftPrevPercent ?? 20
      if (leftPanelRef.current?.resize) leftPanelRef.current.resize(`${restore}%`)
      try {
        const rightP = rightSizePercent
        const mainP = Math.max(1, 100 - restore - rightP)
        groupRef.current?.setLayout({ left: restore, main: mainP, right: rightP })
      } catch {}
      setLeftSizePercent(restore)
      setLeftPrevPercent(null)
      setLeftCollapsed(false)
    }
  }

  function toggleRight() {
    const container = containerRef.current?.getBoundingClientRect()
    const rightRect = rightInnerRef.current?.getBoundingClientRect()
    if (!container) {
      setRightCollapsed((c) => !c)
      return
    }

    if (!rightCollapsed) {
      if (rightRect) {
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
      const restore = rightPrevPercent ?? 20
      if (rightPanelRef.current?.resize) rightPanelRef.current.resize(`${restore}%`)
      try {
        const leftP = leftSizePercent
        const mainP = Math.max(1, 100 - leftP - restore)
        groupRef.current?.setLayout({ left: leftP, main: mainP, right: restore })
      } catch {}
      setRightSizePercent(restore)
      setRightPrevPercent(null)
      setRightCollapsed(false)
    }
  }

  function handlePanelCollapseMeasure(side: "left" | "right") {
    // measure width of panel and update corresponding percent - used before collapsing
    const container = containerRef.current?.getBoundingClientRect()
    if (!container) return
    if (side === "left") {
      const r = leftInnerRef.current?.getBoundingClientRect()
      if (r) setLeftSizePercent(Math.round((r.width / container.width) * 100))
    } else {
      const r = rightInnerRef.current?.getBoundingClientRect()
      if (r) setRightSizePercent(Math.round((r.width / container.width) * 100))
    }
  }

  function onPanelGroupKey() {
    // noop placeholder if needed
  }

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
          {/* Custom resizable implementation using shadcn Resizable primitives. Collapse logic handled here. */}
          <div className="w-full min-h-0 h-full relative" ref={containerRef}>
            <ResizablePanelGroup
              key={`group-${leftCollapsed}-${rightCollapsed}-${leftSizePercent}-${rightSizePercent}`}
              className="w-full min-h-0 h-full gap-1"
              groupRef={groupRef}
              id={`resource-viewer-group`}
            >
              {/* Left panel (always rendered; collapsed state represented by small percent) */}
              <ResizablePanel id="left" key={`left-${leftSizePercent}-${leftCollapsed}`} panelRef={leftPanelRef} defaultSize={leftSizePercent} minSize={collapsedMinPercent} className="hidden lg:flex lg:flex-col h-full">
                <div ref={leftInnerRef} className={cn("min-h-0 w-full h-full transition-all", leftCollapsed ? "overflow-hidden" : "")}>
                  <div className={cn(leftCollapsed ? "w-16" : "w-full", "h-full")}>
                    <LearningStyleNotesSidebar resourceId={activeResourceId} collapsed={leftCollapsed} onToggleCollapse={toggleLeft} disableInternalScroll={true} />
                  </div>
                </div>
              </ResizablePanel>

              {/* Left handle */}
              <ResizableHandle withHandle hideSeparator className="hidden lg:flex" />

              {/* Main panel -- size depends on left/right percents */}
              <ResizablePanel id="main" key={`main-${leftSizePercent}-${rightSizePercent}-${leftCollapsed}-${rightCollapsed}`} 
                defaultSize={computeMiddlePercent(leftSizePercent, rightSizePercent)}
                minSize={30}
                className="min-w-0 h-full"
              >
                <div className="relative min-w-0 min-h-0 h-full rounded-2xl border border-white/30 bg-background/60 backdrop-blur-md shadow-sm">
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
              </ResizablePanel>

              {/* Right handle and panel (always rendered) */}
              <ResizableHandle withHandle hideSeparator className="hidden lg:flex" />

              <ResizablePanel id="right" key={`right-${rightSizePercent}-${rightCollapsed}`} panelRef={rightPanelRef} defaultSize={rightSizePercent} minSize={collapsedMinPercent} className="hidden lg:flex lg:flex-col h-full">
                <div ref={rightInnerRef} className={cn("min-h-0 w-full h-full transition-all", rightCollapsed ? "overflow-hidden" : "")}>
                  <div className={cn(rightCollapsed ? "w-16" : "w-full", "h-full")}>
                    <LearningStyleRightPanel
                      course={courseModel}
                      activeLessonId={activeResourceId}
                      onSelectLesson={setActiveResourceId}
                      collapsed={rightCollapsed}
                      onToggleCollapse={toggleRight}
                      disableInternalScroll={true}
                    />
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>

            {/* Collapse toggle rails removed. Each sidebar component renders its own toggle control to avoid duplication. */}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
