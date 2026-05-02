import { ValidationFailure } from "@/src/core/error/failures"
import type { SearchQueryEntity, SearchResultEntity, SearchSort } from "../entities/search.entity"
import type { ISearchRepository } from "../repositories/search.repository"

export interface SearchPageParams {
  q?: string
  search?: string
  sort?: string
  featured?: string
}

function normalizeSort(value?: string): SearchSort {
  if (value === "recent" || value === "rating") {
    return value
  }
  return "popular"
}

export class ManageSearchUseCase {
  constructor(private readonly repository: ISearchRepository) {}

  parseQuery(params?: SearchPageParams): SearchQueryEntity {
    return {
      q: (params?.q ?? params?.search ?? "").trim(),
      sort: normalizeSort(params?.sort),
      featuredOnly: params?.featured === "1",
    }
  }

  async search(params?: SearchPageParams): Promise<SearchResultEntity[]> {
    const query = this.parseQuery(params)
    return this.repository.execute(query)
  }

  validateHistoryQuery(query: string): string {
    const normalized = query.trim()
    if (!normalized) {
      throw new ValidationFailure("query is required")
    }
    return normalized
  }
}
