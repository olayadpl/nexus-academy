import Link from "next/link"
import { Folder } from "lucide-react"
import { listUserBookmarksAction } from "../states/bookmarks.actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/core/ui/components/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/src/core/ui/components/empty"

export async function BookmarksScreen() {
  const bookmarks = await listUserBookmarksAction()

  return (
    <main className="max-w-[71.5rem] px-4 py-14 md:px-8">
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Mis Guardados</h1>
        <p className="text-muted-foreground">Organiza tus recursos guardados en colecciones personalizadas</p>
      </header>

      {bookmarks.length === 0 ? (
        <Empty className="min-h-[25rem] rounded-2xl border border-dashed border-muted-foreground/30 bg-muted">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Folder className="size-6 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle>No tienes recursos guardados</EmptyTitle>
            <EmptyDescription>Guarda recursos desde cursos y briefs para encontrarlos rapidamente aqui.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="/explore" className="text-sm font-medium text-primary hover:underline">
              Explorar recursos
            </Link>
          </EmptyContent>
        </Empty>
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((bookmark) => (
            <Card key={bookmark.id}>
              <CardHeader>
                <CardTitle>{bookmark.title}</CardTitle>
                <CardDescription>Curso: {bookmark.courseId}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/resource/${bookmark.courseId}?resource=${bookmark.resourceId}`} className="text-sm font-medium text-primary hover:underline">
                  Abrir recurso
                </Link>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </main>
  )
}
