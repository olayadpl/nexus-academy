import type { ResourceEntity } from "../../domain/entities/resource.entity"
import { ResourceViewerClient } from "../components/resource-viewer-client"

type ResourceViewerScreenProps = {
  course: {
    id: string
    title: string
    description: string
    authorName?: string
    bibliographicBase: string
  }
  resources: ResourceEntity[]
  initialResourceId?: string
}

export function ResourceViewerScreen({ course, resources, initialResourceId }: ResourceViewerScreenProps) {
  return <ResourceViewerClient course={course} resources={resources} initialResourceId={initialResourceId} />
}
