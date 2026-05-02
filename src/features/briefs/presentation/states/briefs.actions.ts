"use server"

import { AppError } from "@/src/core/error/app-error"
import { Failure } from "@/src/core/error/failures"
import { BriefMockDataSource } from "../../data/datasources/mock/brief-mock.ds"
import { BriefRepositoryImpl } from "../../data/repositories/brief.repository-impl"
import type { BriefEntity } from "../../domain/entities/brief.entity"
import { ManageBriefUseCase } from "../../domain/use-cases/manage-brief.use-case"

function createUseCases() {
  const dataSource = new BriefMockDataSource()
  const repository = new BriefRepositoryImpl(dataSource)

  return {
    manageBriefUseCase: new ManageBriefUseCase(repository),
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

export async function listBriefsAction(): Promise<BriefEntity[]> {
  try {
    const { manageBriefUseCase } = createUseCases()
    return await manageBriefUseCase.getAll()
  } catch (error) {
    mapError(error)
  }
}

export async function getBriefByIdAction(id: string): Promise<BriefEntity | null> {
  try {
    const { manageBriefUseCase } = createUseCases()
    return await manageBriefUseCase.getById(id)
  } catch (error) {
    mapError(error)
  }
}
