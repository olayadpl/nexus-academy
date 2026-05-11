export type CourseLevel = "beginner" | "intermediate" | "advanced"

import type { ResourceEntity } from "@/src/features/resources/domain/entities/resource.entity"

export interface CourseSectionEntity {
  id: string
  title: string
  resources: ResourceEntity[]
}

export interface CourseEntity {
  id: string
  title: string
  description: string
  level: CourseLevel
  durationHours: number
  rating: number
  reviewCount: number
  featured: boolean
  progress?: number
  thumbnailUrl: string
  authorName?: string
  authorAvatarUrl?: string
  modules: CourseSectionEntity[]
}
