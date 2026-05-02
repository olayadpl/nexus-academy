"use server"

import { AppError } from "@/src/core/error/app-error"
import { Failure } from "@/src/core/error/failures"
import { AssessmentMockDataSource } from "../../data/datasources/mock/assessment-mock.ds"
import { AssessmentRepositoryImpl } from "../../data/repositories/assessment.repository-impl"
import type { AssessmentEntity } from "../../domain/entities/assessment.entity"
import { ManageAssessmentUseCase } from "../../domain/use-cases/manage-assessment.use-case"

function createUseCases() {
  const dataSource = new AssessmentMockDataSource()
  const repository = new AssessmentRepositoryImpl(dataSource)

  return {
    manageAssessmentUseCase: new ManageAssessmentUseCase(repository),
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

export async function listUserAssessmentsAction(userId = "demo-user"): Promise<AssessmentEntity[]> {
  try {
    const { manageAssessmentUseCase } = createUseCases()
    return await manageAssessmentUseCase.getByUserId(userId)
  } catch (error) {
    mapError(error)
  }
}

export async function listCourseAssessmentsAction(courseId: string): Promise<AssessmentEntity[]> {
  try {
    const { manageAssessmentUseCase } = createUseCases()
    return await manageAssessmentUseCase.getByCourseId(courseId)
  } catch (error) {
    mapError(error)
  }
}
