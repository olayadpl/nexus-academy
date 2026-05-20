"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/core/ui/components/accordion"
import { cn } from "@/src/core/ui/lib/utils"
import type { ResourceCourseModel } from "./resource-viewer.types"

type SidebarModulesProps = {
  course: ResourceCourseModel
  activeLessonId: string
  onSelectLesson: (id: string) => void
}

export function SidebarModules({ course, activeLessonId, onSelectLesson }: SidebarModulesProps) {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <Accordion type="single" collapsible defaultValue={course.modules[0]?.id} className="space-y-3">
        {course.modules.map((section, sectionIndex) => (
          <AccordionItem key={section.id} value={section.id} className="rounded-2xl border border-border/50 bg-card/50 overflow-hidden">
            <AccordionTrigger className="px-4 py-3 no-underline hover:no-underline hover:bg-muted/30">
              <div className="flex w-full items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-sm">Modulo {sectionIndex + 1}</p>
                  <p className="text-xs text-muted-foreground">
                    {section.resources.length} lecciones · {section.resources.reduce((a, b) => a + b.durationMinutes, 0)} min
                  </p>
                </div>
                {section.resources.length > 0 && (
                  <div className="mr-2 flex items-center gap-2">
                    <div className="h-1.5 w-12 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${Math.round(
                            (section.resources.filter((lesson) => lesson.completed).length / section.resources.length) * 100
                          )}%`,
                        }}
                      />
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
                      <div
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
                          lesson.completed
                            ? "bg-green-500 text-white"
                            : isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {lesson.completed ? (
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          lesson.step
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={cn("text-sm font-medium truncate", lesson.completed && "text-muted-foreground")}>{lesson.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{lesson.type === "video" ? "Video" : "PDF"}</span>
                          <span>·</span>
                          <span>{lesson.durationMinutes} min</span>
                        </div>
                      </div>

                      <div
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-md",
                          lesson.type === "video" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        )}
                      >
                        {lesson.type === "video" ? (
                          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        ) : (
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
