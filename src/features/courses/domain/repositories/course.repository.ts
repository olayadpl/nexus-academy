import type { CourseEntity } from "../entities/course.entity"

export interface ListCoursesQuery {
  featuredOnly?: boolean
}

export interface CreateCourseInput extends CourseEntity {}

export interface UpdateCourseInput {
  id: string
  title?: string
  description?: string
  level?: CourseEntity["level"]
  durationHours?: number
  rating?: number
  reviewCount?: number
  featured?: boolean
  progress?: number
  thumbnailUrl?: string
  authorName?: string
  authorAvatarUrl?: string
  modules?: CourseEntity["modules"]
}

export interface ICourseRepository {
  create(input: CreateCourseInput): Promise<CourseEntity>
  update(input: UpdateCourseInput): Promise<CourseEntity>
  getById(id: string): Promise<CourseEntity | null>
  getAll(query?: ListCoursesQuery): Promise<CourseEntity[]>
  deleteById(id: string): Promise<void>
}
