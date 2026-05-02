import { ValidationFailure } from "@/src/core/error/failures"
import type { NavigationHistoryEntity } from "../entities/navigation-history.entity"
import type { SearchHistoryEntity } from "../entities/search-history.entity"
import type { IHistoryRepository } from "../repositories/history.repository"

function assertNonEmpty(value: string, fieldName: string) {
  if (!value.trim()) {
    throw new ValidationFailure(`${fieldName} is required`)
  }
}

export class ManageHistoryUseCase {
  constructor(private readonly repository: IHistoryRepository) {}

  async listNavigationByUserId(userId: string): Promise<NavigationHistoryEntity[]> {
    assertNonEmpty(userId, "userId")
    return this.repository.listNavigationByUserId(userId)
  }

  async addNavigation(entry: NavigationHistoryEntity): Promise<NavigationHistoryEntity> {
    assertNonEmpty(entry.id, "id")
    assertNonEmpty(entry.userId, "userId")
    assertNonEmpty(entry.url, "url")
    assertNonEmpty(entry.title, "title")
    return this.repository.addNavigation(entry)
  }

  async clearNavigationByUserId(userId: string): Promise<void> {
    assertNonEmpty(userId, "userId")
    await this.repository.clearNavigationByUserId(userId)
  }

  async listSearchesByUserId(userId: string): Promise<SearchHistoryEntity[]> {
    assertNonEmpty(userId, "userId")
    return this.repository.listSearchesByUserId(userId)
  }

  async addSearch(entry: SearchHistoryEntity): Promise<SearchHistoryEntity> {
    assertNonEmpty(entry.id, "id")
    assertNonEmpty(entry.userId, "userId")
    assertNonEmpty(entry.query, "query")
    return this.repository.addSearch(entry)
  }

  async clearSearchesByUserId(userId: string): Promise<void> {
    assertNonEmpty(userId, "userId")
    await this.repository.clearSearchesByUserId(userId)
  }
}