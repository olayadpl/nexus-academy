"use client"

import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { BookmarkCheck, Download, Share2, Bookmark, ThumbsDown, ThumbsUp, Play, Trash2, Star, Clock, X, NotebookPen, Plus } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/src/core/ui/components/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/core/ui/components/tabs"
import { Textarea } from "@/src/core/ui/components/textarea"
import { Badge } from "@/src/core/ui/components/badge"
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

type LearningNoteItem = {
  id: number
  timestamp: string
  text: string
  createdAt: string
}

const LEARNING_NOTES_SEED: LearningNoteItem[] = [
  { id: 1, timestamp: "2:14", text: "Key point: eye contact should be held for 3-5 seconds max before breaking naturally.", createdAt: "Yesterday" },
  { id: 2, timestamp: "7:42", text: "Open body language formula: uncrossed arms and a slight forward lean.", createdAt: "Yesterday" },
]

const LEARNING_RELATED_VIDEOS = [
  { id: 1, title: "The Science of First Impressions", instructor: "Dr. Mark Elliot", duration: "45 min", rating: "4.8", students: "98,402", thumbnail: "/images/related-1.jpg", badge: "Popular" },
  { id: 2, title: "Public Speaking Mastery: Zero to Hero", instructor: "Sarah Connors", duration: "2.1h", rating: "4.7", students: "210,115", thumbnail: "/images/related-2.jpg", badge: "Bestseller" },
]

const LEARNING_DESCRIPTION_PARAGRAPHS = [
  "In this comprehensive course, you will unlock the secrets of effortless communication in real situations.",
  "You will practice body language fundamentals and rapport techniques to keep conversations natural.",
]

const LEARNING_WHAT_YOU_WILL_LEARN = [
  "Master confident eye contact and open body language",
  "Eliminate filler words and awkward pauses",
]

const LEARNING_REQUIREMENTS = ["No prior experience needed", "A willingness to practice with real people"]

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

