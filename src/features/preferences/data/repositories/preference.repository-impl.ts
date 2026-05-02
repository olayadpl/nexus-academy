import type { PreferenceEntity } from "../../domain/entities/preference.entity"
import type {
  CreatePreferenceInput,
  UpdatePreferenceInput,
} from "../../domain/repositories/preference.repository"
import type { IPreferenceRepository } from "../../domain/repositories/preference.repository"
import type { IPreferenceRemoteDataSource } from "../datasources/preference.remote-datasource"
import { toPreferenceEntity, toPreferenceModel } from "../mappers/preference.mapper"

export class PreferenceRepositoryImpl implements IPreferenceRepository {
  constructor(private readonly remoteDataSource: IPreferenceRemoteDataSource) {}

  async create(input: CreatePreferenceInput): Promise<PreferenceEntity> {
    const model = await this.remoteDataSource.create(toPreferenceModel(input))
    return toPreferenceEntity(model)
  }

  async update(input: UpdatePreferenceInput): Promise<PreferenceEntity> {
    const { id, ...patch } = input
    const model = await this.remoteDataSource.update(id, patch)
    return toPreferenceEntity(model)
  }

  async getById(id: string): Promise<PreferenceEntity | null> {
    const model = await this.remoteDataSource.getById(id)

    if (!model) {
      return null
    }

    return toPreferenceEntity(model)
  }

  async getByUserId(userId: string): Promise<PreferenceEntity | null> {
    const model = await this.remoteDataSource.getByUserId(userId)

    if (!model) {
      return null
    }

    return toPreferenceEntity(model)
  }

  async getAll(): Promise<PreferenceEntity[]> {
    const models = await this.remoteDataSource.getAll()
    return models.map(toPreferenceEntity)
  }

  async deleteById(id: string): Promise<void> {
    await this.remoteDataSource.deleteById(id)
  }
}
