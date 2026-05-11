import type { CourseSectionEntity } from "@/src/features/courses/domain/entities/course.entity"
import type { ResourceEntity } from "../../domain/entities/resource.entity"
import { ResourceViewerClient } from "../components/resource-viewer-client"

type ResourceViewerScreenProps = {
  course: {
    id: string
    title: string
    description: string
    authorName?: string
  }
  resources: ResourceEntity[]
  initialResourceId?: string
  courseModules?: CourseSectionEntity[]
}

export function ResourceViewerScreen({ course, resources, initialResourceId, courseModules }: ResourceViewerScreenProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <ResourceViewerClient course={course} resources={resources} initialResourceId={initialResourceId} courseModules={courseModules as any} />
}
