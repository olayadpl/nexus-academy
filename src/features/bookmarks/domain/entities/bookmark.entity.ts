export interface BookmarkEntity {
  id: string
  userId: string
  resourceId: string
  courseId: string
  title: string
  createdAt: string
  collectionId?: string | null
}
