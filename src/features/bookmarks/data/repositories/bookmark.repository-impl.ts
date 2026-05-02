import type { BookmarkEntity } from "../../domain/entities/bookmark.entity"
import type {
  CreateBookmarkInput,
  UpdateBookmarkInput,
} from "../../domain/repositories/bookmark.repository"
import type { IBookmarkRepository } from "../../domain/repositories/bookmark.repository"
import type { IBookmarkRemoteDataSource } from "../datasources/bookmark.remote-datasource"
import { toBookmarkEntity, toBookmarkModel } from "../mappers/bookmark.mapper"

export class BookmarkRepositoryImpl implements IBookmarkRepository {
  constructor(private readonly remoteDataSource: IBookmarkRemoteDataSource) {}

  async create(input: CreateBookmarkInput): Promise<BookmarkEntity> {
    const model = await this.remoteDataSource.create(toBookmarkModel(input))
    return toBookmarkEntity(model)
  }

  async update(input: UpdateBookmarkInput): Promise<BookmarkEntity> {
    const { id, ...patch } = input
    const model = await this.remoteDataSource.update(id, patch)
    return toBookmarkEntity(model)
  }

  async getById(id: string): Promise<BookmarkEntity | null> {
    const model = await this.remoteDataSource.getById(id)

    if (!model) {
      return null
    }

    return toBookmarkEntity(model)
  }

  async getByUserId(userId: string): Promise<BookmarkEntity[]> {
    const models = await this.remoteDataSource.getByUserId(userId)
    return models.map(toBookmarkEntity)
  }

  async getAll(): Promise<BookmarkEntity[]> {
    const models = await this.remoteDataSource.getAll()
    return models.map(toBookmarkEntity)
  }

  async deleteById(id: string): Promise<void> {
    await this.remoteDataSource.deleteById(id)
  }
}
