import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/src/core/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/core/ui/components/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/src/core/ui/components/empty"
import { listBookmarksByCourseAction } from "../states/bookmarks.actions"

interface CollectionDetailScreenProps {
  collectionId: string
  backHref: string
  backLabel: string
}

export async function CollectionDetailScreen({
  collectionId,
  backHref,
  backLabel,
}: CollectionDetailScreenProps) {
  const resources = await listBookmarksByCourseAction(collectionId)

  return (
    <main className="max-w-[1144px] px-4 py-14 md:px-8">
      <div className="mb-8">
        <Link href={backHref}>
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {backLabel}
          </Button>
        </Link>

        <h1 className="text-3xl font-bold">Coleccion {collectionId}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {resources.length} {resources.length === 1 ? "recurso" : "recursos"}
        </p>
      </div>

      {resources.length === 0 ? (
        <Empty className="min-h-[400px] rounded-2xl border border-dashed border-muted-foreground/30 bg-muted">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ArrowLeft className="size-5 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle>Esta coleccion esta vacia</EmptyTitle>
            <EmptyDescription>Guarda recursos desde cursos y briefs para verlos aqui.</EmptyDescription>
          </EmptyHeader>
          <Link href="/explore">
            <Button>Explorar recursos</Button>
          </Link>
        </Empty>
      ) : (
        <div className="space-y-4">
          {resources.map((resource) => (
            <Card key={resource.id}>
              <CardHeader>
                <CardTitle className="text-base">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Curso: {resource.courseId}</p>
                <Link href={`/resource/${resource.courseId}?resource=${resource.resourceId}`}>
                  <Button size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Ver
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}
