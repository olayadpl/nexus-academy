import type { NavigationHistoryType } from "../../domain/entities/navigation-history.entity"

export interface NavigationHistoryModel {
  id: string
  userId: string
  url: string
  title: string
  type: NavigationHistoryType
  visitedAt: string
}

export interface SearchHistoryModel {
  id: string
  userId: string
  query: string
  searchedAt: string
}