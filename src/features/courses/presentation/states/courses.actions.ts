"use server"

import { AppError } from "@/src/core/error/app-error"
import { Failure } from "@/src/core/error/failures"
import { CoursePayloadDataSource } from "../../data/datasources/payload/course-payload.ds"
import { CourseRepositoryImpl } from "../../data/repositories/course.repository-impl"
import type { CourseEntity } from "../../domain/entities/course.entity"
import { ManageCourseUseCase } from "../../domain/use-cases/manage-course.use-case"
import { getUserLocale } from "@/src/lib/i18n/get-locale"
import type { Locale } from "@/src/lib/i18n/translations"

function createUseCases(locale?: Locale) {
  const dataSource = new CoursePayloadDataSource(locale)
  const repository = new CourseRepositoryImpl(dataSource)

  return {
    manageCourseUseCase: new ManageCourseUseCase(repository),
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

export async function listCoursesAction(locale?: Locale): Promise<CourseEntity[]> {
  try {
    const resolvedLocale = locale ?? (await getUserLocale())
    const { manageCourseUseCase } = createUseCases(resolvedLocale)
    return await manageCourseUseCase.getAll()
  } catch (error) {
    console.error("listCoursesAction error:", error)
    return []
  }
}

export async function listFeaturedCoursesAction(locale?: Locale): Promise<CourseEntity[]> {
  try {
    const resolvedLocale = locale ?? (await getUserLocale())
    const { manageCourseUseCase } = createUseCases(resolvedLocale)
    return await manageCourseUseCase.getAll({ featuredOnly: true })
  } catch (error) {
    console.error("listFeaturedCoursesAction error:", error)
    return []
  }
}

export async function getCourseByIdAction(id: string, locale?: Locale): Promise<CourseEntity | null> {
  try {
    const resolvedLocale = locale ?? (await getUserLocale())
    const { manageCourseUseCase } = createUseCases(resolvedLocale)
    return await manageCourseUseCase.getById(id)
  } catch (error) {
    console.error("getCourseByIdAction error:", error)
    return null
  }
}
