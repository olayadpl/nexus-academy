import type { EnrollmentEntity } from "../../domain/entities/enrollment.entity"
import type {
  CreateEnrollmentInput,
  UpdateEnrollmentInput,
} from "../../domain/repositories/enrollment.repository"
import type { IEnrollmentRepository } from "../../domain/repositories/enrollment.repository"
import type { IEnrollmentRemoteDataSource } from "../datasources/enrollment.remote-datasource"
import { toEnrollmentEntity, toEnrollmentModel } from "../mappers/enrollment.mapper"

export class EnrollmentRepositoryImpl implements IEnrollmentRepository {
  constructor(private readonly remoteDataSource: IEnrollmentRemoteDataSource) {}

  async create(input: CreateEnrollmentInput): Promise<EnrollmentEntity> {
    const model = await this.remoteDataSource.create(toEnrollmentModel(input))
    return toEnrollmentEntity(model)
  }

  async update(input: UpdateEnrollmentInput): Promise<EnrollmentEntity> {
    const { id, ...patch } = input
    const model = await this.remoteDataSource.update(id, patch)
    return toEnrollmentEntity(model)
  }

  async getById(id: string): Promise<EnrollmentEntity | null> {
    const model = await this.remoteDataSource.getById(id)

    if (!model) {
      return null
    }

    return toEnrollmentEntity(model)
  }

  async getByUserId(userId: string): Promise<EnrollmentEntity[]> {
    const models = await this.remoteDataSource.getByUserId(userId)
    return models.map(toEnrollmentEntity)
  }

  async getAll(): Promise<EnrollmentEntity[]> {
    const models = await this.remoteDataSource.getAll()
    return models.map(toEnrollmentEntity)
  }

  async deleteById(id: string): Promise<void> {
    await this.remoteDataSource.deleteById(id)
  }
}
