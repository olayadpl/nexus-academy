"use server"

import { AppError } from "@/src/core/error/app-error"
import { Failure } from "@/src/core/error/failures"
import { CareerPathMockDataSource } from "../../data/datasources/mock/career-path-mock.ds"
import { CareerPathRepositoryImpl } from "../../data/repositories/career-path.repository-impl"
import type { CareerPathEntity } from "../../domain/entities/career-path.entity"
import { ManageCareerPathUseCase } from "../../domain/use-cases/manage-career-path.use-case"

function createUseCases() {
  const dataSource = new CareerPathMockDataSource()
  const repository = new CareerPathRepositoryImpl(dataSource)

  return {
    manageCareerPathUseCase: new ManageCareerPathUseCase(repository),
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

export async function listCareerPathsAction(): Promise<CareerPathEntity[]> {
  try {
    const { manageCareerPathUseCase } = createUseCases()
    return await manageCareerPathUseCase.getAll()
  } catch (error) {
    mapError(error)
  }
}

export async function listFeaturedCareerPathsAction(): Promise<CareerPathEntity[]> {
  try {
    const { manageCareerPathUseCase } = createUseCases()
    return await manageCareerPathUseCase.getAll({ featuredOnly: true })
  } catch (error) {
    mapError(error)
  }
}

export async function getCareerPathBySlugAction(slug: string): Promise<CareerPathEntity | null> {
  try {
    const { manageCareerPathUseCase } = createUseCases()
    return await manageCareerPathUseCase.getBySlug(slug)
  } catch (error) {
    mapError(error)
  }
}

export async function getCareerPathByIdAction(id: string): Promise<CareerPathEntity | null> {
  try {
    const { manageCareerPathUseCase } = createUseCases()
    return await manageCareerPathUseCase.getById(id)
  } catch (error) {
    mapError(error)
  }
}
