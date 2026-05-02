"use client"

import Link from "next/link"
import Image from "next/image"
import { BookOpen, Clock, Star } from "lucide-react"
import { Card } from "@/src/core/ui/components/card"
import { Badge } from "@/src/core/ui/components/badge"
import { SaveResourceButton } from "@/src/core/ui/components/save-resource-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/core/ui/components/avatar"
import { useSidebar } from "@/src/core/ui/components/sidebar"
import { cn } from "@/src/core/ui/lib/utils"
import type { CourseEntity } from "../../domain/entities/course.entity"

const getCourseImage = (index: number) => {
  const idx = (index % 3) + 1
  return `/images/course${idx}.png`
}

type CourseCardProps = {
  course: CourseEntity
  index: number
}

export function CourseCard({ course, index }: CourseCardProps) {
  const { state } = useSidebar()
  const isSidebarCollapsed = state === "collapsed"

  const levelLabels: Record<CourseEntity["level"], string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  }


  const initials = course.authorName
    ? course.authorName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? "")
      .join("")
    : "NA"

  // Example avatar URL: use provided avatar or fall back to a realistic person avatar (pravatar.cc)
  const avatarUrl = course.authorAvatarUrl ?? `https://i.pravatar.cc/128?u=${encodeURIComponent(course.authorName ?? course.id)}`;

  const resolveImageFromId = (id: string, fallbackIndex: number) => {
    const m = id.match(/course[-_ ]?(\d+)/i) ?? id.match(/(\d+)$/)
    if (m) {
      return `/images/course${m[1]}.png`
    }
    return getCourseImage(fallbackIndex)
  }

  // `thumbnailUrl` may be a string URL or a populated relation object when coming from Payload.
  const resolveThumbnail = (thumb: any) => {
    if (!thumb) return null
    if (typeof thumb === 'string') return thumb
    if (typeof thumb === 'object' && (thumb.url || thumb.filename)) return thumb.url || `/uploads/${thumb.filename}`
    return null
  }

  const courseImage = resolveThumbnail((course as any).thumbnailUrl) ?? resolveImageFromId(course.id, index)

  return (
    <Link
      href={`/courses/${course.id}`}
      className={cn(
        "block h-full w-full md:w-[343px]",
        isSidebarCollapsed && "md:w-[344px]"
      )}
    >
      <Card className="group relative flex h-full flex-col overflow-hidden rounded-[20px] px-0 py-0 shadow-md hover:shadow-lg transition-all hover:text-primary gap-1">
        <div className="relative mx-2 mt-2 h-[246px] w-[calc(100%-16px)] shrink-0 overflow-hidden rounded-[14px] bg-muted">
          <Image
            src={courseImage}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, 48vw"
            className="absolute inset-0 object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute left-4 bottom-4 z-20 flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={avatarUrl} alt={course.authorName ?? 'Author'} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            {course.authorName && (
              <div className="text-sm font-medium text-white drop-shadow">{course.authorName}</div>
            )}
          </div>
        </div>

        <div className="absolute left-4 top-4 z-10 flex w-[calc(100%-2rem)] items-center justify-end">
          <div className="ml-auto">
            <SaveResourceButton resourceId={course.id} courseId={course.id} title={course.title} />
          </div>
        </div>

        <div className="text-muted-foreground flex flex-col flex-1 px-3 pb-3 pt-2">
          <div className="flex items-start justify-between">
            <div className="flex min-w-0 flex-1 flex-col pr-12">
              <div className="text-muted-foreground text-xs font-bold tracking-[0.5px] leading-4 uppercase">Course</div>
              <h3 className="text-foreground mt-1 mb-1 line-clamp-2 text-base font-semibold leading-[26px]">{course.title}</h3>
            </div>
          </div>

          <div className="mb-2 line-clamp-2 text-[14px] leading-5 flex-1">{course.description}</div>

          <div className="mt-2 flex items-center gap-2 md:gap-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4 shrink-0" />
              <span className="truncate text-[14px] leading-5">{levelLabels[course.level]}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap text-sm leading-6">{course.durationHours}h</span>
            </div>
            <div className="ml-auto flex items-center gap-2 text-muted-foreground">
              <Star className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" />
              <span className="whitespace-nowrap text-[14px] leading-5">
                <strong className="font-bold">{course.rating}</strong> ({new Intl.NumberFormat("en-US").format(course.reviewCount)})
              </span>
            </div>
          </div>
        </div>
      </Card>
      </Link>
  )
}
