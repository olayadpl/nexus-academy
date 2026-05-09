import type { IResourceRemoteDataSource } from "../resource.remote-datasource"
import type { ResourceModel } from "../../models/resource.model"

const RESOURCE_FIXTURES: ResourceModel[] = [
  {
    id: "lesson-1",
    courseId: "course-communication",
    title: "01: Cómo usar Claude Code",
    type: "video",
    resourceUrl: "https://youtu.be/AMETVhjmOZ8?si=dvXWykCH5zsoXNvp",
    durationMinutes: 5,
    completed: true,
    order: 1,
  },

  {
    id: "lesson-2",
    courseId: "course-communication",
    title: "02: How to Design a Portfolio",
    type: "video",
    resourceUrl: "https://youtu.be/2qap-FCk9zU?si=w6VM0oc9KrEKIKpq",
    durationMinutes: 10,
    completed: true,
    order: 2,
  },

  {
    id: "lesson-3",
    courseId: "course-communication",
    title: "03: Practice, Practice, Practice",
    type: "video",
    resourceUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    durationMinutes: 12,
    completed: false,
    order: 3,
  },

  {
    id: "lesson-4",
    courseId: "course-communication",
    title: "04: Advanced Techniques",
    type: "video",
    resourceUrl: "https://youtu.be/test4",
    durationMinutes: 15,
    completed: false,
    order: 4,
  },

  {
    id: "lesson-5",
    courseId: "course-communication",
    title: "05: Building Projects",
    type: "video",
    resourceUrl: "https://youtu.be/test5",
    durationMinutes: 20,
    completed: false,
    order: 5,
  },

  {
    id: "lesson-6",
    courseId: "course-communication",
    title: "06: Final Project",
    type: "video",
    resourceUrl: "https://youtu.be/test6",
    durationMinutes: 25,
    completed: false,
    order: 6,
  },

  {
    id: "lesson-7",
    courseId: "course-communication",
    title: "07: Deployment Guide",
    type: "pdf",
    resourceUrl: "https://example.com/deployment.pdf",
    durationMinutes: 30,
    completed: false,
    order: 7,
  },

  {
    id: "lesson-8",
    courseId: "course-communication",
    title: "08: Best Practices",
    type: "pdf",
    resourceUrl: "https://example.com/best-practices.pdf",
    durationMinutes: 18,
    completed: false,
    order: 8,
  },

  {
    id: "lesson-9",
    courseId: "course-communication",
    title: "09: Certification Exam",
    type: "video",
    resourceUrl: "https://youtu.be/test9",
    durationMinutes: 45,
    completed: false,
    order: 9,
  },

  {
    id: "study-1",
    courseId: "course-study-methods",
    title: "01: Planificacion por bloques",
    type: "video",
    resourceUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    durationMinutes: 42,
    completed: false,
    order: 1,
  },
  {
    id: "study-2",
    courseId: "course-study-methods",
    title: "02: Active recall (articulo)",
    type: "article",
    resourceUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    durationMinutes: 36,
    completed: false,
    order: 2,
  },
]

const mockDb = new Map<string, ResourceModel>(RESOURCE_FIXTURES.map((item) => [item.id, item]))

export class ResourceMockDataSource implements IResourceRemoteDataSource {
  async create(model: ResourceModel): Promise<ResourceModel> {
    if (mockDb.has(model.id)) {
      throw new Error(`Resource ${model.id} already exists`)
    }

    mockDb.set(model.id, model)
    return model
  }

  async update(id: string, model: Partial<ResourceModel>): Promise<ResourceModel> {
    const current = mockDb.get(id)

    if (!current) {
      throw new Error(`Resource ${id} not found`)
    }

    const updated: ResourceModel = {
      ...current,
      ...model,
      id: current.id,
      courseId: current.courseId,
    }

    mockDb.set(id, updated)
    return updated
  }

  async getById(id: string): Promise<ResourceModel | null> {
    return mockDb.get(id) ?? null
  }

  async getByCourseId(courseId: string): Promise<ResourceModel[]> {
    return [...mockDb.values()]
      .filter((item) => item.courseId === courseId)
      .sort((a, b) => a.order - b.order)
  }

  async getAll(): Promise<ResourceModel[]> {
    return [...mockDb.values()].sort((a, b) => {
      if (a.courseId === b.courseId) {
        return a.order - b.order
      }

      return a.courseId.localeCompare(b.courseId)
    })
  }

  async deleteById(id: string): Promise<void> {
    const deleted = mockDb.delete(id)

    if (!deleted) {
      throw new Error(`Resource ${id} not found`)
    }
  }
}
