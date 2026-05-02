import type { NavigationHistoryEntity } from "../entities/navigation-history.entity"
import type { SearchHistoryEntity } from "../entities/search-history.entity"

export interface IHistoryRepository {
  listNavigationByUserId(userId: string): Promise<NavigationHistoryEntity[]>
  addNavigation(entry: NavigationHistoryEntity): Promise<NavigationHistoryEntity>
  clearNavigationByUserId(userId: string): Promise<void>
  listSearchesByUserId(userId: string): Promise<SearchHistoryEntity[]>
  addSearch(entry: SearchHistoryEntity): Promise<SearchHistoryEntity>
  clearSearchesByUserId(userId: string): Promise<void>
}