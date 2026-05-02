import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"
import { Card, CardContent } from "@/src/core/ui/components/card"
import { SaveResourceButton } from "@/src/core/ui/components/save-resource-button"
import type { BriefEntity } from "../../domain/entities/brief.entity"

const getBriefImage = (index: number) => {
  const idx = (index % 3) + 1
  return `/images/brief${idx}.png`
}

type BriefCardProps = {
  brief: BriefEntity
  index: number
}

export function BriefCard({ brief, index }: BriefCardProps) {
  return (
    <Card className="group relative h-full overflow-hidden rounded-2xl gap-0 py-0">
      <Link href={`/briefs/${brief.id}`} className="block">
        <div className="relative mx-2 mt-2 h-[246px] w-[calc(100%-16px)] shrink-0 overflow-hidden rounded-[14px] bg-muted">
          <Image
            src={getBriefImage(index)}
            alt={brief.title}
            fill
            sizes="(max-width: 768px) 100vw, 48vw"
            className="absolute inset-0 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardContent className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{brief.category}</p>
          <h3 className="mt-1 line-clamp-2 text-base font-semibold transition-colors group-hover:text-primary">
            {brief.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{brief.description}</p>

          <div className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {brief.estimatedDurationMinutes} min · {brief.difficulty}
          </div>
        </CardContent>
      </Link>

      <div className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
        <SaveResourceButton resourceId={brief.id} courseId={brief.id} title={brief.title} />
      </div>
    </Card>
  )
}
