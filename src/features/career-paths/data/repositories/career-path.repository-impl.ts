import type { CareerPathEntity } from "../../domain/entities/career-path.entity"
import type {
  CreateCareerPathInput,
  ICareerPathRepository,
  ListCareerPathsQuery,
  UpdateCareerPathInput,
} from "../../domain/repositories/career-path.repository"
import type { ICareerPathRemoteDataSource } from "../datasources/career-path.remote-datasource"
import {
  entityToModel,
  modelToEntity,
  updateInputToPartialModel,
} from "../mappers/career-path.mapper"

export class CareerPathRepositoryImpl implements ICareerPathRepository {
  constructor(private readonly remoteDataSource: ICareerPathRemoteDataSource) {}

  async create(input: CreateCareerPathInput): Promise<CareerPathEntity> {
    const model = await this.remoteDataSource.create(entityToModel(input))
    return modelToEntity(model)
  }

  async update(input: UpdateCareerPathInput): Promise<CareerPathEntity> {
    const model = await this.remoteDataSource.update(
      input.id,
      updateInputToPartialModel(input)
    )
    return modelToEntity(model)
  }

  async getById(id: string): Promise<CareerPathEntity | null> {
    const model = await this.remoteDataSource.getById(id)

    if (!model) {
      return null
    }

    return modelToEntity(model)
  }

  async getBySlug(slug: string): Promise<CareerPathEntity | null> {
    const model = await this.remoteDataSource.getBySlug(slug)
    if (!model) {
      return null
    }

    return modelToEntity(model)
  }

  async getAll(query?: ListCareerPathsQuery): Promise<CareerPathEntity[]> {
    const models = await this.remoteDataSource.getAll(query)
    return models.map(modelToEntity)
  }

  async deleteById(id: string): Promise<void> {
    await this.remoteDataSource.deleteById(id)
  }
}
