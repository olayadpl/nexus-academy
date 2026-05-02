import type { IFeedRemoteDataSource } from "../feed.remote-datasource"
import type { FeedItemModel } from "../../models/feed-item.model"

const FEED_FIXTURES: FeedItemModel[] = [
  {
    id: "feed-1",
    title: "Nuevo modulo de Arquitectura Limpia publicado",
    summary: "Se agrego contenido practico para aplicar vertical slicing en proyectos reales.",
    category: "course",
    createdAt: "2026-03-31T02:30:00.000Z",
  },
  {
    id: "feed-2",
    title: "Brief semanal: optimizacion de consultas",
    summary: "Resumen con tacticas para mejorar tiempos de respuesta en aplicaciones web.",
    category: "brief",
    createdAt: "2026-03-30T15:00:00.000Z",
  },
  {
    id: "feed-3",
    title: "Nueva evaluacion de TypeScript disponible",
    summary: "Mide tu nivel con preguntas enfocadas en tipos avanzados y buenas practicas.",
    category: "assessment",
    createdAt: "2026-03-29T10:00:00.000Z",
  },
]

export class FeedMockDataSource implements IFeedRemoteDataSource {
  async listLatest(): Promise<FeedItemModel[]> {
    return [...FEED_FIXTURES].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  }
}