export default function LearningStyleCourseMain({
  course,
  activeLesson,
  onSaveNote,
}: {
  course: ResourceCourseModel
  activeLesson: ResourceLesson | null
  onSaveNote: () => void
}) {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [showPiPMode, setShowPiPMode] = useState(false)
  const [pipDismissed, setPipDismissed] = useState(false)
  const [zoom, setZoom] = useState(100)
  const videoRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLElement>(null)
  const activeResourceUrl = activeLesson?.resourceUrl ?? "/images/course-thumbnail.jpg"
  const activeResourceLabel = activeLesson?.type === "pdf" ? "PDF preview" : "Course video"
  const activeYouTubeEmbedUrl = activeLesson?.type === "video" ? toYouTubeEmbedUrl(activeResourceUrl) : null

  const handleScroll = useCallback(() => {
    if (!videoRef.current || !scrollRef.current) return
    const scrollTop = scrollRef.current.scrollTop
    const videoBottom = videoRef.current.offsetTop + videoRef.current.offsetHeight
    const isOutOfView = scrollTop > videoBottom
    setShowPiPMode(isOutOfView && !pipDismissed)
  }, [pipDismissed])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const dismissPiP = () => {
    setPipDismissed(true)
    setShowPiPMode(false)
  }

  useEffect(() => {
    if (!pipDismissed) return
    const el = scrollRef.current
    if (!el) return
    const check = () => {
      if (!videoRef.current) return
      const scrollTop = el.scrollTop
      const videoBottom = videoRef.current.offsetTop + videoRef.current.offsetHeight
      if (scrollTop <= videoBottom) {
        setPipDismissed(false)
      }
    }
    el.addEventListener("scroll", check, { passive: true })
    return () => el.removeEventListener("scroll", check)
  }, [pipDismissed])

  return (
    <main ref={scrollRef} className="flex-1 h-full min-w-0 overflow-y-auto bg-background transition-all duration-200">
      <div className="px-6 py-4 max-w-4xl">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/courses">Cursos</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href={`/courses/${course.id}`}>{course.title}</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbPage className="truncate">{activeLesson ? activeLesson.title : "Contenido del curso"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl font-bold text-foreground mb-4 text-balance">{activeLesson ? activeLesson.title : course.title}</h1>

        {activeLesson?.type === "pdf" ? (
          <section className="mb-5 overflow-hidden rounded-xl border bg-card">
            <div className="flex items-center justify-between border-b bg-muted/50 px-3 py-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-md px-2 py-1 text-xs hover:bg-background"
                  onClick={() => setZoom((value) => Math.max(50, value - 10))}
                >
                  -
                </button>
                <span className="min-w-12 text-center text-xs font-medium">{zoom}%</span>
                <button
                  type="button"
                  className="rounded-md px-2 py-1 text-xs hover:bg-background"
                  onClick={() => setZoom((value) => Math.min(200, value + 10))}
                >
                  +
                </button>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" aria-label="Pantalla completa">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Compartir documento">
                  <BookmarkCheck className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Descargar documento">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-8 sm:p-10">
              <h3 className="mb-3 text-lg font-semibold">{activeLesson.title}</h3>
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Este es el modo de lectura del documento. Aqui se presenta el contenido con jerarquia clara,
                  espaciado amplio y una interfaz enfocada en lectura.
                </p>
                <p>
                  Puedes usar los controles superiores para ajustar zoom, compartir o descargar el recurso.
                </p>
                <p>
                  Si el contenido real del PDF esta disponible, este bloque puede sustituirse por un render del
                  documento embebido.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <>
            <div ref={videoRef} className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
              {activeYouTubeEmbedUrl ? (
                <iframe
                  src={activeYouTubeEmbedUrl}
                  title={activeResourceLabel}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video className="h-full w-full" controls src={activeResourceUrl}>
                  Tu navegador no soporta la reproduccion de video.
                </video>
              )}
            </div>

            <div className="mb-5 flex items-center justify-between rounded-b-xl border border-border border-t-0 bg-card px-3 py-2.5">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSaveNote}
                  className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  <BookmarkCheck className="h-3.5 w-3.5" />
                  Save Note
                </Button>
                <Button variant="ghost" size="sm" className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground">
                  <Download className="h-3.5 w-3.5" />
                  Download
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setLiked(!liked)
                    if (!liked) setDisliked(false)
                  }}
                  className={cn("h-8 w-8 rounded-full", liked ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}
                >
                  <ThumbsUp className={cn("h-4 w-4", liked && "fill-primary")} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setDisliked(!disliked)
                    if (!disliked) setLiked(false)
                  }}
                  className={cn(
                    "h-8 w-8 rounded-full",
                    disliked ? "bg-destructive/10 text-destructive" : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <ThumbsDown className={cn("h-4 w-4", disliked && "fill-destructive")} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setBookmarked(!bookmarked)}
                  className={cn(
                    "h-8 w-8 rounded-full",
                    bookmarked ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <Bookmark className={cn("h-4 w-4", bookmarked && "fill-primary")} />
                </Button>
              </div>
            </div>
          </>
        )}

        <Tabs defaultValue="description" className="mb-8">
          <TabsList className="mb-4 h-9 bg-muted/50 border border-border">
            <TabsTrigger value="description" className="text-xs gap-1">
              <BookmarkCheck className="h-3.5 w-3.5" />
              Description
            </TabsTrigger>
            <TabsTrigger value="transcript" className="text-xs gap-1">
              <NotebookPen className="h-3.5 w-3.5" />
              Transcript
            </TabsTrigger>

          </TabsList>

          <TabsContent value="description" className="space-y-4 mt-0">
            <div className="space-y-3 text-sm text-foreground">
              {LEARNING_DESCRIPTION_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <h3 className="font-semibold mt-4">What you will learn</h3>
              <ul className="space-y-2 text-muted-foreground">
                {LEARNING_WHAT_YOU_WILL_LEARN.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <h3 className="font-semibold mt-4">Requirements</h3>
              <ul className="space-y-2 text-muted-foreground">
                {LEARNING_REQUIREMENTS.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>



          <TabsContent value="transcript" className="mt-0">
            <div className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
              {activeLesson?.type === "video"
                ? "Transcripcion automatica del video. Aqui apareceran los segmentos con tiempo y texto."
                : "El recurso actual es un documento. Puedes hacer preguntas en el panel de Asistente IA."}
            </div>
          </TabsContent>
        </Tabs>

        {activeLesson?.type === "video" && (
          <section className="pb-10 mt-10 pt-8 border-t border-border">
            <h2 className="text-lg font-semibold text-foreground mb-5">Videos Recomendados</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {LEARNING_RELATED_VIDEOS.map((video) => (
                <div
                  key={video.id}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {video.badge && <Badge className="absolute top-2 left-2 text-[10px]">{video.badge}</Badge>}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="h-10 w-10 rounded-full bg-[#1e3a5f]/80 dark:bg-[#3b6db5]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="text-sm font-semibold text-foreground line-clamp-2">{video.title}</p>
                    <p className="text-xs text-muted-foreground">{video.instructor}</p>
                    <div className="flex items-center gap-2 pt-1 text-[11px]">
                      <span className="flex items-center gap-1 text-[#f59e0b]">
                        <Star className="h-3 w-3 fill-[#f59e0b]" />
                        {video.rating}
                      </span>
                      <span className="text-muted-foreground">{video.students}</span>
                      <span className="ml-auto flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {video.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {showPiPMode && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl overflow-hidden shadow-2xl border-2 border-border animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="relative w-72 sm:w-80" style={{ aspectRatio: "16/9" }}>
            {activeYouTubeEmbedUrl ? (
              <iframe
                src={activeYouTubeEmbedUrl}
                title="Video PiP"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video className="h-full w-full" controls src={activeResourceUrl} />
            )}
            <button
              onClick={dismissPiP}
              className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors z-10"
            >
              <X className="h-3.5 w-3.5 text-white" />
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
