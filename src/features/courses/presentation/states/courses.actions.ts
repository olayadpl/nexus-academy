"use server"

import { AppError } from "@/src/core/error/app-error"
import { Failure } from "@/src/core/error/failures"
import { CourseMockDataSource } from "../../data/datasources/mock/course-mock.ds"
import { CoursePayloadDataSource } from "../../data/datasources/payload/course-payload.ds"
import { CourseRepositoryImpl } from "../../data/repositories/course.repository-impl"
import type { CourseEntity } from "../../domain/entities/course.entity"
import { ManageCourseUseCase } from "../../domain/use-cases/manage-course.use-case"

function createUseCases() {
  const mode = process.env.DATA_SOURCE_MODE === "mock" ? "mock" : "payload"
  const dataSource = mode === "mock" ? new CourseMockDataSource() : new CoursePayloadDataSource()
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
    mapError(error)
  }
}

export async function listFeaturedCoursesAction(): Promise<CourseEntity[]> {
  try {
    const { manageCourseUseCase } = createUseCases()
    return await manageCourseUseCase.getAll({ featuredOnly: true })
  } catch (error) {
    mapError(error)
  }
}

export async function getCourseByIdAction(id: string): Promise<CourseEntity | null> {
  try {
    const { manageCourseUseCase } = createUseCases()
    return await manageCourseUseCase.getById(id)
  } catch (error) {
    mapError(error)
  }
}
