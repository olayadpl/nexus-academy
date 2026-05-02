"use server"

import { AppError } from "@/src/core/error/app-error"
import { Failure } from "@/src/core/error/failures"
import { BookmarkMockDataSource } from "../../data/datasources/mock/bookmark-mock.ds"
import { BookmarkRepositoryImpl } from "../../data/repositories/bookmark.repository-impl"
import type { BookmarkEntity } from "../../domain/entities/bookmark.entity"
import { ManageBookmarkUseCase } from "../../domain/use-cases/manage-bookmark.use-case"

function createUseCases() {
  const dataSource = new BookmarkMockDataSource()
  const repository = new BookmarkRepositoryImpl(dataSource)

  return {
    manageBookmarkUseCase: new ManageBookmarkUseCase(repository),
  }
}

function mapError(error: unknown): never {
  if (error instanceof Failure) {
    if (error.code === "NOT_FOUND") {
      throw new AppError(404, error.code, error.message)
    }

    if (error.code === "VALIDATION") {
      throw new AppError(400, error.code, error.message)
    }
  }

  if (error instanceof AppError) {
    throw error
  }

  throw new AppError(500, "UNEXPECTED", "Unexpected error")
}

export async function listUserBookmarksAction(userId = "demo-user"): Promise<BookmarkEntity[]> {
  try {
    const { manageBookmarkUseCase } = createUseCases()
    return await manageBookmarkUseCase.getByUserId(userId)
  } catch (error) {
    mapError(error)
  }
}

export async function listRecentBookmarksAction(userId = "demo-user", limit = 3): Promise<BookmarkEntity[]> {
  try {
    const bookmarks = await listUserBookmarksAction(userId)
    return bookmarks.slice(0, limit)
  } catch (error) {
    mapError(error)
  }
}

export async function listBookmarksByCourseAction(courseId: string, userId = "demo-user"): Promise<BookmarkEntity[]> {
  try {
    const bookmarks = await listUserBookmarksAction(userId)
    return bookmarks.filter((bookmark) => bookmark.courseId === courseId)
  } catch (error) {
    mapError(error)
  }
}

export async function getBookmarkByResourceAction(resourceId: string, userId = "demo-user"): Promise<BookmarkEntity | null> {
  try {
    const bookmarks = await listUserBookmarksAction(userId)
    return bookmarks.find((bookmark) => bookmark.resourceId === resourceId) ?? null
  } catch (error) {
    mapError(error)
  }
}

interface ToggleBookmarkInput {
  resourceId: string
  courseId: string
  title: string
  userId?: string
}

export async function toggleBookmarkByResourceAction(
  input: ToggleBookmarkInput
): Promise<{ bookmarked: boolean; bookmark: BookmarkEntity | null }> {
  try {
    const { manageBookmarkUseCase } = createUseCases()
    const userId = input.userId ?? "demo-user"
    const existing = await getBookmarkByResourceAction(input.resourceId, userId)

    if (existing) {
      await manageBookmarkUseCase.deleteById(existing.id)
      return { bookmarked: false, bookmark: null }
    }

    const bookmark = await manageBookmarkUseCase.create({
      id: `bookmark-${input.resourceId}-${Date.now()}`,
      userId,
      resourceId: input.resourceId,
      courseId: input.courseId,
      title: input.title,
      createdAt: new Date().toISOString(),
    })

    return { bookmarked: true, bookmark }
  } catch (error) {
    mapError(error)
  }
}
