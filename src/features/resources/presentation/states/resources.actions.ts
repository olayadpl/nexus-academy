"use server"

import { AppError } from "@/src/core/error/app-error"
import { Failure } from "@/src/core/error/failures"
import { ResourceMockDataSource } from "../../data/datasources/mock/resource-mock.ds"
import { ResourceRepositoryImpl } from "../../data/repositories/resource.repository-impl"
import type { ResourceEntity } from "../../domain/entities/resource.entity"
import { ManageResourceUseCase } from "../../domain/use-cases/manage-resource.use-case"

function createUseCases() {
  const dataSource = new ResourceMockDataSource()
  const repository = new ResourceRepositoryImpl(dataSource)

  return {
    manageResourceUseCase: new ManageResourceUseCase(repository),
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

export async function listResourcesByCourseAction(courseId: string): Promise<ResourceEntity[]> {
  try {
    const { manageResourceUseCase } = createUseCases()
    return await manageResourceUseCase.getByCourseId(courseId)
  } catch (error) {
    mapError(error)
  }
}

export async function getResourceByIdAction(id: string): Promise<ResourceEntity | null> {
  try {
    const { manageResourceUseCase } = createUseCases()
    return await manageResourceUseCase.getById(id)
  } catch (error) {
    mapError(error)
  }
}
