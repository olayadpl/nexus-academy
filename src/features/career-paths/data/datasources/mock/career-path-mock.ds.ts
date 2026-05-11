import type { ICareerPathRemoteDataSource } from "../career-path.remote-datasource"
import type { CareerPathModel } from "../../models/career-path.model"

const CAREER_PATH_FIXTURES: CareerPathModel[] = [
  {
    id: "career-path-frontend",
    slug: "frontend-engineer",
    title: "Frontend Engineer",
    description: "Ruta para dominar UI moderna, arquitectura y despliegue frontend.",
    featured: true,
    estimatedHours: 60,
    coursesCount: 3,
    level: "beginner",
    milestones: [
      {
        id: "fp-m1",
        title: "Fundamentos web",
        courseIds: ["course-communication", "course-study-methods"],
        order: 1,
      },
      {
        id: "fp-m2",
        title: "Interfaces escalables",
        courseIds: ["course-study-methods"],
        order: 2,
      },
    ],
  },
  {
    id: "career-path-learning-designer",
    slug: "learning-designer",
    title: "Learning Experience Designer",
    description: "Ruta para disenar experiencias de aprendizaje digital.",
    featured: false,
    estimatedHours: 45,
    coursesCount: 1,
    level: "intermediate",
    milestones: [
      {
        id: "ld-m1",
        title: "Comunicacion y didactica",
        courseIds: ["course-communication"],
        order: 1,
      },
    ],
  },
]

const mockDb = new Map<string, CareerPathModel>(CAREER_PATH_FIXTURES.map((item) => [item.id, item]))

export class CareerPathMockDataSource implements ICareerPathRemoteDataSource {
  async create(model: CareerPathModel): Promise<CareerPathModel> {
    if (mockDb.has(model.id)) {
      throw new Error(`Career path ${model.id} already exists`)
    }

    mockDb.set(model.id, model)
    return model
  }

  async update(id: string, model: Partial<CareerPathModel>): Promise<CareerPathModel> {
    const current = mockDb.get(id)

    if (!current) {
      throw new Error(`Career path ${id} not found`)
    }

    const updated: CareerPathModel = {
      ...current,
      ...model,
      id: current.id,
      slug: current.slug,
      milestones: model.milestones ?? current.milestones,
    }

    mockDb.set(id, updated)
    return updated
  }

  async getById(id: string): Promise<CareerPathModel | null> {
    return mockDb.get(id) ?? null
  }

  async getBySlug(slug: string): Promise<CareerPathModel | null> {
    for (const value of mockDb.values()) {
      if (value.slug === slug) {
        return value
      }
    }

    return null
  }

  async getAll(query?: { featuredOnly?: boolean }): Promise<CareerPathModel[]> {
    const values = [...mockDb.values()]

    if (query?.featuredOnly) {
      return values.filter((item) => item.featured)
    }

    return values
  }

  async deleteById(id: string): Promise<void> {
    const deleted = mockDb.delete(id)

    if (!deleted) {
      throw new Error(`Career path ${id} not found`)
    }
  }
}
