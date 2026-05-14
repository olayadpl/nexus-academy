import Link from "next/link"
import Image from "next/image"
import { Folder, Calendar, ExternalLink, Bookmark } from "lucide-react"
import { listUserBookmarksAction, listUserCollectionsAction } from "../states/bookmarks.actions"
import { Card } from "@/src/core/ui/components/card"
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
import type { BookmarkEntity } from "../../domain/entities/bookmark.entity"
import type { CollectionEntity } from "../../domain/entities/collection.entity"

const getCourseImage = (courseId: string): string => {
  const match = courseId.match(/course[-_ ]?(\d+)/i) ?? courseId.match(/(\d+)$/)
  if (match) {
    const num = Math.min(parseInt(match[1], 10), 6)
    if (num >= 1 && num <= 6) return `/images/course${num}.png`
  }
  const hash = courseId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const idx = (hash % 6) + 1
  return `/images/course${idx}.png`
}

const getCourseName = (courseId: string): string => {
  const courseNames: Record<string, string> = {
    "course-communication": "Communication Skills",
    "course-study-methods": "Study Methods",
  }
  return courseNames[courseId] ?? courseId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString)
  const numberLocale = locale === "es" ? "es-ES" : "en-US"
  return date.toLocaleDateString(numberLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

interface BookmarkCardProps {
  bookmark: BookmarkEntity
  locale: string
}

function BookmarkCard({ bookmark, locale }: BookmarkCardProps) {
  return (
    <Link
      key={bookmark.id}
      href={`/resource/${bookmark.courseId}?resource=${bookmark.resourceId}`}
      className="block w-full"
    >
      <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl px-0 py-0 shadow-md hover:shadow-lg transition-all hover:text-primary gap-0 cursor-pointer">
        <div className="relative mx-2 mt-2 h-[12rem] w-[calc(100%-1rem)] shrink-0 overflow-hidden rounded-[0.875rem] bg-muted">
          <Image
            src={getCourseImage(bookmark.courseId)}
            alt={bookmark.title}
            fill
            sizes="(max-width: 768px) 100vw, 48vw"
            className="absolute inset-0 object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="text-muted-foreground flex flex-col flex-1 px-3 pb-3 pt-2">
          <div className="text-muted-foreground text-xs font-bold tracking-[0.5px] leading-4 uppercase">
            {getCourseName(bookmark.courseId)}
          </div>
          <h3 className="text-foreground mt-1 mb-2 line-clamp-2 text-lg font-semibold leading-7">
            {bookmark.title}
          </h3>

          <div className="mt-auto flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 shrink-0" />
            <span className="text-muted-foreground">{formatDate(bookmark.createdAt, locale)}</span>
            <ExternalLink className="ml-auto h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
      </Card>
    </Link>
  )
}

interface CollectionSectionProps {
  collection: CollectionEntity
  bookmarks: BookmarkEntity[]
  locale: string
}

function CollectionSection({ collection, bookmarks, locale }: CollectionSectionProps) {
  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center gap-2">
        <Folder className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">{collection.name}</h2>
        <span className="text-sm text-muted-foreground">({bookmarks.length})</span>
      </div>
      <div className="grid grid-cols-1 justify-items-center gap-6 gap-y-8 lg:grid-cols-2 xl:grid-cols-3">
        {bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} locale={locale} />
        ))}
      </div>
    </section>
  )
}

export async function BookmarksScreen() {
  const locale = await getUserLocale()
  const t = getBookmarksTranslations(locale)
  const bookmarks = await listUserBookmarksAction()
  const collections = await listUserCollectionsAction()

  const bookmarksWithoutCollection = bookmarks.filter((b) => !b.collectionId)
  const bookmarksByCollection = new Map<string, BookmarkEntity[]>()

  for (const bookmark of bookmarks) {
    if (bookmark.collectionId) {
      const existing = bookmarksByCollection.get(bookmark.collectionId) ?? []
      existing.push(bookmark)
      bookmarksByCollection.set(bookmark.collectionId, existing)
    }
  }

  const hasAnyContent = bookmarks.length > 0

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 md:py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">{t.bookmarks.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.bookmarks.subtitle}</p>
      </header>

      {!hasAnyContent ? (
        <Empty className="min-h-[25rem] rounded-2xl border border-dashed border-muted-foreground/30 bg-muted">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Bookmark className="size-6 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle>{t.bookmarks.emptyTitle}</EmptyTitle>
            <EmptyDescription>{t.bookmarks.emptyDescription}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="/explore" className="text-sm font-medium text-primary hover:underline">
              {t.bookmarks.exploreResources}
            </Link>
          </EmptyContent>
        </Empty>
      ) : (
        <>
          {collections.map((collection) => {
            const collectionBookmarks = bookmarksByCollection.get(collection.id) ?? []
            if (collectionBookmarks.length === 0) return null
            return (
              <CollectionSection
                key={collection.id}
                collection={collection}
                bookmarks={collectionBookmarks}
                locale={locale}
              />
            )
          })}

          {bookmarksWithoutCollection.length > 0 && (
            <section>
              <div className="mb-4 flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Sin carpeta</h2>
                <span className="text-sm text-muted-foreground">({bookmarksWithoutCollection.length})</span>
              </div>
              <div className="grid grid-cols-1 justify-items-center gap-6 gap-y-8 lg:grid-cols-2 xl:grid-cols-3">
                {bookmarksWithoutCollection.map((bookmark) => (
                  <BookmarkCard key={bookmark.id} bookmark={bookmark} locale={locale} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  )
}
