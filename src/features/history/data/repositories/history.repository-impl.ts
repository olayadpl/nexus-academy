import type { IHistoryRepository } from "../../domain/repositories/history.repository"
import type { NavigationHistoryEntity } from "../../domain/entities/navigation-history.entity"
import type { SearchHistoryEntity } from "../../domain/entities/search-history.entity"
import type { IHistoryRemoteDataSource } from "../datasources/history.remote-datasource"
import {
  toNavigationHistoryEntity,
  toNavigationHistoryModel,
  toSearchHistoryEntity,
  toSearchHistoryModel,
} from "../mappers/history.mapper"

export class HistoryRepositoryImpl implements IHistoryRepository {
  constructor(private readonly remoteDataSource: IHistoryRemoteDataSource) {}

  async listNavigationByUserId(userId: string): Promise<NavigationHistoryEntity[]> {
    const items = await this.remoteDataSource.listNavigationByUserId(userId)
    return items.map(toNavigationHistoryEntity)
  }

  async addNavigation(entry: NavigationHistoryEntity): Promise<NavigationHistoryEntity> {
    const item = await this.remoteDataSource.addNavigation(toNavigationHistoryModel(entry))
    return toNavigationHistoryEntity(item)
  }

  async clearNavigationByUserId(userId: string): Promise<void> {
    await this.remoteDataSource.clearNavigationByUserId(userId)
  }

  async listSearchesByUserId(userId: string): Promise<SearchHistoryEntity[]> {
    const items = await this.remoteDataSource.listSearchesByUserId(userId)
    return items.map(toSearchHistoryEntity)
  }

  async addSearch(entry: SearchHistoryEntity): Promise<SearchHistoryEntity> {
    const item = await this.remoteDataSource.addSearch(toSearchHistoryModel(entry))
    return toSearchHistoryEntity(item)
  }

  async clearSearchesByUserId(userId: string): Promise<void> {
    await this.remoteDataSource.clearSearchesByUserId(userId)
  }
}