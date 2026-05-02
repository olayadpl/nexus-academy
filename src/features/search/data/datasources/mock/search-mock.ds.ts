import type { ISearchRemoteDataSource, SearchRemoteQuery } from "../search.remote-datasource"
import type { SearchResultModel } from "../../models/search.model"

export const SEARCH_FIXTURES: SearchResultModel[] = [
  {
    id: "course-communication",
    title: "How To Speak To Anyone Without Being Cringe",
    description: "Comunicacion interpersonal aplicada al contexto academico.",
    type: "course",
    category: "Course",
    thumbnailUrl: "/images/course-thumbnail.jpg",
    durationMinutes: 72,
    featured: true,
    reviewCount: 14115,
    rating: 4.5,
    createdAt: "2026-03-20T10:00:00.000Z",
  },
  {
    id: "course-study-methods",
    title: "Study Methods For Engineering Students",
    description: "Estrategias de estudio para carreras de ciencias informaticas.",
    type: "course",
    category: "Course",
    thumbnailUrl: "/images/course-thumbnail.jpg",
    durationMinutes: 126,
    featured: false,
    reviewCount: 5620,
    rating: 4.7,
    createdAt: "2026-03-24T12:00:00.000Z",
  },
  {
    id: "brief-data-storytelling",
    title: "Data storytelling para decision academica",
    description: "Construye una narrativa con datos de progreso para apoyar decisiones docentes.",
    type: "brief",
    category: "Brief",
    thumbnailUrl: "/images/course-thumbnail.jpg",
    durationMinutes: 120,
    featured: false,
    createdAt: "2026-03-28T14:30:00.000Z",
  },
]

export class SearchMockDataSource implements ISearchRemoteDataSource {
  async search(query: SearchRemoteQuery): Promise<SearchResultModel[]> {
    const normalizedQuery = query.q.toLowerCase()

    let items = SEARCH_FIXTURES.filter((item) =>
      normalizedQuery
        ? item.title.toLowerCase().includes(normalizedQuery) || item.description.toLowerCase().includes(normalizedQuery)
        : true
    )

    if (query.featuredOnly) {
      items = items.filter((item) => item.featured)
    }

    return [...items].sort((a, b) => {
      if (query.sort === "rating") {
        return (b.rating ?? 0) - (a.rating ?? 0)
      }

      if (query.sort === "recent") {
        return Date.parse(b.createdAt ?? "1970-01-01T00:00:00.000Z") - Date.parse(a.createdAt ?? "1970-01-01T00:00:00.000Z")
      }

      return (b.reviewCount ?? 0) - (a.reviewCount ?? 0)
    })
  }
}
