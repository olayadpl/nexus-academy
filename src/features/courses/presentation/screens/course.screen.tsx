import { notFound } from "next/navigation"
import { getCourseByIdAction } from "@/src/features/courses/presentation/states/courses.actions"
import { listResourcesByCourseAction } from "@/src/features/resources/presentation/states/resources.actions"
import type { CourseEntity } from "../../domain/entities/course.entity"
import type { ResourceEntity } from "@/src/features/resources/domain/entities/resource.entity"
import Link from "next/link"
import { BookOpen, Clock, BarChart3, Users, Star, PlayCircle, FileText, File, Award, Globe, CheckCircle2, Sparkles } from "lucide-react"
import { getTranslations } from "@/src/lib/i18n/translations"

const stripNumberPrefix = (s?: string) => (s ?? "").replace(/^\s*\d{1,2}:\s*/, "")
import CourseDescription from "../components/course-description.client"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/src/core/ui/components/accordion"
import { Separator } from "@/src/core/ui/components/separator"
import { Badge } from "@/src/core/ui/components/badge"


interface CourseScreenProps {
  params: { id: string }
}

const getResourceIcon = (type: string) => {
  switch (type) {
    case "video":
      return <PlayCircle className="h-4 w-4" />
    case "pdf":
    case "document":
      return <FileText className="h-4 w-4" />
    default:
      return <File className="h-4 w-4" />
  }
}

