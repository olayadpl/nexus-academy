import type { ICourseRemoteDataSource } from "../course.remote-datasource"
import type { CourseModel } from "../../models/course.model"

const COURSE_FIXTURES: CourseModel[] = [
  {
    id: "course-communication",
    title: "Speak Confidently",
    description: "Comunicacion interpersonal aplicada al contexto academico. En este curso se explorarán técnicas prácticas para mejorar la comunicación en entornos académicos y profesionales. Se trabajarán habilidades de escucha activa, manejo de la ansiedad al hablar, estructuras para presentaciones claras y ejercicios para ganar confianza. Incluye ejemplos, actividades y recursos para aplicar lo aprendido en situaciones reales.",
    level: "beginner",
    durationHours: 1.2,
    rating: 4.5,
    reviewCount: 14115,
    featured: true,
    progress: 34,
    thumbnailUrl: "/images/course1.png",
    authorName: "Dr. Mark Elliot",
    authorAvatarUrl: "https://i.pravatar.cc/150?u=course-communication",
    modules: [
      {
        id: "lesson-1",
        title: "01: Learn The Alphabets",
        type: "video",
        resourceUrl: "/images/course-thumbnail.jpg",
        durationMinutes: 20,
        completed: true,
      },
      {
        id: "lesson-2",
        title: "02: Touch The Grass",
        type: "video",
        resourceUrl: "/images/course-thumbnail.jpg",
        durationMinutes: 23,
        completed: false,
      },
      {
        id: "lesson-3",
        title: "03: Practice, Practice, Practice",
        type: "pdf",
        resourceUrl: "/docs/practice-guide.pdf",
        durationMinutes: 112,
        completed: false,
      },
    ],
  },
  {
    id: "course-study-methods",
    title: "Study Methods",
    description: "Estrategias de estudio para carreras de ciencias informaticas.",
    level: "intermediate",
    durationHours: 2.1,
    rating: 4.7,
    reviewCount: 5620,
    featured: false,
    progress: 0,
    thumbnailUrl: "/images/course2.png",
    authorName: "Sarah Connors",
    authorAvatarUrl: "https://i.pravatar.cc/150?u=course-study-methods",
    modules: [
      {
        id: "study-1",
        title: "01: Planificacion por bloques",
        type: "video",
        resourceUrl: "/images/course-thumbnail.jpg",
        durationMinutes: 42,
        completed: false,
      },
      {
        id: "study-2",
        title: "02: Active recall",
        type: "pdf",
        resourceUrl: "/docs/practice-guide.pdf",
        durationMinutes: 36,
        completed: false,
      },
    ],
  },
  {
    id: "course-problem-solving",
    title: "Problem Solving",
    description: "Metodo practico para resolver problemas complejos paso a paso.",
    level: "advanced",
    durationHours: 1.8,
    rating: 4.6,
    reviewCount: 3870,
    featured: false,
    progress: 0,
    thumbnailUrl: "/images/course3.png",
    authorName: "Ana Rios",
    authorAvatarUrl: "https://i.pravatar.cc/150?u=course-problem-solving",
    modules: [
      {
        id: "solve-1",
        title: "01: Descomposicion del problema",
        type: "video",
        resourceUrl: "/images/course-thumbnail.jpg",
        durationMinutes: 38,
        completed: false,
      },
      {
        id: "solve-2",
        title: "02: Estrategias de solucion",
        type: "pdf",
        resourceUrl: "/docs/practice-guide.pdf",
        durationMinutes: 24,
        completed: false,
      },
    ],
  },
  {
    id: "course-programming",
    title: "Introduction to Programming",
    description: "Fundamentos de programacion: variables, control de flujo y estructuras de datos.",
    level: "beginner",
    durationHours: 3.5,
    rating: 4.4,
    reviewCount: 980,
    featured: false,
    progress: 0,
    thumbnailUrl: "/images/course4.png",
    authorName: "Carlos Lopez",
    authorAvatarUrl: "https://i.pravatar.cc/150?u=course-programming",
    modules: [
      { id: "prog-1", title: "Variables y tipos", type: "video", resourceUrl: "/images/course-programming.jpg", durationMinutes: 30, completed: false },
      { id: "prog-2", title: "Control de flujo", type: "video", resourceUrl: "/images/course-programming.jpg", durationMinutes: 45, completed: false },
      { id: "prog-3", title: "Estructuras de datos", type: "pdf", resourceUrl: "/docs/datastructures.pdf", durationMinutes: 60, completed: false },
    ],
  },
  {
    id: "course-design-ui",
    title: "UI Design Basics",
    description: "Principios de diseño visual y experiencia de usuario para interfaces.",
    level: "intermediate",
    durationHours: 2.8,
    rating: 4.6,
    reviewCount: 420,
    featured: false,
    progress: 0,
    thumbnailUrl: "/images/course5.png",
    authorName: "Mariana Diaz",
    authorAvatarUrl: "https://i.pravatar.cc/150?u=course-design-ui",
    modules: [
      { id: "ui-1", title: "Principios visuales", type: "video", resourceUrl: "/images/course-design.jpg", durationMinutes: 25, completed: false },
      { id: "ui-2", title: "Prototipado", type: "video", resourceUrl: "/images/course-design.jpg", durationMinutes: 40, completed: false },
    ],
  },
  {
    id: "course-databases",
    title: "Databases 101",
    description: "Modelado relacional, consultas SQL y optimizacion basica.",
    level: "beginner",
    durationHours: 2.4,
    rating: 4.3,
    reviewCount: 310,
    featured: false,
    progress: 0,
    thumbnailUrl: "/images/course6.png",
    authorName: "Luis Garcia",
    authorAvatarUrl: "https://i.pravatar.cc/150?u=course-databases",
    modules: [
      { id: "db-1", title: "Modelado relacional", type: "video", resourceUrl: "/images/course-databases.jpg", durationMinutes: 35, completed: false },
      { id: "db-2", title: "SQL basico", type: "pdf", resourceUrl: "/docs/sql-basics.pdf", durationMinutes: 50, completed: false },
    ],
  },
]

const mockDb = new Map<string, CourseModel>(COURSE_FIXTURES.map((item) => [item.id, item]))

export class CourseMockDataSource implements ICourseRemoteDataSource {
  async create(model: CourseModel): Promise<CourseModel> {
    if (mockDb.has(model.id)) {
      throw new Error(`Course ${model.id} already exists`)
    }

    mockDb.set(model.id, model)
    return model
  }

  async update(id: string, model: Partial<CourseModel>): Promise<CourseModel> {
    const current = mockDb.get(id)

    if (!current) {
      throw new Error(`Course ${id} not found`)
    }

    const updated: CourseModel = {
      ...current,
      ...model,
      id: current.id,
      modules: model.modules ?? current.modules,
    }

    mockDb.set(id, updated)
    return updated
  }

  async getById(id: string): Promise<CourseModel | null> {
    return mockDb.get(id) ?? null
  }

  async getAll(query?: { featuredOnly?: boolean }): Promise<CourseModel[]> {
    const values = [...mockDb.values()]

    if (query?.featuredOnly) {
      return values.filter((item) => item.featured)
    }

    return values
  }

  async deleteById(id: string): Promise<void> {
    const deleted = mockDb.delete(id)

    if (!deleted) {
      throw new Error(`Course ${id} not found`)
    }
  }
}
