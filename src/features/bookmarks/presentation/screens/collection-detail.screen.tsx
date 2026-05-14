import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/src/core/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/core/ui/components/card"
import { getUserLocale } from "@/src/lib/i18n/get-locale"
import { getBookmarksTranslations } from "@/src/features/bookmarks/i18n/strings"
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
  const locale = await getUserLocale()
  const t = getBookmarksTranslations(locale)
  const resources = await listBookmarksByCourseAction(collectionId)

  return (
    <main className="max-w-[71.5rem] px-4 py-14 md:px-8">
      <div className="mb-8">
        <Link href={backHref}>
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {backLabel}
          </Button>
        </Link>

        <h1 className="text-3xl font-bold">{t.collectionDetail.title(collectionId)}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t.collectionDetail.resourceCount(resources.length)}
        </p>
      </div>

      {resources.length === 0 ? (
        <Empty className="min-h-[25rem] rounded-2xl border border-dashed border-muted-foreground/30 bg-muted">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ArrowLeft className="size-5 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle>{t.collectionDetail.emptyTitle}</EmptyTitle>
            <EmptyDescription>{t.collectionDetail.emptyDescription}</EmptyDescription>
          </EmptyHeader>
          <Link href="/explore">
            <Button>{t.bookmarks.exploreResources}</Button>
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
                <p className="text-sm text-muted-foreground">
                  {t.bookmarks.courseLabel}: {resource.courseId}
                </p>
                <Link href={`/resource/${resource.courseId}?resource=${resource.resourceId}`}>
                  <Button size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t.collectionDetail.view}
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
