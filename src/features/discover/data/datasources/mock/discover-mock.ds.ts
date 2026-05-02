import type { IDiscoverRemoteDataSource } from "../discover.remote-datasource"
import type { DiscoverModel } from "../../models/discover.model"

const DISCOVER_FIXTURES: DiscoverModel[] = [
  {
    id: "discover-main",
    exploreTitle: "Explora recursos para aprender mejor",
    exploreSubtitle: "Descubre cursos y contenidos recomendados para fortalecer tus habilidades academicas y profesionales.",
    marketingBanner: {
      title: "Aprende a tu ritmo con rutas guiadas",
      description: "Accede a cursos, briefs y evaluaciones con un plan claro para avanzar semana a semana.",
      ctaText: "Comenzar ahora",
      ctaHref: "/signup",
      imageUrl: "/marketing-banner.png",
    },
    subjects: [
      {
        id: "subject-communication",
        title: "Comunicacion efectiva",
        description: "Domina presentaciones, storytelling y trabajo colaborativo.",
        href: "/courses/course-communication",
      },
      {
        id: "subject-study",
        title: "Metodos de estudio",
        description: "Sistemas de aprendizaje activo para mejorar retencion y enfoque.",
        href: "/courses/course-study-methods",
      },
      {
        id: "subject-data",
        title: "Data storytelling",
        description: "Convierte datos academicos en decisiones accionables.",
        href: "/briefs/brief-data-storytelling",
      },
      {
        id: "subject-programming",
        title: "Programación",
        description: "Fundamentos y buenas prácticas para desarrollo de software.",
        href: "/courses/course-programming",
      },
      {
        id: "subject-design-ui",
        title: "Diseño UI",
        description: "Principios de diseño de interfaces y experiencia de usuario.",
        href: "/courses/course-design-ui",
      },
      {
        id: "subject-databases",
        title: "Bases de datos",
        description: "Modelado, consultas y optimización de bases de datos.",
        href: "/courses/course-databases",
      },
    ],
    faq: [
      {
        id: "faq-1",
        question: "Como empiezo a aprender en Nexus Academy?",
        answer: "Ve a Cursos o Briefs, elige un contenido y continua desde tu panel personal en cualquier momento.",
      },
      {
        id: "faq-2",
        question: "Puedo guardar recursos para ver despues?",
        answer: "Si, usa la accion de guardado en cada tarjeta y organizalos en colecciones.",
      },
      {
        id: "faq-3",
        question: "Como se calcula mi progreso?",
        answer: "El progreso se obtiene de modulos completados y tu actividad reciente en cursos y evaluaciones.",
      },
    ],
    bottomBanner: {
      title: "Listo para elevar tu nivel academico?",
      ctaText: "Crear cuenta",
      ctaHref: "/signup",
    },
  },
]

const mockDb = new Map<string, DiscoverModel>(DISCOVER_FIXTURES.map((item) => [item.id, item]))

export class DiscoverMockDataSource implements IDiscoverRemoteDataSource {
  async create(model: DiscoverModel): Promise<DiscoverModel> {
    if (mockDb.has(model.id)) {
      throw new Error(`Discover model ${model.id} already exists`)
    }

    mockDb.set(model.id, model)
    return model
  }

  async update(id: string, model: Partial<DiscoverModel>): Promise<DiscoverModel | null> {
    const current = mockDb.get(id)

    if (!current) {
      return null
    }

    const updated = {
      ...current,
      ...model,
      id: current.id,
    }

    mockDb.set(id, updated)
    return updated
  }

  async getById(id: string): Promise<DiscoverModel | null> {
    return mockDb.get(id) ?? null
  }

  async getAll(): Promise<DiscoverModel[]> {
    return [...mockDb.values()]
  }

  async deleteById(id: string): Promise<boolean> {
    return mockDb.delete(id)
  }
}
