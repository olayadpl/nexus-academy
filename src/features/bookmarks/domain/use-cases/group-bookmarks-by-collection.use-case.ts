import type { BookmarkEntity } from "../entities/bookmark.entity"

export interface BookmarkCollectionSummary {
  id: string
  name: string
  count: number
}

export function groupBookmarksByCollection(
  bookmarks: BookmarkEntity[]
): BookmarkCollectionSummary[] {
  const grouped = new Map<string, BookmarkCollectionSummary>()

  for (const item of bookmarks) {
    const current = grouped.get(item.courseId)

    if (current) {
      current.count += 1
      continue
    }

    grouped.set(item.courseId, {
      id: item.courseId,
      name: `Coleccion ${item.courseId}`,
      count: 1,
    })
  }

  return [...grouped.values()]
}
