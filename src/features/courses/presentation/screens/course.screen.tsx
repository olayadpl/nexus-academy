import { notFound } from "next/navigation"
import { getCourseByIdAction } from "@/src/features/courses/presentation/states/courses.actions"
import { listResourcesByCourseAction } from "@/src/features/resources/presentation/states/resources.actions"
import type { CourseEntity } from "../../domain/entities/course.entity"
import type { ResourceEntity } from "@/src/features/resources/domain/entities/resource.entity"
import Link from "next/link"
import { BookOpen, Clock, BarChart3, Users, Star, PlayCircle, FileText, File } from "lucide-react"
import { getTranslations } from "@/src/lib/i18n/translations"

const stripNumberPrefix = (s?: string) => (s ?? "").replace(/^\s*\d{1,2}:\s*/, "")
import CourseDescription from "../components/course-description.client"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/src/core/ui/components/accordion"
import { Separator } from "@/src/core/ui/components/separator"


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

export default async function CourseScreen({ params }: CourseScreenProps) {
  const { id } = params
  const t = getTranslations("es")
  const course: CourseEntity | null = await getCourseByIdAction(id)

  let resources: ResourceEntity[] = []
  try {
    resources = await listResourcesByCourseAction(id)
  } catch (e) {
    // Fallback to empty resources on error to avoid crashing the page
    resources = []
  }

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b bg-muted/30 relative overflow-hidden z-0">
        {/* Decorative blue gradient (top-left) */}
        <div className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-transparent opacity-25 blur-3xl -z-10" />
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <BookOpen className="h-4 w-4" />
                {t.courses}
              </div>

              <h1 className="mb-4 text-5xl font-bold">{course.title}</h1>
              <div className="mb-6">
                <CourseDescription description={course.description} />
              </div>

              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{course.durationHours ? `${course.durationHours}h` : "—"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize">{course.level}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{"— estudiantes"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating ?? "—"} ({course.reviewCount ?? 0})</span>
                </div>
              </div>

              {/* Instructor */}
              {course.authorName && (
                <div className="mt-6 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {(() => {
                    const avatarUrl = course.authorAvatarUrl ?? `https://i.pravatar.cc/128?u=${encodeURIComponent(course.authorName ?? course.id)}`
                    return <img src={avatarUrl} alt={course.authorName} className="h-14 w-14 rounded-full object-cover" />
                  })()}

                  <div>
                    <div className="font-semibold">{course.authorName}</div>
                    <div className="text-sm text-muted-foreground">Instructor</div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                {(() => {
                  const resolveImageFromId = (id: string) => {
                    const m = id.match(/course[-_ ]?(\d+)/i) ?? id.match(/(\d+)$/)
                    if (m) return `/images/course${m[1]}.png`
                    return course.thumbnailUrl ?? `/images/course1.png`
                  }
                  const heroImg = resolveImageFromId(course.id)
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={heroImg} alt={course.title} className="mb-4 aspect-video w-full rounded-lg object-cover" />
                  )
                })()}

                <div className="space-y-3">
                  <Link href={resources && resources.length > 0 ? `/resource/${course.id}?resource=${resources[0].id}` : "#"} className="block">
                    <button className="w-full rounded-md bg-primary px-4 py-3 text-white">Comenzar curso</button>
                  </Link>

                  <button className="w-full rounded-md border px-4 py-3">Vista previa</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold">Lo que aprenderás</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {course.modules.slice(0, 6).map((m, i) => (
                  <div key={m.id} className="flex items-start gap-3">
                    <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-sm">{stripNumberPrefix(m.title)}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Contenido del curso</h2>
              <div className="space-y-2">
                <Accordion type="single" collapsible className="space-y-2">
                  {course.modules.map((m, i) => (
                    <AccordionItem key={m.id} value={`module-${m.id}`} className="rounded-3xl bg-white dark:bg-slate-800 shadow-none transition-colors">
                      <AccordionTrigger className="text-base font-medium p-4 min-h-[56px] no-underline hover:no-underline">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                              {m.type === "video" ? <PlayCircle className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                            </div>
                            <div>
                              <p className="font-medium">Módulo {i + 1}: {stripNumberPrefix(m.title)}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            {(() => {
                              const matched = resources.filter(r => r.id === m.id || stripNumberPrefix(r.title) === stripNumberPrefix(m.title))
                              const modDuration = matched.reduce((a, b) => a + (Number(b.durationMinutes) || 0), 0) || (m.durationMinutes ?? 0)
                              return modDuration > 0 ? <span className="text-sm text-muted-foreground">{formatDuration(modDuration)}</span> : null
                            })()}
                          </div>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent>
                        {resources && resources.length > 0 ? (
                          <div className="space-y-2">
                            <Separator className="my-2" />
                            <div className="space-y-0">
                              {resources.map((resource, idx) => (
                                <div key={resource.id}>
                                  <div className="-mx-6">
                                    <div className="pl-[60px] pr-8 py-3 min-h-[56px] flex items-center w-full hover:bg-muted/50 hover:rounded-md transition-colors cursor-pointer">
                                      
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <div className="font-medium text-foreground truncate max-w-[calc(100%-14rem)]">{stripNumberPrefix(resource.title)}</div>
                                          <div className="flex items-center gap-3 flex-shrink-0 w-56 justify-end pr-2">
                                            <div className="text-sm text-muted-foreground">{resource.durationMinutes ? formatDuration(resource.durationMinutes) : ""}</div>
                                            <div className="h-6 w-6 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                                              {getResourceIcon(resource.type)}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {idx < resources.length - 1 && <Separator className="my-2" />}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div>Contenido del módulo...</div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Requisitos</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>No se requiere experiencia previa</li>
                <li>Computadora con acceso a internet</li>
                <li>Cuenta gratuita si aplica a la herramienta</li>
              </ul>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6 rounded-2xl border bg-card p-6">
              <div>
                <h3 className="mb-3 font-semibold">{t.includes}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ {t.includedResources(Math.max(1, resources.length))}</li>
                  <li>✓ {t.accessLifetime}</li>
                  <li>✓ {t.certificate}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
