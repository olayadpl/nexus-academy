import { CollectionDetailScreen } from "@/src/features/bookmarks/presentation/screens/collection-detail.screen"
import { getUserLocale } from "@/src/lib/i18n/get-locale"
import { getBookmarksTranslations } from "@/src/features/bookmarks/i18n/strings"

interface BookmarkCollectionPageProps {
  params: Promise<{ collectionId: string }>
}

export default async function BookmarkCollectionPage({ params }: BookmarkCollectionPageProps) {
  const { collectionId } = await params
  const locale = await getUserLocale()
  const t = getBookmarksTranslations(locale)

  return (
    <CollectionDetailScreen
      collectionId={collectionId}
      backHref="/bookmarks"
      backLabel={t.collectionDetail.backToBookmarks}
    />
  )
}
