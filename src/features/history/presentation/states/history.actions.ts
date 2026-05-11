"use server"

import { AppError } from "@/src/core/error/app-error"
import { Failure } from "@/src/core/error/failures"
import type { NavigationHistoryType } from "../../domain/entities/navigation-history.entity"
import type { NavigationHistoryEntity } from "../../domain/entities/navigation-history.entity"
import type { SearchHistoryEntity } from "../../domain/entities/search-history.entity"
import { HistoryMockDataSource } from "../../data/datasources/mock/history-mock.ds"
import { HistoryRepositoryImpl } from "../../data/repositories/history.repository-impl"
import { ManageHistoryUseCase } from "../../domain/use-cases/manage-history.use-case"

function createUseCases() {
  const dataSource = new HistoryMockDataSource()
  const repository = new HistoryRepositoryImpl(dataSource)

  return {
    manageHistoryUseCase: new ManageHistoryUseCase(repository),
  }
}

function mapError(error: unknown): never {
  if (error instanceof Failure) {
    throw new AppError(400, error.code, error.message)
  }

  if (error instanceof AppError) {
    throw error
  }

  console.error("History action error:", error)
  throw new AppError(500, "UNEXPECTED", error instanceof Error ? error.message : "Unknown error")
}

export async function listNavigationHistoryAction(userId = "demo-user"): Promise<NavigationHistoryEntity[]> {
  try {
    const { manageHistoryUseCase } = createUseCases()
    return await manageHistoryUseCase.listNavigationByUserId(userId)
  } catch (error) {
    mapError(error)
  }
}

export async function addNavigationHistoryAction(input: {
  userId?: string
  url: string
  title: string
  type: NavigationHistoryType
}): Promise<NavigationHistoryEntity> {
  try {
    const { manageHistoryUseCase } = createUseCases()
    return await manageHistoryUseCase.addNavigation({
      id: `nav-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      userId: input.userId ?? "demo-user",
      url: input.url,
      title: input.title,
      type: input.type,
      visitedAt: new Date().toISOString(),
    })
  } catch (error) {
    mapError(error)
  }
}

export async function clearNavigationHistoryAction(userId = "demo-user"): Promise<void> {
  try {
    const { manageHistoryUseCase } = createUseCases()
    await manageHistoryUseCase.clearNavigationByUserId(userId)
  } catch (error) {
    mapError(error)
  }
}

export async function listSearchHistoryAction(userId = "demo-user"): Promise<SearchHistoryEntity[]> {
  try {
    const { manageHistoryUseCase } = createUseCases()
    return await manageHistoryUseCase.listSearchesByUserId(userId)
  } catch (error) {
    mapError(error)
  }
}

export async function addSearchHistoryAction(input: {
  userId?: string
  query: string
}): Promise<SearchHistoryEntity> {
  try {
    const { manageHistoryUseCase } = createUseCases()
    return await manageHistoryUseCase.addSearch({
      id: `search-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      userId: input.userId ?? "demo-user",
      query: input.query,
      searchedAt: new Date().toISOString(),
    })
  } catch (error) {
    mapError(error)
  }
}

export async function clearSearchHistoryAction(userId = "demo-user"): Promise<void> {
  try {
    const { manageHistoryUseCase } = createUseCases()
    await manageHistoryUseCase.clearSearchesByUserId(userId)
  } catch (error) {
    mapError(error)
  }
}