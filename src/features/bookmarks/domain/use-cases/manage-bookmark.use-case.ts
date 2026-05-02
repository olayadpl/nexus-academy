import { NotFoundFailure, ValidationFailure } from "@/src/core/error/failures"
import type { BookmarkEntity } from "../entities/bookmark.entity"
import type {
  CreateBookmarkInput,
  IBookmarkRepository,
  UpdateBookmarkInput,
} from "../repositories/bookmark.repository"

function assertNonEmpty(value: string, fieldName: string) {
  if (!value.trim()) {
    throw new ValidationFailure(`${fieldName} is required`)
  }
}

export class ManageBookmarkUseCase {
  constructor(private readonly repository: IBookmarkRepository) {}

  async create(input: CreateBookmarkInput): Promise<BookmarkEntity> {
    assertNonEmpty(input.id, "id")
    assertNonEmpty(input.userId, "userId")
    assertNonEmpty(input.resourceId, "resourceId")
    assertNonEmpty(input.courseId, "courseId")
    assertNonEmpty(input.title, "title")

    return this.repository.create(input)
  }

  async update(input: UpdateBookmarkInput): Promise<BookmarkEntity> {
    assertNonEmpty(input.id, "id")

    const existing = await this.repository.getById(input.id)
    if (!existing) {
      throw new NotFoundFailure(`Bookmark ${input.id} not found`)
    }

    return this.repository.update(input)
  }

  async getById(id: string): Promise<BookmarkEntity | null> {
    return this.repository.getById(id)
  }

  async getByUserId(userId: string): Promise<BookmarkEntity[]> {
    assertNonEmpty(userId, "userId")
    return this.repository.getByUserId(userId)
  }

  async getAll(): Promise<BookmarkEntity[]> {
    return this.repository.getAll()
  }

  async deleteById(id: string): Promise<void> {
    const existing = await this.repository.getById(id)
    if (!existing) {
      throw new NotFoundFailure(`Bookmark ${id} not found`)
    }

    await this.repository.deleteById(id)
  }
}
