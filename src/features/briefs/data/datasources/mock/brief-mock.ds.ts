import type { IBriefRemoteDataSource } from "../brief.remote-datasource"
import type { BriefModel } from "../../models/brief.model"

const BRIEF_FIXTURES: BriefModel[] = [
  {
    id: "brief-ui-redesign",
    title: "Redesign de landing para academia online",
    description: "Define una propuesta visual para mejorar conversion y claridad de la landing principal.",
    category: "Product Design",
    difficulty: "intermediate",
    estimatedDurationMinutes: 180,
    thumbnailUrl: "/images/course-thumbnail.jpg",
    authorName: "Ana Torres",
    objectives: [
      "Analizar problemas de UX actuales",
      "Proponer nueva arquitectura de contenido",
      "Presentar decisiones visuales justificadas",
    ],
    deliverables: ["Mapa de sitio", "Wireframes", "Mockup final"],
    createdAt: "2026-03-25T10:00:00.000Z",
  },
  {
    id: "brief-data-storytelling",
    title: "Data storytelling para decision academica",
    description: "Construye una narrativa con datos de progreso para apoyar decisiones docentes.",
    category: "Data",
    difficulty: "beginner",
    estimatedDurationMinutes: 120,
    thumbnailUrl: "/images/course-thumbnail.jpg",
    authorName: "Luis Mendez",
    objectives: [
      "Seleccionar metricas relevantes",
      "Construir visualizaciones claras",
      "Redactar recomendaciones accionables",
    ],
    deliverables: ["Dashboard", "Resumen ejecutivo"],
    createdAt: "2026-03-28T14:30:00.000Z",
  },
  {
    id: "brief-api-integration",
    title: "Integracion de API para recursos educativos",
    description: "Disena una integracion segura entre LMS y servicio externo de contenidos.",
    category: "Engineering",
    difficulty: "advanced",
    estimatedDurationMinutes: 240,
    thumbnailUrl: "/images/course-thumbnail.jpg",
    authorName: "Carlos Vega",
    objectives: [
      "Definir contrato de integracion",
      "Aplicar autenticacion robusta",
      "Garantizar trazabilidad de errores",
    ],
    deliverables: ["Diagrama de arquitectura", "Especificacion API", "Checklist de seguridad"],
    createdAt: "2026-03-29T09:10:00.000Z",
  },
]

const mockDb = new Map<string, BriefModel>(BRIEF_FIXTURES.map((item) => [item.id, item]))

export class BriefMockDataSource implements IBriefRemoteDataSource {
  async create(model: BriefModel): Promise<BriefModel> {
    if (mockDb.has(model.id)) {
      throw new Error(`Brief ${model.id} already exists`)
    }

    mockDb.set(model.id, model)
    return model
  }

  async update(id: string, model: Partial<BriefModel>): Promise<BriefModel> {
    const current = mockDb.get(id)
    if (!current) {
      throw new Error(`Brief ${id} not found`)
    }

    const updated: BriefModel = {
      ...current,
      ...model,
      id: current.id,
      createdAt: current.createdAt,
    }

    mockDb.set(id, updated)
    return updated
  }

  async getById(id: string): Promise<BriefModel | null> {
    return mockDb.get(id) ?? null
  }

  async getAll(): Promise<BriefModel[]> {
    return [...mockDb.values()].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  }

  async deleteById(id: string): Promise<void> {
    const deleted = mockDb.delete(id)
    if (!deleted) {
      throw new Error(`Brief ${id} not found`)
    }
  }
}
