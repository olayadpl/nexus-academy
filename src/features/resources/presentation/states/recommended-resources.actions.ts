"use server"

import { unstable_noStore as noStore } from "next/cache"
import { AppError } from "@/src/core/error/app-error"
import { Failure } from "@/src/core/error/failures"
import { RecommendedResourcePayloadDataSource } from "../../data/datasources/payload/recommended-resource-payload.ds"
import { RecommendedResourceRepositoryImpl } from "../../data/repositories/recommended-resource.repository-impl"
import type { RecommendedResourceEntity } from "../../domain/entities/recommended-resource.entity"
import { ManageRecommendedResourceUseCase } from "../../domain/use-cases/manage-recommended-resource.use-case"

function createUseCases() {
  const dataSource = new RecommendedResourcePayloadDataSource()
  const repository = new RecommendedResourceRepositoryImpl(dataSource)

  return {
    manageRecommendedResourceUseCase: new ManageRecommendedResourceUseCase(repository),
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

export async function listRecommendedResourcesAction(): Promise<RecommendedResourceEntity[]> {
  try {
    noStore()
    const { manageRecommendedResourceUseCase } = createUseCases()
    return await manageRecommendedResourceUseCase.getAll()
  } catch (error) {
    console.error("listRecommendedResourcesAction error:", error)
    return []
  }
}
