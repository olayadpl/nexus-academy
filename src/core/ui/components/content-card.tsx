import Link from "next/link"
import Image from "next/image"
import { BookOpen, ClipboardCheck, FileText, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/src/core/ui/components/card"
import { SaveResourceButton } from "@/src/core/ui/components/save-resource-button"

function resolveThumbnail(thumb: any) {
  if (!thumb) return null
  if (typeof thumb === 'string') return thumb
  if (typeof thumb === 'object' && (thumb.url || thumb.filename)) return thumb.url || `/uploads/${thumb.filename}`
  return null
}

type ContentType = "course" | "assessment" | "brief" | "lesson"

export interface ContentCardItem {
  id: string
  title: string
  description: string
  type: ContentType
  category: string
  // may be a string url or a Payload media relation object
  thumbnailUrl?: any
  durationMinutes?: number
}

type ContentCardProps = {
  item: ContentCardItem
}

const SHARED_CARD_IMAGE = "/images/card-shared.svg"

const typeToIcon: Record<ContentType, typeof BookOpen> = {
  course: GraduationCap,
  lesson: BookOpen,
  assessment: ClipboardCheck,
  brief: FileText,
}

function getHrefByType(item: ContentCardItem): string {
  if (item.type === "course") {
    return `/resource/${item.id}`
  }

  if (item.type === "brief") {
    return `/briefs/${item.id}`
  }

  if (item.type === "assessment") {
    return "/assessments"
  }

  return "/learning"
}

export function ContentCard({ item }: ContentCardProps) {
  const Icon = typeToIcon[item.type]
  const href = getHrefByType(item)

  return (
    <Card className="group relative h-full overflow-hidden">
      <Link href={href} className="block">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={resolveThumbnail(item.thumbnailUrl) ?? SHARED_CARD_IMAGE}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardContent className="p-5">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">{item.category}</div>
          <h3 className="line-clamp-2 text-base font-semibold transition-colors group-hover:text-primary">{item.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
          {item.durationMinutes ? (
            <p className="mt-3 text-xs text-muted-foreground">{item.durationMinutes} min</p>
          ) : null}
        </CardContent>
      </Link>

      <div className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
        <SaveResourceButton resourceId={item.id} courseId={item.id} title={item.title} />
      </div>
    </Card>
  )
}
