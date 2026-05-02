"use server"

import { AppError } from "@/src/core/error/app-error"
import { Failure } from "@/src/core/error/failures"
import type { CourseEntity } from "@/src/features/courses/domain/entities/course.entity"
import { listCoursesAction } from "@/src/features/courses/presentation/states/courses.actions"
import { EnrollmentMockDataSource } from "../../data/datasources/mock/enrollment-mock.ds"
import { EnrollmentRepositoryImpl } from "../../data/repositories/enrollment.repository-impl"
import type { EnrollmentEntity } from "../../domain/entities/enrollment.entity"
import { ManageEnrollmentUseCase } from "../../domain/use-cases/manage-enrollment.use-case"

export interface ContinueLearningItem {
  enrollment: EnrollmentEntity
  course: CourseEntity
}

function createUseCases() {
  const dataSource = new EnrollmentMockDataSource()
  const repository = new EnrollmentRepositoryImpl(dataSource)

  return {
    manageEnrollmentUseCase: new ManageEnrollmentUseCase(repository),
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

export async function listUserEnrollmentsAction(userId = "demo-user"): Promise<EnrollmentEntity[]> {
  try {
    const { manageEnrollmentUseCase } = createUseCases()
    return await manageEnrollmentUseCase.getByUserId(userId)
  } catch (error) {
    mapError(error)
  }
}

export async function listContinueLearningAction(userId = "demo-user"): Promise<ContinueLearningItem[]> {
  try {
    const [enrollments, courses] = await Promise.all([
      listUserEnrollmentsAction(userId),
      listCoursesAction(),
    ])

    const courseMap = new Map(courses.map((course) => [course.id, course]))

    return enrollments
      .filter((enrollment) => enrollment.status === "active")
      .map((enrollment) => {
        const course = courseMap.get(enrollment.courseId)

        if (!course) {
          return null
        }

        return {
          enrollment,
          course,
        }
      })
      .filter((item): item is ContinueLearningItem => item !== null)
      .sort((a, b) => b.enrollment.progressPercent - a.enrollment.progressPercent)
      .slice(0, 3)
  } catch (error) {
    mapError(error)
  }
}
