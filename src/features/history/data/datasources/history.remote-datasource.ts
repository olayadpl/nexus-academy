import type { NavigationHistoryModel, SearchHistoryModel } from "../models/history.model"

export interface IHistoryRemoteDataSource {
  listNavigationByUserId(userId: string): Promise<NavigationHistoryModel[]>
  addNavigation(model: NavigationHistoryModel): Promise<NavigationHistoryModel>
  clearNavigationByUserId(userId: string): Promise<void>
  listSearchesByUserId(userId: string): Promise<SearchHistoryModel[]>
  addSearch(model: SearchHistoryModel): Promise<SearchHistoryModel>
  clearSearchesByUserId(userId: string): Promise<void>
}

export class HistoryRemoteDataSource implements IHistoryRemoteDataSource {
  async listNavigationByUserId(userId: string): Promise<NavigationHistoryModel[]> {
    void userId
    return []
  }

  async addNavigation(model: NavigationHistoryModel): Promise<NavigationHistoryModel> {
    return model
  }

  async clearNavigationByUserId(userId: string): Promise<void> {
    void userId
  }

  async listSearchesByUserId(userId: string): Promise<SearchHistoryModel[]> {
    void userId
    return []
  }

  async addSearch(model: SearchHistoryModel): Promise<SearchHistoryModel> {
    return model
  }

  async clearSearchesByUserId(userId: string): Promise<void> {
    void userId
  }
}