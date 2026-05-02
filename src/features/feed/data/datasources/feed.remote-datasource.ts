import type { FeedItemModel } from "../models/feed-item.model"

export interface IFeedRemoteDataSource {
  listLatest(): Promise<FeedItemModel[]>
}

export class FeedRemoteDataSource implements IFeedRemoteDataSource {
  async listLatest(): Promise<FeedItemModel[]> {
    return []
  }
}
