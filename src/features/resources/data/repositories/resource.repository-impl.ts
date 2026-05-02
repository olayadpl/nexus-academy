import type { ResourceEntity } from "../../domain/entities/resource.entity"
import type {
  CreateResourceInput,
  IResourceRepository,
  UpdateResourceInput,
} from "../../domain/repositories/resource.repository"
import type { IResourceRemoteDataSource } from "../datasources/resource.remote-datasource"
import {
  entityToModel,
  modelToEntity,
  updateInputToPartialModel,
} from "../mappers/resource.mapper"

export class ResourceRepositoryImpl implements IResourceRepository {
  constructor(private readonly remoteDataSource: IResourceRemoteDataSource) {}

  async create(input: CreateResourceInput): Promise<ResourceEntity> {
    const model = await this.remoteDataSource.create(entityToModel(input))
    return modelToEntity(model)
  }

  async update(input: UpdateResourceInput): Promise<ResourceEntity> {
    const model = await this.remoteDataSource.update(
      input.id,
      updateInputToPartialModel(input)
    )
    return modelToEntity(model)
  }

  async getById(id: string): Promise<ResourceEntity | null> {
    const model = await this.remoteDataSource.getById(id)

    if (!model) {
      return null
    }

    return modelToEntity(model)
  }

  async getByCourseId(courseId: string): Promise<ResourceEntity[]> {
    const models = await this.remoteDataSource.getByCourseId(courseId)
    return models.map(modelToEntity)
  }

  async getAll(): Promise<ResourceEntity[]> {
    const models = await this.remoteDataSource.getAll()
    return models.map(modelToEntity)
  }

  async deleteById(id: string): Promise<void> {
    await this.remoteDataSource.deleteById(id)
  }
}
