import Link from "next/link"
import { Folder, FolderPlus } from "lucide-react"
import { Button } from "@/src/core/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/core/ui/components/card"
import { groupBookmarksByCollection } from "../../domain/use-cases/group-bookmarks-by-collection.use-case"
import { listUserBookmarksAction } from "../states/bookmarks.actions"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/src/core/ui/components/empty"

export async function CollectionsScreen() {
  const bookmarks = await listUserBookmarksAction()
  const collections = groupBookmarksByCollection(bookmarks)

  return (
    <main className="max-w-[1144px] px-4 py-14 md:px-8">
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Mis Colecciones</h1>
        <p className="text-muted-foreground">Organiza tus recursos guardados en colecciones personalizadas</p>
      </header>

      <div className="mb-6">
        <Button disabled>
          <FolderPlus className="mr-2 h-4 w-4" />
          Nueva Coleccion
        </Button>
      </div>

      {collections.length === 0 ? (
        <Empty className="min-h-[400px] rounded-2xl border border-dashed border-muted-foreground/30 bg-muted">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Folder className="size-6 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle>No tienes colecciones</EmptyTitle>
            <EmptyDescription>Crea colecciones para organizar tus recursos guardados.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button disabled>
              <FolderPlus className="mr-2 h-4 w-4" />
              Crear primera coleccion
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <Link key={collection.id} href={`/collections/${collection.id}`}>
              <Card className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{collection.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {collection.count} {collection.count === 1 ? "recurso" : "recursos"}
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      )}
    </main>
  )
}
