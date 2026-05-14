import type { IBookmarkRemoteDataSource } from "../bookmark.remote-datasource"
import type { BookmarkModel } from "../../models/bookmark.model"

const BOOKMARK_FIXTURES: BookmarkModel[] = []

const mockDb = new Map<string, BookmarkModel>(BOOKMARK_FIXTURES.map((item) => [item.id, item]))

export class BookmarkMockDataSource implements IBookmarkRemoteDataSource {
  async create(model: BookmarkModel): Promise<BookmarkModel> {
    if (mockDb.has(model.id)) {
      throw new Error(`Bookmark ${model.id} already exists`)
    }

    mockDb.set(model.id, model)
    return model
  }

  async update(id: string, model: Partial<BookmarkModel>): Promise<BookmarkModel> {
    const current = mockDb.get(id)

    if (!current) {
      throw new Error(`Bookmark ${id} not found`)
    }

    const updated: BookmarkModel = {
      ...current,
      ...model,
      id: current.id,
      userId: current.userId,
      resourceId: current.resourceId,
      courseId: current.courseId,
      createdAt: current.createdAt,
    }

    mockDb.set(id, updated)
    return updated
  }

  async getById(id: string): Promise<BookmarkModel | null> {
    return mockDb.get(id) ?? null
  }

  async getByUserId(userId: string): Promise<BookmarkModel[]> {
    return [...mockDb.values()]
      .filter((item) => item.userId === userId)
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  }

  async getAll(): Promise<BookmarkModel[]> {
    return [...mockDb.values()].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  }

  async deleteById(id: string): Promise<void> {
    const deleted = mockDb.delete(id)

    if (!deleted) {
      throw new Error(`Bookmark ${id} not found`)
    }
  }
}
