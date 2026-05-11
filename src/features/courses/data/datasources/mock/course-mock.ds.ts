import type { ICourseRemoteDataSource } from "../course.remote-datasource"
import type { CourseModel } from "../../models/course.model"

const COURSE_FIXTURES: CourseModel[] = [
  {
    id: "course-communication",
    title: "Speak Confidently",
    description: "Comunicacion interpersonal aplicada al contexto academico. En este curso se explorarán técnicas prácticas para mejorar la comunicación en entornos académicos y profesionales.",
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
        id: "sec-comm-1",
        title: "Fundamentos de comunicacion",
        resources: [
          { id: "lesson-comm-1-1", title: "Comunicacion no verbal", type: "video", videoFile: "/images/course-thumbnail.jpg", durationMinutes: 20, completed: true },
          { id: "lesson-comm-1-2", title: "Lenguaje corporal", type: "video", videoFile: "/images/course-thumbnail.jpg", durationMinutes: 23, completed: true },
          { id: "lesson-comm-1-3", title: "Practica y reflexion", type: "pdf", documentFile: "/docs/practice-guide.pdf", durationMinutes: 25, completed: false },
        ],
      },
      {
        id: "sec-comm-2",
        title: "Escucha activa",
        resources: [
          { id: "lesson-comm-2-1", title: "Principios de escucha", type: "video", videoFile: "/images/course-thumbnail.jpg", durationMinutes: 18, completed: false },
          { id: "lesson-comm-2-2", title: "Empatia en la comunicacion", type: "video", videoFile: "/images/course-thumbnail.jpg", durationMinutes: 22, completed: false },
          { id: "lesson-comm-2-3", title: "Ejercicios practicos", type: "pdf", documentFile: "/docs/practice-guide.pdf", durationMinutes: 20, completed: false },
        ],
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
        id: "sec-study-1",
        title: "Planificacion por bloques",
        resources: [
          { id: "lesson-study-1-1", title: "Organizacion del tiempo", type: "video", videoFile: "/images/course-thumbnail.jpg", durationMinutes: 15, completed: false },
          { id: "lesson-study-1-2", title: "Bloques de estudio", type: "video", videoFile: "/images/course-thumbnail.jpg", durationMinutes: 18, completed: false },
          { id: "lesson-study-1-3", title: "Calendario semanal", type: "pdf", documentFile: "/docs/practice-guide.pdf", durationMinutes: 22, completed: false },
        ],
      },
      {
        id: "sec-study-2",
        title: "Active recall",
        resources: [
          { id: "lesson-study-2-1", title: "Repaso espaciado", type: "video", videoFile: "/images/course-thumbnail.jpg", durationMinutes: 20, completed: false },
          { id: "lesson-study-2-2", title: "Flashcards efectivas", type: "video", videoFile: "/images/course-thumbnail.jpg", durationMinutes: 24, completed: false },
          { id: "lesson-study-2-3", title: "Autoevaluacion", type: "pdf", documentFile: "/docs/practice-guide.pdf", durationMinutes: 18, completed: false },
        ],
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
        id: "sec-solve-1",
        title: "Descomposicion del problema",
        resources: [
          { id: "lesson-solve-1-1", title: "Identificacion de variables", type: "video", videoFile: "/images/course-thumbnail.jpg", durationMinutes: 14, completed: false },
          { id: "lesson-solve-1-2", title: "Division en subproblemas", type: "video", videoFile: "/images/course-thumbnail.jpg", durationMinutes: 16, completed: false },
          { id: "lesson-solve-1-3", title: "Diagrama de flujo", type: "pdf", documentFile: "/docs/practice-guide.pdf", durationMinutes: 20, completed: false },
        ],
      },
      {
        id: "sec-solve-2",
        title: "Estrategias de solucion",
        resources: [
          { id: "lesson-solve-2-1", title: "Algoritmos basicos", type: "video", videoFile: "/images/course-thumbnail.jpg", durationMinutes: 18, completed: false },
          { id: "lesson-solve-2-2", title: "Backtracking", type: "video", videoFile: "/images/course-thumbnail.jpg", durationMinutes: 22, completed: false },
          { id: "lesson-solve-2-3", title: "Casos practicos", type: "pdf", documentFile: "/docs/practice-guide.pdf", durationMinutes: 15, completed: false },
        ],
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
      {
        id: "sec-prog-1",
        title: "Variables y tipos",
        resources: [
          { id: "lesson-prog-1-1", title: "Introduccion a variables", type: "video", videoFile: "/images/course-programming.jpg", durationMinutes: 12, completed: false },
          { id: "lesson-prog-1-2", title: "Tipos de datos", type: "video", videoFile: "/images/course-programming.jpg", durationMinutes: 15, completed: false },
          { id: "lesson-prog-1-3", title: "Ejercicios guiados", type: "pdf", documentFile: "/docs/datastructures.pdf", durationMinutes: 18, completed: false },
        ],
      },
      {
        id: "sec-prog-2",
        title: "Control de flujo",
        resources: [
          { id: "lesson-prog-2-1", title: "Condicionales if/else", type: "video", videoFile: "/images/course-programming.jpg", durationMinutes: 14, completed: false },
          { id: "lesson-prog-2-2", title: "Bucles y iteraciones", type: "video", videoFile: "/images/course-programming.jpg", durationMinutes: 18, completed: false },
          { id: "lesson-prog-2-3", title: "Lab de practica", type: "pdf", documentFile: "/docs/datastructures.pdf", durationMinutes: 20, completed: false },
        ],
      },
      {
        id: "sec-prog-3",
        title: "Estructuras de datos",
        resources: [
          { id: "lesson-prog-3-1", title: "Arrays y listas", type: "video", videoFile: "/images/course-programming.jpg", durationMinutes: 16, completed: false },
          { id: "lesson-prog-3-2", title: "Diccionarios y mapas", type: "video", videoFile: "/images/course-programming.jpg", durationMinutes: 20, completed: false },
          { id: "lesson-prog-3-3", title: "Proyecto integrador", type: "pdf", documentFile: "/docs/datastructures.pdf", durationMinutes: 25, completed: false },
        ],
      },
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
      {
        id: "sec-ui-1",
        title: "Principios visuales",
        resources: [
          { id: "lesson-ui-1-1", title: "Teoria del color", type: "video", videoFile: "/images/course-design.jpg", durationMinutes: 14, completed: false },
          { id: "lesson-ui-1-2", title: "Tipografia y jerarquia", type: "video", videoFile: "/images/course-design.jpg", durationMinutes: 18, completed: false },
          { id: "lesson-ui-1-3", title: "Composicion visual", type: "pdf", documentFile: "/docs/practice-guide.pdf", durationMinutes: 16, completed: false },
        ],
      },
      {
        id: "sec-ui-2",
        title: "Prototipado",
        resources: [
          { id: "lesson-ui-2-1", title: "Wireframes basicos", type: "video", videoFile: "/images/course-design.jpg", durationMinutes: 15, completed: false },
          { id: "lesson-ui-2-2", title: "Figma paso a paso", type: "video", videoFile: "/images/course-design.jpg", durationMinutes: 22, completed: false },
          { id: "lesson-ui-2-3", title: "Entrega de prototipos", type: "pdf", documentFile: "/docs/practice-guide.pdf", durationMinutes: 18, completed: false },
        ],
      },
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
      {
        id: "sec-db-1",
        title: "Modelado relacional",
        resources: [
          { id: "lesson-db-1-1", title: "Entidades y atributos", type: "video", videoFile: "/images/course-databases.jpg", durationMinutes: 12, completed: false },
          { id: "lesson-db-1-2", title: "Relaciones entre tablas", type: "video", videoFile: "/images/course-databases.jpg", durationMinutes: 16, completed: false },
          { id: "lesson-db-1-3", title: "Diagrama ER", type: "pdf", documentFile: "/docs/sql-basics.pdf", durationMinutes: 20, completed: false },
        ],
      },
      {
        id: "sec-db-2",
        title: "SQL basico",
        resources: [
          { id: "lesson-db-2-1", title: "Select y filtrado", type: "video", videoFile: "/images/course-databases.jpg", durationMinutes: 14, completed: false },
          { id: "lesson-db-2-2", title: "Join y combinaciones", type: "video", videoFile: "/images/course-databases.jpg", durationMinutes: 18, completed: false },
          { id: "lesson-db-2-3", title: "Consultas practicas", type: "pdf", documentFile: "/docs/sql-basics.pdf", durationMinutes: 22, completed: false },
        ],
      },
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
