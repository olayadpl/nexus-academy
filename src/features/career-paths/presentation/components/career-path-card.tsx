import Link from "next/link"
import { Badge } from "@/src/core/ui/components/badge"
import { Button } from "@/src/core/ui/components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/core/ui/components/card"
import type { CareerPathEntity } from "../../domain/entities/career-path.entity"

interface CareerPathCardProps {
  path: CareerPathEntity
}

export function CareerPathCard({ path }: CareerPathCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{path.title}</CardTitle>
        <CardDescription>{path.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Nivel: {path.level}</span>
          <span>·</span>
          <span>Horas: {path.estimatedHours}</span>
          {path.featured ? (
            <>
              <span>·</span>
              <Badge variant="secondary">Destacado</Badge>
            </>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {path.milestones.slice(0, 3).map((milestone) => (
            <Badge key={milestone.id} variant="outline">
              {milestone.title}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm">
          <Link href={`/career-paths/${path.slug}`}>Ver detalle</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