const formatDuration = (minutes?: number) => {
  if (!minutes) return ""
  const hrs = Math.floor(minutes / 60)
  const mins = minutes % 60
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`
}

const REQUIREMENTS = [
  "No se requiere experiencia previa",
  "Computadora con acceso a internet",
  "Ganas de aprender y practicar",
]

export default async function CourseScreen({ params }: CourseScreenProps) {
  const { id } = params
  const t = getTranslations("es")
  const course: CourseEntity | null = await getCourseByIdAction(id)

  let resources: ResourceEntity[] = []
  try {
    resources = await listResourcesByCourseAction(id)
  } catch (e) {
    resources = []
  }

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Breadcrumb & Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/courses" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <BookOpen className="h-4 w-4" />
                  {t.courses}
                </Link>
                <span className="text-muted-foreground">/</span>
                <Badge variant="secondary" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  {course.level === "beginner" ? "Principiante" : course.level === "intermediate" ? "Intermedio" : "Avanzado"}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {course.title}
              </h1>

              {/* Description */}
              <div className="max-w-3xl">
                <CourseDescription description={course.description} />
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{course.durationHours}h</p>
                    <p className="text-xs text-muted-foreground">Duración</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium capitalize">{course.level}</p>
                    <p className="text-xs text-muted-foreground">Nivel</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{course.reviewCount?.toLocaleString() ?? "—"}</p>
                    <p className="text-xs text-muted-foreground">Estudiantes</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{course.rating ?? "—"}</p>
                    <p className="text-xs text-muted-foreground">Valoración</p>
                  </div>
                </div>
              </div>

              {/* Instructor */}
              {course.authorName && (
                <div className="flex items-center gap-4 rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
                  {(() => {
                    const avatarUrl = course.authorAvatarUrl ?? `https://i.pravatar.cc/128?u=${encodeURIComponent(course.authorName ?? course.id)}`
                    return <img src={avatarUrl} alt={course.authorName} className="h-16 w-16 rounded-2xl object-cover shadow-md" />
                  })()}
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-semibold">{course.authorName}</p>
                      <Badge variant="outline" className="gap-1 text-xs">
                        <Award className="h-3 w-3" />
                        Instructor
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Experto en la materia con años de experiencia enseñando</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        <span>Español · Inglés</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="relative aspect-square overflow-hidden rounded-3xl border border-border/50 shadow-xl shadow-black/5">
                  {/* Hero Image - contained to show full image */}
                  {(() => {
                    const m = course.id.match(/course[-_ ]?(\d+)/i) ?? course.id.match(/(\d+)$/)
                    const heroImg = m ? `/images/course${m[1]}.png` : course.thumbnailUrl ?? `/images/course1.png`
                    return (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={heroImg} 
                          alt={course.title} 
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] object-contain rounded-2xl" 
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
                      </>
                    )
                  })()}

                  {/* Buttons Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="w-full space-y-2">
                      <Link href={resources && resources.length > 0 ? `/resource/${course.id}?resource=${resources[0].id}` : "#"} className="block">
                        <button className="w-full rounded-xl bg-primary px-5 py-3 text-base font-semibold text-white transition-all hover:bg-primary/90">
                          Comenzar curso
                        </button>
                      </Link>

                      <button className="w-full rounded-xl border-2 border-white/50 bg-black/30 px-5 py-3 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-black/50">
                        Vista previa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* What you'll learn */}
            <section>
              <h2 className="mb-6 text-2xl font-bold">Lo que aprenderás</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {course.modules.slice(0, 6).map((m, i) => (
                  <div key={m.id} className="flex items-start gap-3 rounded-2xl bg-muted/30 p-4 transition-colors hover:bg-muted/50">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{stripNumberPrefix(m.title)}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Content */}
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Contenido del curso</h2>
                <Badge variant="secondary">
                  {course.modules.length} módulos
                </Badge>
              </div>
              
              <div className="space-y-3">
                <Accordion type="single" collapsible className="space-y-3">
                  {course.modules.map((m, i) => (
                    <AccordionItem key={m.id} value={`module-${m.id}`} className="rounded-2xl border border-border/50 bg-card/50 overflow-hidden transition-colors hover:bg-card">
                      <AccordionTrigger className="px-6 py-5 no-underline hover:no-underline hover:bg-muted/30">
                        <div className="flex w-full items-center justify-between pr-4">
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                              {m.type === "video" ? <PlayCircle className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                            </div>
                            <div className="text-left">
                              <p className="font-semibold">Módulo {i + 1}</p>
                              <p className="text-sm text-muted-foreground">{stripNumberPrefix(m.title)}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {(() => {
                              const matched = resources.filter(r => r.id === m.id || stripNumberPrefix(r.title) === stripNumberPrefix(m.title))
                              const modDuration = matched.reduce((a, b) => a + (Number(b.durationMinutes) || 0), 0) || (m.durationMinutes ?? 0)
                              return modDuration > 0 ? (
                                <Badge variant="outline" className="text-xs">
                                  {formatDuration(modDuration)}
                                </Badge>
                              ) : null
                            })()}
                          </div>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent>
                        <div className="px-6 pb-6">
                          <Separator className="mb-4" />
                          {resources && resources.length > 0 ? (
                            <div className="space-y-1">
                              {resources.map((resource, idx) => (
                                <Link 
                                  key={resource.id} 
                                  href={`/resource/${course.id}?resource=${resource.id}`}
                                  className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-muted/50"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                      {getResourceIcon(resource.type)}
                                    </div>
                                    <div>
                                      <p className="font-medium">{stripNumberPrefix(resource.title)}</p>
                                      <p className="text-xs text-muted-foreground">{resource.durationMinutes ? formatDuration(resource.durationMinutes) : ""}</p>
                                    </div>
                                  </div>
                                  <PlayCircle className="h-5 w-5 text-muted-foreground" />
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">Contenido del módulo disponible...</p>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="mb-6 text-2xl font-bold">Requisitos</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {REQUIREMENTS.map((req) => (
                  <div key={req} className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 p-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                    </div>
                    <span className="text-sm">{req}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - What's Included */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-lg">
                <h3 className="mb-4 text-xl font-bold">{t.includes}</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{t.includedResources(Math.max(1, resources.length))}</p>
                      <p className="text-xs text-muted-foreground">Recursos</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{course.durationHours}h de contenido</p>
                      <p className="text-xs text-muted-foreground">Duración total</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{t.certificate}</p>
                      <p className="text-xs text-muted-foreground">Al finalizar</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{t.accessLifetime}</p>
                      <p className="text-xs text-muted-foreground">Acceso eterno</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}