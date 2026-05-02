import { NotFoundFailure, ValidationFailure } from "@/src/core/error/failures"
import type { BriefEntity } from "../entities/brief.entity"
import type { CreateBriefInput, IBriefRepository, UpdateBriefInput } from "../repositories/brief.repository"

function assertRequired(value: string, field: string) {
  if (!value.trim()) {
    throw new ValidationFailure(`${field} is required`)
  }
}

export class ManageBriefUseCase {
  constructor(private readonly repository: IBriefRepository) {}

  async create(input: CreateBriefInput): Promise<BriefEntity> {
    assertRequired(input.id, "id")
    assertRequired(input.title, "title")
    assertRequired(input.description, "description")
    assertRequired(input.category, "category")

    return this.repository.create(input)
  }

  async update(input: UpdateBriefInput): Promise<BriefEntity> {
    assertRequired(input.id, "id")

    const current = await this.repository.getById(input.id)
    if (!current) {
      throw new NotFoundFailure(`Brief ${input.id} not found`)
    }

    return this.repository.update(input)
  }

  async getById(id: string): Promise<BriefEntity | null> {
    assertRequired(id, "id")
    return this.repository.getById(id)
  }

  async getAll(): Promise<BriefEntity[]> {
    return this.repository.getAll()
  }

  async deleteById(id: string): Promise<void> {
    const current = await this.repository.getById(id)
    if (!current) {
      throw new NotFoundFailure(`Brief ${id} not found`)
    }

    await this.repository.deleteById(id)
  }
}
