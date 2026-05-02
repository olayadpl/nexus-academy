import type { BriefEntity } from "../../domain/entities/brief.entity"
import type { CreateBriefInput, IBriefRepository, UpdateBriefInput } from "../../domain/repositories/brief.repository"
import type { IBriefRemoteDataSource } from "../datasources/brief.remote-datasource"
import { toBriefEntity, toBriefModel } from "../mappers/brief.mapper"

export class BriefRepositoryImpl implements IBriefRepository {
  constructor(private readonly remoteDataSource: IBriefRemoteDataSource) {}

  async create(input: CreateBriefInput): Promise<BriefEntity> {
    const model = await this.remoteDataSource.create(toBriefModel(input))
    return toBriefEntity(model)
  }

  async update(input: UpdateBriefInput): Promise<BriefEntity> {
    const { id, ...patch } = input
    const model = await this.remoteDataSource.update(id, patch)
    return toBriefEntity(model)
  }

  async getById(id: string): Promise<BriefEntity | null> {
    const model = await this.remoteDataSource.getById(id)
    return model ? toBriefEntity(model) : null
  }

  async getAll(): Promise<BriefEntity[]> {
    const models = await this.remoteDataSource.getAll()
    return models.map(toBriefEntity)
  }

  async deleteById(id: string): Promise<void> {
    await this.remoteDataSource.deleteById(id)
  }
}
