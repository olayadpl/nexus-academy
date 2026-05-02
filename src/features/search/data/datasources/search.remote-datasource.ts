import type { SearchResultModel } from "../models/search.model"

export interface SearchRemoteQuery {
  q: string
  sort: "popular" | "recent" | "rating"
  featuredOnly: boolean
}

export interface ISearchRemoteDataSource {
  search(query: SearchRemoteQuery): Promise<SearchResultModel[]>
}

export class SearchRemoteDataSource implements ISearchRemoteDataSource {
  async search(): Promise<SearchResultModel[]> {
    return []
  }
}
