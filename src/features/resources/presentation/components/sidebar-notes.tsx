"use client"

import { useMemo, useState, useRef, useEffect } from "react"
import type { ChangeEvent } from "react"
import { Plus, NotebookPen, MoreHorizontal, PanelLeft, Palette, X } from "lucide-react"
import { Button } from "@/src/core/ui/components/button"
import { cn } from "@/src/core/ui/lib/utils"

type NoteCard = {
  id: string
  title: string
  description: string
  createdAt: string
  tone: "blue" | "yellow" | "green" | "pink"
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

type SidebarNotesProps = {
  resourceId: string
  collapsed?: boolean
  onToggleCollapse?: () => void
  disableInternalScroll?: boolean
}

export function SidebarNotes({ resourceId, collapsed: collapsedProp, onToggleCollapse, disableInternalScroll }: SidebarNotesProps) {
  const [notes, setNotes] = useState<NoteCard[]>(SEED_NOTES)
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const collapsed = typeof collapsedProp === "boolean" ? collapsedProp : internalCollapsed
  const onToggle = onToggleCollapse ?? (() => setInternalCollapsed((current) => !current))

  const [showCreate, setShowCreate] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDesc, setNewDesc] = useState("")
  const [newTone, setNewTone] = useState<NoteCard["tone"]>("blue")
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null)
  const descRef = useRef<HTMLTextAreaElement | null>(null)
  const DEFAULT_DESC_HEIGHT = 112
  const MAX_DESC_HEIGHT = 240

  function handleDescChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value
    setNewDesc(value)
    if (!descRef.current) return
    descRef.current.style.height = "auto"
    const scrollH = descRef.current.scrollHeight
    if (scrollH <= DEFAULT_DESC_HEIGHT) {
      descRef.current.style.height = `${DEFAULT_DESC_HEIGHT}px`
      descRef.current.style.overflowY = "hidden"
    } else if (scrollH <= MAX_DESC_HEIGHT) {
      descRef.current.style.height = `${scrollH}px`
      descRef.current.style.overflowY = "hidden"
    } else {
      descRef.current.style.height = `${MAX_DESC_HEIGHT}px`
      descRef.current.style.overflowY = "auto"
    }
  }

  const colorPickerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!showColorPicker) return
    function onDocClick(event: MouseEvent) {
      const target = event.target as Node
      if (colorPickerRef.current && !colorPickerRef.current.contains(target)) {
        setShowColorPicker(false)
      }
    }
    document.addEventListener("mousedown", onDocClick)
    document.addEventListener("touchstart", onDocClick)
    return () => {
      document.removeEventListener("mousedown", onDocClick)
      document.removeEventListener("touchstart", onDocClick)
    }
  }, [showColorPicker])

  const total = useMemo(() => notes.length, [notes.length])
  const scrollClass = disableInternalScroll ? "overflow-hidden" : "overflow-y-auto"

  return (
    <aside className="hidden lg:flex lg:h-full lg:flex-col w-full rounded-2xl border border-white/30 bg-background/60 backdrop-blur-md shadow-sm overflow-hidden">
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
              onClick={() => setShowCreate(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            aria-label={collapsed ? "Expandir columna izquierda" : "Colapsar columna izquierda"}
            onClick={(event) => {
              event.stopPropagation()
              onToggle?.()
            }}
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
                  note.tone === "blue"
                    ? "text-blue-500"
                    : note.tone === "yellow"
                    ? "text-amber-500"
                    : note.tone === "green"
                    ? "text-green-500"
                    : "text-pink-500"
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
          {showCreate && (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                const tone = newTone || "blue"
                const title = newTitle.trim() || "Nueva nota"
                const desc = newDesc.trim() || `Nota creada para ${resourceId || "este recurso"}.`
                setNotes((current) => [
                  {
                    id: `new-${Date.now()}`,
                    title,
                    description: desc,
                    createdAt: "Ahora",
                    tone,
                  },
                  ...current,
                ])
                setShowCreate(false)
                setNewTitle("")
                setNewDesc("")
                setNewTone("blue")
                setShowColorPicker(false)
              }}
              className="relative rounded-lg p-4 bg-card/80 focus-within:ring-0 focus-within:border-transparent focus-within:outline-none"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Titulo de la nota..."
                    value={newTitle}
                    onChange={(event) => setNewTitle(event.target.value)}
                    className="w-full text-left text-lg font-semibold bg-transparent border-none focus:ring-0 focus:placeholder-transparent focus:outline-none placeholder:text-muted-foreground text-foreground"
                  />

                  <div className="w-full h-px bg-border my-2" />

                  <textarea
                    ref={descRef}
                    placeholder="Escribe algo increible..."
                    value={newDesc}
                    onChange={handleDescChange}
                    className="w-full bg-transparent border-none focus:ring-0 focus:placeholder-transparent focus:outline-none placeholder:text-muted-foreground text-muted-foreground resize-none transition-all duration-300"
                    style={{ height: `${DEFAULT_DESC_HEIGHT}px`, overflowY: "hidden" }}
                  />
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreate(false)
                      setNewTitle("")
                      setNewDesc("")
                      setNewTone("blue")
                      setShowColorPicker(false)
                    }}
                    className="p-1 text-muted-foreground hover:text-foreground"
                    aria-label="Cerrar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="absolute right-4 bottom-4">
                  <button
                    type="submit"
                    disabled={!newTitle && !newDesc}
                    className={cn(
                      "px-4 py-2 rounded-md font-semibold",
                      !newTitle && !newDesc
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    )}
                  >
                    Guardar
                  </button>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowColorPicker((state) => !state)}
                    className="inline-flex items-center gap-2 px-2 py-1 rounded-full border"
                    aria-haspopup="true"
                    aria-expanded={showColorPicker}
                  >
                    <span
                      className="h-4 w-4 rounded-full"
                      style={{
                        background:
                          newTone === "blue"
                            ? "#bfdbfe"
                            : newTone === "yellow"
                            ? "#fef3c7"
                            : newTone === "green"
                            ? "#bbf7d0"
                            : "#fbcfe8",
                      }}
                    />
                    <Palette className="h-4 w-4 text-muted-foreground" />
                  </button>

                  {showColorPicker && (
                    <div
                      ref={colorPickerRef}
                      role="menu"
                      aria-label="Seleccionar color"
                      className="absolute left-0 mt-2 z-50 p-2 bg-background rounded-md shadow-md flex gap-2"
                    >
                      <button
                        type="button"
                        aria-label="Azul"
                        title="Azul"
                        onClick={() => {
                          setNewTone("blue")
                          setShowColorPicker(false)
                        }}
                        className="h-6 w-6 rounded-full border"
                        style={{ background: "#bfdbfe" }}
                      />
                      <button
                        type="button"
                        aria-label="Amarillo"
                        title="Amarillo"
                        onClick={() => {
                          setNewTone("yellow")
                          setShowColorPicker(false)
                        }}
                        className="h-6 w-6 rounded-full border"
                        style={{ background: "#fef3c7" }}
                      />
                      <button
                        type="button"
                        aria-label="Verde"
                        title="Verde"
                        onClick={() => {
                          setNewTone("green")
                          setShowColorPicker(false)
                        }}
                        className="h-6 w-6 rounded-full border"
                        style={{ background: "#bbf7d0" }}
                      />
                      <button
                        type="button"
                        aria-label="Rosa"
                        title="Rosa"
                        onClick={() => {
                          setNewTone("pink")
                          setShowColorPicker(false)
                        }}
                        className="h-6 w-6 rounded-full border"
                        style={{ background: "#fbcfe8" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </form>
          )}

          {notes.map((note) => (
            <article
              key={note.id}
              className={cn(
                "relative rounded-xl border p-3 shadow-sm overflow-hidden transition-shadow hover:shadow-md",
                note.tone === "blue"
                  ? "bg-blue-600/10 border-blue-200 dark:bg-blue-400/12 dark:border-transparent"
                  : note.tone === "yellow"
                  ? "bg-amber-500/10 border-amber-200 dark:bg-amber-300/12 dark:border-transparent"
                  : note.tone === "green"
                  ? "bg-green-600/10 border-green-200 dark:bg-green-400/12 dark:border-transparent"
                  : "bg-pink-600/10 border-pink-200 dark:bg-pink-400/12 dark:border-transparent"
              )}
            >
              <span
                className={cn(
                  "absolute left-0 top-0 bottom-0 rounded-l-xl z-10 transition-colors",
                  note.tone === "blue"
                    ? "bg-blue-600 dark:bg-blue-400"
                    : note.tone === "yellow"
                    ? "bg-amber-500 dark:bg-amber-300"
                    : note.tone === "green"
                    ? "bg-green-600 dark:bg-green-400"
                    : "bg-pink-600 dark:bg-pink-400"
                )}
                style={{ width: "4px" }}
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

                {expandedNoteId === note.id ? (
                  <>
                    <p className="mt-1 text-xs text-muted-foreground whitespace-pre-wrap">{note.description}</p>
                    <button
                      type="button"
                      onClick={() => setExpandedNoteId(null)}
                      className="mt-2 text-xs text-indigo-600 hover:underline"
                    >
                      Ver menos
                    </button>
                    <p className="mt-2 text-[11px] text-muted-foreground">{note.createdAt}</p>
                  </>
                ) : (
                  <>
                    <p
                      className="mt-1 text-xs text-muted-foreground"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3 as unknown as number,
                        WebkitBoxOrient: "vertical" as unknown as any,
                        overflow: "hidden",
                      }}
                    >
                      {note.description}
                    </p>
                    {note.description && note.description.length > 180 && (
                      <button
                        type="button"
                        onClick={() => setExpandedNoteId(note.id)}
                        className="mt-2 text-xs text-indigo-600 hover:underline"
                      >
                        Ver mas
                      </button>
                    )}
                    <p className="mt-2 text-[11px] text-muted-foreground">{note.createdAt}</p>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </aside>
  )
}
