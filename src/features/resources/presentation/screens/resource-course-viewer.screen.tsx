"use client"

import { useMemo, useRef, useState } from "react"
import { Bot, PanelRight, Video, FileText } from "lucide-react"
import { Button } from "@/src/core/ui/components/button"
import { cn } from "@/src/core/ui/lib/utils"
import { useLocale } from "@/src/core/ui/hooks/use-locale"
import { getTranslations } from "@/src/lib/i18n/translations"
import type { ResourceEntity } from "../../domain/entities/resource.entity"
import type { ResourceCourseModel, ResourceLesson, ResourceViewerClientProps } from "../components/resource-viewer.types"
import { mapResourceToLesson } from "../components/resource-viewer.utils"
import { LayoutColumns } from "../components/layout-columns"
import { SidebarNotes } from "../components/sidebar-notes"
import { MainContent } from "../components/main-content"
import { SidebarModules } from "../components/sidebar-modules"
import { SidebarAssistant } from "../components/sidebar-assistant"

type ResourceCourseViewerScreenProps = {
  course: {
    id: string
    title: string
    description: string
    authorName?: string
  }
  resources: ResourceEntity[]
  initialResourceId?: string
  courseModules?: ResourceViewerClientProps["courseModules"]
}

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
      modules: courseModules.map((section) => ({
        id: section.id,
        title: section.title,
        resources: section.resources.map((resource, lessonIdx) => ({
          id: resource.id,
          title: resource.title,
          type: resource.type,
          videoUrl: resource.videoFile,
          documentUrl: resource.documentFile,
          youtubeUrl: resource.youtubeUrl,
          formId: resource.formId,
          durationMinutes: resource.durationMinutes,
          completed: resource.completed,
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

function RightSidebar({
  course,
  activeLessonId,
  onSelectLesson,
  collapsed,
  onToggle,
}: {
  course: ResourceCourseModel
  activeLessonId: string
  onSelectLesson: (id: string) => void
  collapsed: boolean
  onToggle: () => void
}) {
  const [view, setView] = useState<"modules" | "assistant">("modules")

  return (
    <aside className="hidden lg:flex lg:h-full lg:flex-col w-full rounded-2xl border border-white/30 bg-background/60 backdrop-blur-md shadow-sm overflow-hidden">
      <div className="border-b px-3 py-2.5">
        <div className={cn("flex items-center gap-2", collapsed ? "justify-center" : "justify-between")}>
          <div className="flex flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (collapsed) onToggle()
                setView("modules")
              }}
              className={cn(
                "group inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-xs font-medium transition-all",
                view === "modules"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
              aria-label="Modulos"
            >
              <Video className="h-4 w-4" />
              <span
                className={cn(
                  "overflow-hidden transition-all duration-150 whitespace-nowrap",
                  view === "modules" ? "max-w-[5rem] pl-1" : "max-w-0 group-hover:max-w-[5rem] group-hover:pl-1"
                )}
              >
                Modulos
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (collapsed) onToggle()
                setView("assistant")
              }}
              className={cn(
                "group inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-xs font-medium transition-all",
                view === "assistant"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
              aria-label="Chatbot"
            >
              <Bot className="h-4 w-4" />
              <span
                className={cn(
                  "overflow-hidden transition-all duration-150 whitespace-nowrap",
                  view === "assistant" ? "max-w-[5rem] pl-1" : "max-w-0 group-hover:max-w-[5rem] group-hover:pl-1"
                )}
              >
                Chatbot
              </span>
            </button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={(event) => {
              event.stopPropagation()
              onToggle()
            }}
            aria-label={collapsed ? "Expandir columna derecha" : "Colapsar columna derecha"}
            className="h-8 w-8 shrink-0"
          >
            <PanelRight className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>
      </div>

      {collapsed ? (
        <div className="flex-1 p-2">
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onToggle()
                setView("modules")
              }}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg border transition-colors",
                view === "modules" ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-background hover:bg-muted"
              )}
              aria-label="Abrir Modulos"
              title="Modulos"
            >
              <FileText className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onToggle()
                setView("assistant")
              }}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg border transition-colors",
                view === "assistant" ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-background hover:bg-muted"
              )}
              aria-label="Abrir Chatbot"
              title="Chatbot"
            >
              <Bot className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : view === "modules" ? (
        <SidebarModules course={course} activeLessonId={activeLessonId} onSelectLesson={onSelectLesson} />
      ) : (
        <SidebarAssistant />
      )}
    </aside>
  )
}

export function ResourceCourseViewerScreen({ course, resources, initialResourceId, courseModules }: ResourceCourseViewerScreenProps) {
  const { locale } = useLocale()
  const t = getTranslations(locale)
  const resourceItems = resources

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
    () => courseModel.modules.flatMap((module) => module.resources).find((lesson) => lesson.id === activeResourceId) ?? null,
    [courseModel.modules, activeResourceId]
  )

  const mainScrollRef = useRef<HTMLDivElement>(null)

  if (!activeResource) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">{t.resourceViewer.noResources}</div>
      </main>
    )
  }

  return (
    <LayoutColumns
      left={({ collapsed, onToggle }) => (
        <SidebarNotes resourceId={activeResourceId} collapsed={collapsed} onToggleCollapse={onToggle} disableInternalScroll={false} />
      )}
      main={
        <div ref={mainScrollRef} className="h-full min-h-0 overflow-auto">
          <MainContent course={courseModel} activeLesson={activeLesson} scrollRef={mainScrollRef} />
        </div>
      }
      right={({ collapsed, onToggle }) => (
        <RightSidebar
          course={courseModel}
          activeLessonId={activeResourceId}
          onSelectLesson={setActiveResourceId}
          collapsed={collapsed}
          onToggle={onToggle}
        />
      )}
    />
  )
}
