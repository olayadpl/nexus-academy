import type { IHistoryRemoteDataSource } from "../history.remote-datasource"
import type { NavigationHistoryModel, SearchHistoryModel } from "../../models/history.model"

const navigationDb = new Map<string, NavigationHistoryModel[]>()
const searchDb = new Map<string, SearchHistoryModel[]>()

export class HistoryMockDataSource implements IHistoryRemoteDataSource {
  async listNavigationByUserId(userId: string): Promise<NavigationHistoryModel[]> {
    return [...(navigationDb.get(userId) ?? [])].sort(
      (a, b) => Date.parse(b.visitedAt) - Date.parse(a.visitedAt)
    )
  }

  async addNavigation(model: NavigationHistoryModel): Promise<NavigationHistoryModel> {
    const current = navigationDb.get(model.userId) ?? []
    const next = [model, ...current].slice(0, 100)
    navigationDb.set(model.userId, next)
    return model
  }

  async clearNavigationByUserId(userId: string): Promise<void> {
    navigationDb.set(userId, [])
  }

  async listSearchesByUserId(userId: string): Promise<SearchHistoryModel[]> {
    return [...(searchDb.get(userId) ?? [])].sort(
      (a, b) => Date.parse(b.searchedAt) - Date.parse(a.searchedAt)
    )
  }

  async addSearch(model: SearchHistoryModel): Promise<SearchHistoryModel> {
    const current = searchDb.get(model.userId) ?? []
    const next = [model, ...current]
      .filter((item, index, all) => all.findIndex((candidate) => candidate.query === item.query) === index)
      .slice(0, 50)
    searchDb.set(model.userId, next)
    return model
  }

  async clearSearchesByUserId(userId: string): Promise<void> {
    searchDb.set(userId, [])
  }
}