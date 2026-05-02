import type { IBookmarkRemoteDataSource } from "../bookmark.remote-datasource"
import type { BookmarkModel } from "../../models/bookmark.model"

const BOOKMARK_FIXTURES: BookmarkModel[] = [
  {
    id: "bookmark-1",
    userId: "demo-user",
    resourceId: "lesson-1",
    courseId: "course-communication",
    title: "01: Learn The Alphabets",
    createdAt: "2026-03-28T11:00:00.000Z",
  },
  {
    id: "bookmark-2",
    userId: "demo-user",
    resourceId: "study-1",
    courseId: "course-study-methods",
    title: "01: Planificacion por bloques",
    createdAt: "2026-03-29T07:30:00.000Z",
  },
  {
    id: "bookmark-3",
    userId: "demo-user",
    resourceId: "lesson-2",
    courseId: "course-communication",
    title: "02: Touch The Grass",
    createdAt: "2026-03-25T18:20:00.000Z",
  },
]

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
