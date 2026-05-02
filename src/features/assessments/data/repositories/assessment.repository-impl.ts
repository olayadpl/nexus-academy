import type { AssessmentEntity } from "../../domain/entities/assessment.entity"
import type {
  CreateAssessmentInput,
  UpdateAssessmentInput,
} from "../../domain/repositories/assessment.repository"
import type { IAssessmentRepository } from "../../domain/repositories/assessment.repository"
import type { IAssessmentRemoteDataSource } from "../datasources/assessment.remote-datasource"
import { toAssessmentEntity, toAssessmentModel } from "../mappers/assessment.mapper"

export class AssessmentRepositoryImpl implements IAssessmentRepository {
  constructor(private readonly remoteDataSource: IAssessmentRemoteDataSource) {}

  async create(input: CreateAssessmentInput): Promise<AssessmentEntity> {
    const model = await this.remoteDataSource.create(toAssessmentModel(input))
    return toAssessmentEntity(model)
  }

  async update(input: UpdateAssessmentInput): Promise<AssessmentEntity> {
    const { id, ...patch } = input
    const model = await this.remoteDataSource.update(id, patch)
    return toAssessmentEntity(model)
  }

  async getById(id: string): Promise<AssessmentEntity | null> {
    const model = await this.remoteDataSource.getById(id)

    if (!model) {
      return null
    }

    return toAssessmentEntity(model)
  }

  async getByUserId(userId: string): Promise<AssessmentEntity[]> {
    const models = await this.remoteDataSource.getByUserId(userId)
    return models.map(toAssessmentEntity)
  }

  async getByCourseId(courseId: string): Promise<AssessmentEntity[]> {
    const models = await this.remoteDataSource.getByCourseId(courseId)
    return models.map(toAssessmentEntity)
  }

  async getAll(): Promise<AssessmentEntity[]> {
    const models = await this.remoteDataSource.getAll()
    return models.map(toAssessmentEntity)
  }

  async deleteById(id: string): Promise<void> {
    await this.remoteDataSource.deleteById(id)
  }
}
