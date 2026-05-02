import { NotFoundFailure, ValidationFailure } from "@/src/core/error/failures"
import type { PreferenceEntity } from "../entities/preference.entity"
import type {
  CreatePreferenceInput,
  IPreferenceRepository,
  UpdatePreferenceInput,
} from "../repositories/preference.repository"

function assertNonEmpty(value: string, fieldName: string) {
  if (!value.trim()) {
    throw new ValidationFailure(`${fieldName} is required`)
  }
}

function assertValidPlaybackRate(value: number) {
  const validRates = [0.75, 1, 1.25, 1.5, 2]

  if (!validRates.includes(value)) {
    throw new ValidationFailure("playbackRate is invalid")
  }
}

export class ManagePreferenceUseCase {
  constructor(private readonly repository: IPreferenceRepository) {}

  async create(input: CreatePreferenceInput): Promise<PreferenceEntity> {
    assertNonEmpty(input.id, "id")
    assertNonEmpty(input.userId, "userId")
    assertValidPlaybackRate(input.playbackRate)

    return this.repository.create(input)
  }

  async update(input: UpdatePreferenceInput): Promise<PreferenceEntity> {
    assertNonEmpty(input.id, "id")

    if (typeof input.playbackRate === "number") {
      assertValidPlaybackRate(input.playbackRate)
    }

    const existing = await this.repository.getById(input.id)
    if (!existing) {
      throw new NotFoundFailure(`Preference ${input.id} not found`)
    }

    return this.repository.update(input)
  }

  async getById(id: string): Promise<PreferenceEntity | null> {
    return this.repository.getById(id)
  }

  async getByUserId(userId: string): Promise<PreferenceEntity | null> {
    assertNonEmpty(userId, "userId")
    return this.repository.getByUserId(userId)
  }

  async getAll(): Promise<PreferenceEntity[]> {
    return this.repository.getAll()
  }

  async deleteById(id: string): Promise<void> {
    const existing = await this.repository.getById(id)
    if (!existing) {
      throw new NotFoundFailure(`Preference ${id} not found`)
    }

    await this.repository.deleteById(id)
  }
}
