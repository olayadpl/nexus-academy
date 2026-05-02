"use server"

import { AppError } from "@/src/core/error/app-error"
import { Failure } from "@/src/core/error/failures"
import { AuthMockDataSource } from "../../data/datasources/mock/auth-mock.ds"
import { UserRepositoryImpl } from "../../data/repositories/user.repository-impl"
import type { UserEntity } from "../../domain/entities/user.entity"
import { GetCurrentSessionUseCase } from "../../domain/use-cases/get-current-session.use-case"
import { ManageAuthUseCase } from "../../domain/use-cases/manage-auth.use-case"

function createUseCases() {
  const dataSource = new AuthMockDataSource()
  const repository = new UserRepositoryImpl(dataSource)

  return {
    getCurrentSessionUseCase: new GetCurrentSessionUseCase(repository),
    manageAuthUseCase: new ManageAuthUseCase(repository),
  }
}

function mapError(error: unknown): never {
  if (error instanceof Failure) {
    if (error.code === "UNAUTHORIZED") {
      throw new AppError(401, error.code, error.message)
    }
  }

  if (error instanceof AppError) {
    throw error
  }

  throw new AppError(500, "UNEXPECTED", "Unexpected error")
}

export async function getCurrentSessionAction(): Promise<UserEntity | null> {
  try {
    const { getCurrentSessionUseCase } = createUseCases()
    return await getCurrentSessionUseCase.execute()
  } catch (error) {
    mapError(error)
  }
}

export async function requireAuthenticatedUserAction(): Promise<UserEntity> {
  try {
    const { getCurrentSessionUseCase } = createUseCases()
    return await getCurrentSessionUseCase.requireAuthenticatedUser()
  } catch (error) {
    mapError(error)
  }
}

interface LoginInput {
  email: string
  password: string
}

interface SignupInput {
  name: string
  email: string
  password: string
}

export async function loginAction(input: LoginInput): Promise<UserEntity> {
  try {
    const { manageAuthUseCase } = createUseCases()
    return await manageAuthUseCase.login(input)
  } catch (error) {
    mapError(error)
  }
}

export async function signupAction(input: SignupInput): Promise<UserEntity> {
  try {
    const { manageAuthUseCase } = createUseCases()
    return await manageAuthUseCase.signup(input)
  } catch (error) {
    mapError(error)
  }
}

export async function logoutAction(): Promise<void> {
  try {
    const { manageAuthUseCase } = createUseCases()
    await manageAuthUseCase.logout()
  } catch (error) {
    mapError(error)
  }
}
