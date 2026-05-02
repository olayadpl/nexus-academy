"use server"

import { AppError } from "@/src/core/error/app-error"
import { Failure } from "@/src/core/error/failures"
import { ProfileMockDataSource } from "../../data/datasources/mock/profile-mock.ds"
import { ProfileRepositoryImpl } from "../../data/repositories/profile.repository-impl"
import type { ProfileEntity } from "../../domain/entities/profile.entity"
import { ManageProfileUseCase } from "../../domain/use-cases/manage-profile.use-case"

function createUseCases() {
  const dataSource = new ProfileMockDataSource()
  const repository = new ProfileRepositoryImpl(dataSource)

  return {
    manageProfileUseCase: new ManageProfileUseCase(repository),
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

export async function getCurrentProfileAction(userId?: string): Promise<ProfileEntity> {
  try {
    const { manageProfileUseCase } = createUseCases()
    return await manageProfileUseCase.getCurrentProfile(userId)
  } catch (error) {
    mapError(error)
  }
}
