import { CollectionDetailScreen } from "@/src/features/bookmarks/presentation/screens/collection-detail.screen"

interface CollectionDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function CollectionDetailPage({ params }: CollectionDetailPageProps) {
  const { id } = await params
  return <CollectionDetailScreen collectionId={id} backHref="/collections" backLabel="Volver a colecciones" />
}
