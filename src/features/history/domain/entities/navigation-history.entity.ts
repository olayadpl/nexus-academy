export type NavigationHistoryType = "course" | "resource" | "brief" | "assessment" | "page"

export interface NavigationHistoryEntity {
  id: string
  userId: string
  url: string
  title: string
  type: NavigationHistoryType
  visitedAt: string
}