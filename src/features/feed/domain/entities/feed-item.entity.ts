export interface FeedItemEntity {
  id: string
  title: string
  summary: string
  category: "course" | "brief" | "assessment"
  createdAt: string
}
