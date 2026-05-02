"use server"

import { AppError } from "@/src/core/error/app-error"
import { Failure } from "@/src/core/error/failures"
import { PreferenceMockDataSource } from "../../data/datasources/mock/preference-mock.ds"
import { PreferenceRepositoryImpl } from "../../data/repositories/preference.repository-impl"
import type { PreferenceEntity } from "../../domain/entities/preference.entity"
import { ManagePreferenceUseCase } from "../../domain/use-cases/manage-preference.use-case"

function createUseCases() {
  const dataSource = new PreferenceMockDataSource()
  const repository = new PreferenceRepositoryImpl(dataSource)

  return {
    managePreferenceUseCase: new ManagePreferenceUseCase(repository),
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

export async function getUserPreferencesAction(userId = "demo-user"): Promise<PreferenceEntity | null> {
  try {
    const { managePreferenceUseCase } = createUseCases()
    return await managePreferenceUseCase.getByUserId(userId)
  } catch (error) {
    mapError(error)
  }
}

export async function saveUserPreferencesAction(
  input: Omit<PreferenceEntity, "id" | "updatedAt"> & { id?: string; updatedAt?: string }
): Promise<PreferenceEntity> {
  try {
    const { managePreferenceUseCase } = createUseCases()
    const existing = await managePreferenceUseCase.getByUserId(input.userId)

    const now = input.updatedAt ?? new Date().toISOString()

    if (!existing) {
      return await managePreferenceUseCase.create({
        id: input.id ?? `pref-${input.userId}`,
        userId: input.userId,
        language: input.language,
        theme: input.theme,
        autoplay: input.autoplay,
        subtitlesEnabled: input.subtitlesEnabled,
        playbackRate: input.playbackRate,
        reduceMotion: input.reduceMotion,
        updatedAt: now,
      })
    }

    return await managePreferenceUseCase.update({
      id: existing.id,
      language: input.language,
      theme: input.theme,
      autoplay: input.autoplay,
      subtitlesEnabled: input.subtitlesEnabled,
      playbackRate: input.playbackRate,
      reduceMotion: input.reduceMotion,
      updatedAt: now,
    })
  } catch (error) {
    mapError(error)
  }
}
