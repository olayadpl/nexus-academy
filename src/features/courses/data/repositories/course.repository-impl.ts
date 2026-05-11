import { Failure } from "@/src/core/error/failures"
import type { CourseEntity } from "../../domain/entities/course.entity"
import type {
  CreateCourseInput,
  ICourseRepository,
  ListCoursesQuery,
  UpdateCourseInput,
} from "../../domain/repositories/course.repository"
import type { ICourseRemoteDataSource } from "../datasources/course.remote-datasource"
import {
  entityToModel,
  modelToEntity,
  updateInputToPartialModel,
} from "../mappers/course.mapper"

export class CourseRepositoryImpl implements ICourseRepository {
  constructor(private readonly remoteDataSource: ICourseRemoteDataSource) {}

  async create(input: CreateCourseInput): Promise<CourseEntity> {
    const model = await this.remoteDataSource.create(entityToModel(input))
    return modelToEntity(model)
  }

  async update(input: UpdateCourseInput): Promise<CourseEntity> {
    const model = await this.remoteDataSource.update(
      input.id,
      updateInputToPartialModel(input)
    )
    return modelToEntity(model)
  }

  async getById(id: string): Promise<CourseEntity | null> {
    try {
      const model = await this.remoteDataSource.getById(id)
      if (!model) return null
      return modelToEntity(model)
    } catch (e) {
      if (e instanceof Failure) throw e
      console.error("CourseRepositoryImpl.getById error:", e)
      return null
    }
  }

  async getAll(query?: ListCoursesQuery): Promise<CourseEntity[]> {
    try {
      const models = await this.remoteDataSource.getAll(query)
      return models.map(modelToEntity)
    } catch (e) {
      if (e instanceof Failure) throw e
      console.error("CourseRepositoryImpl.getAll error:", e)
      return []
    }
  }

  async deleteById(id: string): Promise<void> {
    await this.remoteDataSource.deleteById(id)
  }
}
