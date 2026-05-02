import type { FeedItemEntity } from "../../domain/entities/feed-item.entity"
import type { IFeedRepository } from "../../domain/repositories/feed.repository"
import type { IFeedRemoteDataSource } from "../datasources/feed.remote-datasource"
import { toFeedEntity } from "../mappers/feed.mapper"

export class FeedRepositoryImpl implements IFeedRepository {
  constructor(private readonly remoteDataSource: IFeedRemoteDataSource) {}

  async listLatest(): Promise<FeedItemEntity[]> {
    const models = await this.remoteDataSource.listLatest()
    return models.map(toFeedEntity)
  }
}
