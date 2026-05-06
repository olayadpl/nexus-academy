"use client"

import { useMemo, useState } from "react"
import { Plus, NotebookPen, MoreHorizontal, PanelLeft } from "lucide-react"
import { Button } from "@/src/core/ui/components/button"
import { cn } from "@/src/core/ui/lib/utils"

type NoteCard = {
  id: string
  title: string
  description: string
  createdAt: string
  tone: "blue" | "yellow"
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

export default function LearningStyleNotesSidebar({ resourceId, collapsed: collapsedProp, onToggleCollapse, disableInternalScroll }: { resourceId: string, collapsed?: boolean, onToggleCollapse?: () => void, disableInternalScroll?: boolean }) {
  const [notes, setNotes] = useState<NoteCard[]>(SEED_NOTES)
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const collapsed = typeof collapsedProp === "boolean" ? collapsedProp : internalCollapsed
  const onToggle = onToggleCollapse ?? (() => setInternalCollapsed((c) => !c))

  const total = useMemo(() => notes.length, [notes.length])
  const scrollClass = disableInternalScroll ? "overflow-hidden" : "overflow-y-auto"

  return (
    <aside
      className={cn(
        "hidden lg:flex lg:h-full lg:flex-col rounded-2xl border border-white/30 bg-background/60 backdrop-blur-md shadow-sm overflow-hidden",
        collapsed ? "lg:w-[72px]" : "lg:w-auto"
      )}
    >
      <div className="flex items-center justify-between border-b px-3 py-2.5">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold">Notas</h2>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">{total}</span>
          </div>
        ) : (
          <span className="sr-only">Notas colapsadas</span>
        )}
        <div className={cn("flex items-center gap-1", collapsed && "w-full justify-center")}>
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              aria-label="Agregar nota"
              onClick={() =>
                setNotes((current) => [
                  {
                    id: `new-${Date.now()}`,
                    title: "Nueva nota",
                    description: `Nota creada para ${resourceId || "este recurso"}.`,
                    createdAt: "Ahora",
                    tone: current.length % 2 === 0 ? "blue" : "yellow",
                  },
                  ...current,
                ])
              }
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full z-40 relative"
            aria-label={collapsed ? "Expandir columna izquierda" : "Colapsar columna izquierda"}
            onPointerDown={(e) => { console.log('notes-toggle pointerdown', {collapsed}) }}
            onClick={(e) => { console.log('notes-toggle click', {collapsed}); e.stopPropagation(); onToggle?.(); }}
          >
            <PanelLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>
      </div>

      {collapsed ? (
        <div className={cn("flex-1 p-2", scrollClass)}>
          <div className="flex w-full flex-col items-center gap-2">
            {notes.map((note) => (
              <button
                key={note.id}
                type="button"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg border bg-card/80 transition-colors hover:bg-muted",
                  note.tone === "blue" ? "text-blue-500" : "text-amber-500"
                )}
                aria-label={note.title}
                title={note.title}
              >
                <NotebookPen className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={cn("space-y-3 p-3", scrollClass)}>
          {notes.map((note) => (
            <article
              key={note.id}
              className={cn(
                "relative rounded-xl border p-3 shadow-sm overflow-hidden",
                note.tone === "blue"
                  ? "bg-blue-50/60 border-blue-100 dark:bg-card dark:border-transparent"
                  : "bg-amber-50/60 border-amber-100 dark:bg-card dark:border-transparent"
              )}
            >
              {/* Indicador de categoría: franja sólida en el extremo izquierdo, no llega hasta las esquinas redondeadas */}
              <span
                className={cn(
                  "absolute left-0 top-0 bottom-0 w-2 rounded-l-xl z-10",
                  note.tone === "blue" ? "bg-blue-600 dark:bg-blue-400" : "bg-amber-500 dark:bg-amber-300"
                )}
              />

              <div className="pl-6">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold leading-tight">{note.title}</h3>
                  <button
                    type="button"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Mas opciones"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{note.description}</p>
                <p className="mt-2 text-[11px] text-muted-foreground">{note.createdAt}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </aside>
  )
}
