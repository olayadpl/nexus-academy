"use client"

import { useState } from "react"
import { Bot, PanelRight, Video, FileText } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/core/ui/components/accordion"
import { Button } from "@/src/core/ui/components/button"
import { cn } from "@/src/core/ui/lib/utils"

type ResourceLesson = {
  id: string
  title: string
  type: "video" | "pdf" | "form"
  videoUrl?: string
  documentUrl?: string
  youtubeUrl?: string
  formId?: string
  durationMinutes: number
  completed: boolean
  step: number
}

type ResourceSection = {
  id: string
  title: string
  resources: ResourceLesson[]
}

type ResourceCourseModel = {
  id: string
  title: string
  modules: ResourceSection[]
}

type ChatMessage = {
  id: string
  text: string
  time: string
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "a1",
    text: "¡Hola! Soy tu asistente. Pregúntame sobre este recurso.",
    time: "Ahora",
  },
]

export default function LearningStyleRightPanel({
  course,
  activeLessonId,
  onSelectLesson,
  collapsed: collapsedProp,
  onToggleCollapse,
  disableInternalScroll,
}: {
  course: ResourceCourseModel
  activeLessonId: string
  onSelectLesson: (id: string) => void
  collapsed?: boolean
  onToggleCollapse?: () => void
  disableInternalScroll?: boolean
}) {
  const [view, setView] = useState<"modules" | "assistant">("modules")
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const collapsed = typeof collapsedProp === "boolean" ? collapsedProp : internalCollapsed
  const onToggle = onToggleCollapse ?? (() => setInternalCollapsed((c) => !c))
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [question, setQuestion] = useState("")
  const scrollClass = disableInternalScroll ? "overflow-hidden" : "overflow-y-auto"

  const sendQuestion = () => {
    const value = question.trim()
    if (!value) return

    setMessages((current) => [
      ...current,
      { id: `u-${Date.now()}`, text: value, time: "Ahora" },
      {
        id: `a-${Date.now() + 1}`,
        text: "Entendido. Estoy analizando el contenido para responderte con más contexto.",
        time: "Ahora",
      },
    ])
    setQuestion("")
  }

  return (
    <aside
      className={cn(
        "hidden lg:flex lg:h-full lg:flex-col rounded-2xl border border-white/30 bg-background/60 backdrop-blur-md shadow-sm overflow-hidden",
        collapsed ? "lg:w-[4.5rem]" : "lg:w-auto"
      )}
    >
      <div className="border-b px-3 py-2.5">
        <div className={cn("flex items-center gap-2", collapsed ? "justify-center" : "justify-between")}>
          <div className="flex flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (collapsed) onToggle?.()
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
              <span className={cn("overflow-hidden transition-all duration-150 whitespace-nowrap", view === "modules" ? "max-w-[5rem] pl-1" : "max-w-0 group-hover:max-w-[5rem] group-hover:pl-1")}>Modulos</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (collapsed) onToggle?.()
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
              <span className={cn("overflow-hidden transition-all duration-150 whitespace-nowrap", view === "assistant" ? "max-w-[5rem] pl-1" : "max-w-0 group-hover:max-w-[5rem] group-hover:pl-1")}>Chatbot</span>
            </button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onPointerDown={(e) => { console.log('right-toggle pointerdown', {collapsed}) }}
            onClick={(e) => { console.log('right-toggle click', {collapsed}); e.stopPropagation(); onToggle?.(); }}
            aria-label={collapsed ? "Expandir columna derecha" : "Colapsar columna derecha"}
            className="h-8 w-8 shrink-0 z-40 relative"
          >
            <PanelRight className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>
      </div>

      {collapsed ? (
        <div className={cn("flex-1 p-2", scrollClass)}>
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            {/* Icon tabs: Modules and Assistant. Clicking expands the panel to that view. */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onToggle?.()
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
              onClick={(e) => {
                e.stopPropagation()
                onToggle?.()
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
        <div className={cn("flex-1 p-4", scrollClass)}>
          <Accordion type="single" collapsible defaultValue={course.modules[0]?.id} className="space-y-3">
            {course.modules.map((section, sectionIndex) => {
              const sectionDuration = section.resources.reduce((a, b) => a + b.durationMinutes, 0)
              const completedResources = section.resources.filter(l => l.completed).length
              const progress = section.resources.length > 0 ? Math.round((completedResources / section.resources.length) * 100) : 0

              return (
                <AccordionItem key={section.id} value={section.id} className="rounded-2xl border border-border/50 bg-card/50 overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 no-underline hover:no-underline hover:bg-muted/30">
                    <div className="flex w-full items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-sm">Módulo {sectionIndex + 1}</p>
                        <p className="text-xs text-muted-foreground">{section.resources.length} lecciones · {sectionDuration} min</p>
                      </div>
                      {progress > 0 && (
                        <div className="mr-2 flex items-center gap-2">
                          <div className="h-1.5 w-12 overflow-hidden rounded-full bg-muted">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="divide-y divide-border/30 px-2 pb-2">
                      {section.resources.map((lesson) => {
                        const isActive = activeLessonId === lesson.id

                        return (
                          <button
                            key={lesson.id}
                            type="button"
                            onClick={() => onSelectLesson(lesson.id)}
                            className={cn(
                              "flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-muted/50",
                              isActive && "bg-primary/5"
                            )}
                          >
                            <div className={cn(
                              "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
                              lesson.completed
                                ? "bg-green-500 text-white"
                                : isActive
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            )}>
                              {lesson.completed ? (
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                lesson.step
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <p className={cn(
                                "text-sm font-medium truncate",
                                lesson.completed && "text-muted-foreground"
                              )}>
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{lesson.type === "video" ? "Video" : "PDF"}</span>
                                <span>·</span>
                                <span>{lesson.durationMinutes} min</span>
                              </div>
                            </div>
                            
                            <div className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-md",
                              lesson.type === "video" 
                                ? "bg-primary/10 text-primary" 
                                : "bg-muted text-muted-foreground"
                            )}>
                              {lesson.type === "video" ? (
                                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              ) : (
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      ) : (
        <>
          <div className="border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold">Chatbot</h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Pregunta sobre el documento</p>
          </div>
          <div className={cn("flex-1 space-y-3 p-3", scrollClass)}>
            {messages.map((message) => (
              <div key={message.id} className="rounded-xl bg-card/80 p-3 text-sm shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-3 w-3 text-primary" />
                  </span>
                  <span className="text-[11px]">Asistente</span>
                </div>
                <p className="leading-relaxed">{message.text}</p>
                <p className="mt-2 text-[11px] text-muted-foreground">{message.time}</p>
              </div>
            ))}
          </div>
          <div className="border-t p-3">
            <div className="flex items-center gap-2 rounded-xl border bg-card px-2 py-2">
              <input
                type="text"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    sendQuestion()
                  }
                }}
                placeholder="Escribe tu pregunta..."
                className="h-8 w-full bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Escribe tu pregunta"
              />
              <Button size="icon" className="h-8 w-8 rounded-lg" onClick={sendQuestion} aria-label="Enviar pregunta">
                <svg />
              </Button>
            </div>
          </div>
        </>
      )}
    </aside>
  )
}
