import type { FeedItemEntity } from "../entities/feed-item.entity"

export interface IFeedRepository {
  listLatest(): Promise<FeedItemEntity[]>
}
