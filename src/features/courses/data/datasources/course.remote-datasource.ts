import type { CourseModel } from "../models/course.model"

export interface ICourseRemoteDataSource {
  create(model: CourseModel): Promise<CourseModel>
  update(id: string, model: Partial<CourseModel>): Promise<CourseModel>
  getById(id: string): Promise<CourseModel | null>
  getAll(query?: { featuredOnly?: boolean }): Promise<CourseModel[]>
  deleteById(id: string): Promise<void>
}

export class CourseRemoteDataSource implements ICourseRemoteDataSource {
  async create(model: CourseModel): Promise<CourseModel> {
    throw new Error(`Remote datasource not implemented for create(${model.id})`)
  }

  async update(id: string, _model: Partial<CourseModel>): Promise<CourseModel> {
    throw new Error(`Remote datasource not implemented for update(${id})`)
  }

  async getById(_id: string): Promise<CourseModel | null> {
    return null
  }

  async getAll(): Promise<CourseModel[]> {
    return []
  }

  async deleteById(id: string): Promise<void> {
    throw new Error(`Remote datasource not implemented for delete(${id})`)
  }
}
