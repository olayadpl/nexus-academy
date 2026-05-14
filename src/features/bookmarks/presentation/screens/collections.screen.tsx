import Link from "next/link"
import { Folder, FolderPlus } from "lucide-react"
import { Button } from "@/src/core/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/core/ui/components/card"
import { groupBookmarksByCollection } from "../../domain/use-cases/group-bookmarks-by-collection.use-case"
import { listUserBookmarksAction } from "../states/bookmarks.actions"
import { getUserLocale } from "@/src/lib/i18n/get-locale"
import { getBookmarksTranslations } from "@/src/features/bookmarks/i18n/strings"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/src/core/ui/components/empty"

export async function CollectionsScreen() {
  const locale = await getUserLocale()
  const t = getBookmarksTranslations(locale)
  const bookmarks = await listUserBookmarksAction()
  const collections = groupBookmarksByCollection(bookmarks)

  return (
    <main className="max-w-[71.5rem] px-4 py-14 md:px-8">
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{t.collections.title}</h1>
        <p className="text-muted-foreground">{t.collections.subtitle}</p>
      </header>

      <div className="mb-6">
        <Button disabled>
          <FolderPlus className="mr-2 h-4 w-4" />
          {t.collections.newCollection}
        </Button>
      </div>

      {collections.length === 0 ? (
        <Empty className="min-h-[25rem] rounded-2xl border border-dashed border-muted-foreground/30 bg-muted">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Folder className="size-6 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle>{t.collections.emptyTitle}</EmptyTitle>
            <EmptyDescription>{t.collections.emptyDescription}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button disabled>
              <FolderPlus className="mr-2 h-4 w-4" />
              {t.collections.createFirst}
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
                  {t.collections.resourceCount(collection.count)}
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      )}
    </main>
  )
}
