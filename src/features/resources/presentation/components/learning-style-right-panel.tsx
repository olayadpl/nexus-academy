"use client"

import { useState } from "react"
import { Bot, PanelRight, Video, FileText } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/core/ui/components/accordion"
import { Button } from "@/src/core/ui/components/button"
import { cn } from "@/src/core/ui/lib/utils"

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
        collapsed ? "lg:w-[72px]" : "lg:w-auto"
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
                "group inline-flex items-center gap-2 rounded-full px-2.5 py-2 text-xs font-medium transition-all",
                view === "modules"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
              aria-label="Modulos"
            >
              <Video className="h-4 w-4" />
              <span className="overflow-hidden max-w-0 transition-all duration-150 group-hover:max-w-[6rem] group-hover:pl-2 whitespace-nowrap">Modulos</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (collapsed) onToggle?.()
                setView("assistant")
              }}
              className={cn(
                "group inline-flex items-center gap-2 rounded-full px-2.5 py-2 text-xs font-medium transition-all",
                view === "assistant"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
              aria-label="Asistente IA"
            >
              <Bot className="h-4 w-4" />
              <span className="overflow-hidden max-w-0 transition-all duration-150 group-hover:max-w-[6.5rem] group-hover:pl-2 whitespace-nowrap">Asistente IA</span>
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
              aria-label="Abrir Asistente IA"
              title="Asistente IA"
            >
              <Bot className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : view === "modules" ? (
        <div className={cn("flex-1 p-3", scrollClass)}>
          <Accordion type="single" collapsible className="space-y-2">
            {course.modules.map((lesson, index) => (
              <AccordionItem key={lesson.id} value={lesson.id} className="rounded-xl border bg-card/80 px-3">
                <AccordionTrigger className="py-3 text-sm no-underline hover:no-underline">
                  Modulo {index + 1}
                </AccordionTrigger>
                <AccordionContent className="pb-3">
                  <button
                    type="button"
                    onClick={() => onSelectLesson(lesson.id)}
                    className={cn(
                      "w-full rounded-lg border px-3 py-2 text-left text-xs transition-colors",
                      activeLessonId === lesson.id
                        ? "border-primary/50 bg-primary/10 text-foreground"
                        : "border-border bg-background hover:bg-muted"
                    )}
                  >
                    <p className="font-semibold">{lesson.title}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {lesson.durationMinutes} min · {lesson.type === "video" ? "Video" : "Documento"}
                    </p>
                  </button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : (
        <>
          <div className="border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold">Asistente IA</h2>
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
