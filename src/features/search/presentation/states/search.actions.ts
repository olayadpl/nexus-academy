"use server"

import { AppError } from "@/src/core/error/app-error"
import { Failure } from "@/src/core/error/failures"
import { addSearchHistoryAction } from "@/src/features/history/presentation/states/history.actions"
import { SearchMockDataSource } from "../../data/datasources/mock/search-mock.ds"
import { SearchRepositoryImpl } from "../../data/repositories/search.repository-impl"
import type { SearchResultEntity } from "../../domain/entities/search.entity"
import { ManageSearchUseCase, type SearchPageParams } from "../../domain/use-cases/manage-search.use-case"

function createUseCases() {
  const dataSource = new SearchMockDataSource()
  const repository = new SearchRepositoryImpl(dataSource)

  return {
    manageSearchUseCase: new ManageSearchUseCase(repository),
  }
}

function mapError(error: unknown): never {
  if (error instanceof Failure) {
    throw new AppError(400, error.code, error.message)
  }

  if (error instanceof AppError) {
    throw error
  }

  throw new AppError(500, "UNEXPECTED", "Unexpected error")
}

export async function searchResourcesAction(params?: SearchPageParams): Promise<{
  query: string
  sort: "popular" | "recent" | "rating"
  featuredOnly: boolean
  results: SearchResultEntity[]
}> {
  try {
    const { manageSearchUseCase } = createUseCases()
    const query = manageSearchUseCase.parseQuery(params)
    const results = await manageSearchUseCase.search(params)

    if (query.q) {
      await addSearchHistoryAction({ query: manageSearchUseCase.validateHistoryQuery(query.q) })
    }

    return {
      query: query.q,
      sort: query.sort,
      featuredOnly: query.featuredOnly,
      results,
    }
  } catch (error) {
    mapError(error)
  }
}
