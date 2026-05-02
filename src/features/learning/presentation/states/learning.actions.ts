"use server"

import { AppError } from "@/src/core/error/app-error"
import { Failure } from "@/src/core/error/failures"
import { getCurrentSessionAction } from "@/src/features/auth/presentation/states/auth.actions"
import { LearningMockDataSource } from "../../data/datasources/mock/learning-mock.ds"
import { LearningRepositoryImpl } from "../../data/repositories/learning.repository-impl"
import type { LearningHomeEntity } from "../../domain/entities/learning.entity"
import { ManageLearningUseCase } from "../../domain/use-cases/manage-learning.use-case"

function createUseCases() {
  const dataSource = new LearningMockDataSource()
  const repository = new LearningRepositoryImpl(dataSource)

  return {
    manageLearningUseCase: new ManageLearningUseCase(repository),
  }
}

function mapError(error: unknown): never {
  if (error instanceof Failure) {
    throw new AppError(400, error.code, error.message)
  }

  if (error instanceof AppError) {
    throw error
  }

  throw new AppError(500, "UNEXPECTED", "Unexpected error")
}

export async function getLearningHomeAction(): Promise<LearningHomeEntity> {
  try {
    const { manageLearningUseCase } = createUseCases()
    const [snapshot, user] = await Promise.all([
      manageLearningUseCase.getHomeSnapshot(),
      getCurrentSessionAction(),
    ])

    return {
      ...snapshot,
      greetingName: user?.name.split(/\s+/)[0] ?? snapshot.greetingName,
    }
  } catch (error) {
    mapError(error)
  }
}
