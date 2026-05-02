import type { BookmarkModel } from "../models/bookmark.model"

export interface IBookmarkRemoteDataSource {
  create(model: BookmarkModel): Promise<BookmarkModel>
  update(id: string, model: Partial<BookmarkModel>): Promise<BookmarkModel>
  getById(id: string): Promise<BookmarkModel | null>
  getByUserId(userId: string): Promise<BookmarkModel[]>
  getAll(): Promise<BookmarkModel[]>
  deleteById(id: string): Promise<void>
}

export class BookmarkRemoteDataSource implements IBookmarkRemoteDataSource {
  async create(model: BookmarkModel): Promise<BookmarkModel> {
    return model
  }

  async update(id: string, model: Partial<BookmarkModel>): Promise<BookmarkModel> {
    void id
    void model
    throw new Error("BookmarkRemoteDataSource.update not implemented")
  }

  async getById(id: string): Promise<BookmarkModel | null> {
    void id
    return null
  }

  async getByUserId(userId: string): Promise<BookmarkModel[]> {
    void userId
    return []
  }

  async getAll(): Promise<BookmarkModel[]> {
    return []
  }

  async deleteById(id: string): Promise<void> {
    void id
    throw new Error("BookmarkRemoteDataSource.deleteById not implemented")
  }
}
