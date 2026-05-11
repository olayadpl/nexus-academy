import Link from "next/link"
import Image from "next/image"
import { Clock, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/src/core/ui/components/card"
import { SaveResourceButton } from "@/src/core/ui/components/save-resource-button"
import type { CareerPathEntity } from "../../domain/entities/career-path.entity"

const getPathImage = (index: number) => {
  const idx = (index % 3) + 1
  return `/images/brief${idx}.png`
}

interface CareerPathCardProps {
  path: CareerPathEntity
  index: number
}

export function CareerPathCard({ path, index }: CareerPathCardProps) {
  return (
    <Card className="group relative h-full overflow-hidden rounded-2xl gap-0 py-0">
      <Link href={`/career-paths/${path.slug}`} className="block">
        <div className="relative mx-2 mt-2 h-[15.375rem] w-[calc(100%-1rem)] shrink-0 overflow-hidden rounded-[0.875rem] bg-muted">
          <Image
            src={getPathImage(index)}
            alt={path.title}
            fill
            sizes="(max-width: 768px) 100vw, 48vw"
            className="absolute inset-0 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardContent className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{path.level}</p>
          <h3 className="mt-1 line-clamp-2 text-base font-semibold transition-colors group-hover:text-primary">
            {path.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{path.description}</p>

          <div className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5" />
            {path.coursesCount} cursos
            <Clock className="ml-2 h-3.5 w-3.5" />
            {path.estimatedHours}h
          </div>
        </CardContent>
      </Link>

      <div className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
        <SaveResourceButton resourceId={path.id} courseId={path.id} title={path.title} />
      </div>
    </Card>
  )
}