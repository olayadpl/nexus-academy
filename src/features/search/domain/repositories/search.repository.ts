import type { SearchQueryEntity, SearchResultEntity } from "../entities/search.entity"

export interface ISearchRepository {
  execute(query: SearchQueryEntity): Promise<SearchResultEntity[]>
}
