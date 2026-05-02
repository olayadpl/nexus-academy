"use server"

import { FeedMockDataSource } from "../../data/datasources/mock/feed-mock.ds"
import { FeedRepositoryImpl } from "../../data/repositories/feed.repository-impl"
import type { FeedItemEntity } from "../../domain/entities/feed-item.entity"
import { ManageFeedUseCase } from "../../domain/use-cases/manage-feed.use-case"

function createUseCases() {
  const dataSource = new FeedMockDataSource()
  const repository = new FeedRepositoryImpl(dataSource)

  return {
    manageFeedUseCase: new ManageFeedUseCase(repository),
  }
}

export async function listLatestFeedAction(): Promise<FeedItemEntity[]> {
  const { manageFeedUseCase } = createUseCases()
  return manageFeedUseCase.listLatest()
}
