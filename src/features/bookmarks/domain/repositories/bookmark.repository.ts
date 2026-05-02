import type { BookmarkEntity } from "../entities/bookmark.entity"

export type CreateBookmarkInput = BookmarkEntity

export interface UpdateBookmarkInput {
  id: string
  title?: string
}

export interface IBookmarkRepository {
  create(input: CreateBookmarkInput): Promise<BookmarkEntity>
  update(input: UpdateBookmarkInput): Promise<BookmarkEntity>
  getById(id: string): Promise<BookmarkEntity | null>
  getByUserId(userId: string): Promise<BookmarkEntity[]>
  getAll(): Promise<BookmarkEntity[]>
  deleteById(id: string): Promise<void>
}
