import { CollectionDetailScreen } from "@/src/features/bookmarks/presentation/screens/collection-detail.screen"

interface BookmarkCollectionPageProps {
  params: Promise<{ collectionId: string }>
}

export default async function BookmarkCollectionPage({ params }: BookmarkCollectionPageProps) {
  const { collectionId } = await params
  return <CollectionDetailScreen collectionId={collectionId} backHref="/bookmarks" backLabel="Volver a guardados" />
}
