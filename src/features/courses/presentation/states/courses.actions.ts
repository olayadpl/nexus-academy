"use server"

import { AppError } from "@/src/core/error/app-error"
import { Failure } from "@/src/core/error/failures"
import { CourseMockDataSource } from "../../data/datasources/mock/course-mock.ds"
import { CourseRepositoryImpl } from "../../data/repositories/course.repository-impl"
import type { CourseEntity } from "../../domain/entities/course.entity"
import { ManageCourseUseCase } from "../../domain/use-cases/manage-course.use-case"

function createUseCases() {
  const dataSource = new CourseMockDataSource()
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

export async function listCoursesAction(): Promise<CourseEntity[]> {
  try {
    const { manageCourseUseCase } = createUseCases()
    return await manageCourseUseCase.getAll()
  } catch (error) {
    console.error("listCoursesAction error:", error)
    return []
  }
}

export async function listFeaturedCoursesAction(): Promise<CourseEntity[]> {
  try {
    const { manageCourseUseCase } = createUseCases()
    return await manageCourseUseCase.getAll({ featuredOnly: true })
  } catch (error) {
    console.error("listFeaturedCoursesAction error:", error)
    return []
  }
}

export async function getCourseByIdAction(id: string): Promise<CourseEntity | null> {
  try {
    const { manageCourseUseCase } = createUseCases()
    return await manageCourseUseCase.getById(id)
  } catch (error) {
    console.error("getCourseByIdAction error:", error)
    return null
  }
}
