import type { ResourceEntity } from "../../domain/entities/resource.entity"

export type ResourceViewerClientProps = {
  course: {
    id: string
    title: string
    description: string
    authorName?: string
  }
  resources: ResourceEntity[]
  initialResourceId?: string
  courseModules?: {
    id: string
    title: string
    resources: {
      id: string
      title: string
      type: "video" | "pdf" | "form"
      youtubeUrl?: string
      videoFile?: string
      documentFile?: string
      formId?: string
      durationMinutes: number
      completed: boolean
    }[]
  }[]
}

export type ResourceLesson = {
  id: string
  title: string
  type: "video" | "pdf" | "form"
  videoUrl?: string
  documentUrl?: string
  youtubeUrl?: string
  formId?: string
  durationMinutes: number
  completed: boolean
  step: number
}

export type ResourceSection = {
  id: string
  title: string
  resources: ResourceLesson[]
}

export type ResourceCourseModel = {
  id: string
  title: string
  modules: ResourceSection[]
}