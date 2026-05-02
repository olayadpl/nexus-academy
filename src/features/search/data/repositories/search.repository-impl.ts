import type { SearchQueryEntity, SearchResultEntity } from "../../domain/entities/search.entity"
import type { ISearchRepository } from "../../domain/repositories/search.repository"
import type { ISearchRemoteDataSource } from "../datasources/search.remote-datasource"
import { toSearchEntity } from "../models/search.model"

export class SearchRepositoryImpl implements ISearchRepository {
  constructor(private readonly remoteDataSource: ISearchRemoteDataSource) {}

  async execute(query: SearchQueryEntity): Promise<SearchResultEntity[]> {
    const results = await this.remoteDataSource.search({
      q: query.q,
      sort: query.sort,
      featuredOnly: query.featuredOnly,
    })

    return results.map(toSearchEntity)
  }
}
