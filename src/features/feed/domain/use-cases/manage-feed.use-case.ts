import type { FeedItemEntity } from "../entities/feed-item.entity"
import type { IFeedRepository } from "../repositories/feed.repository"

export class ManageFeedUseCase {
  constructor(private readonly repository: IFeedRepository) {}

  async listLatest(): Promise<FeedItemEntity[]> {
    return this.repository.listLatest()
  }
}
