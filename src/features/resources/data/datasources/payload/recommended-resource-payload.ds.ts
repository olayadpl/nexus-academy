import configPromise from "@payload-config"
import { getPayload } from "payload"

import type { Locale } from "@/src/lib/i18n/translations"
import type { RecommendedResourceModel } from "../../models/recommended-resource.model"
import type { IRecommendedResourceRemoteDataSource } from "../recommended-resource.remote-datasource"

type MediaRelation = { url?: string; filename?: string } | string | null

type RecommendedResourceDoc = {
  id: string | number
  externalId?: string | null
  title?: string | null
  type?: "video" | "pdf" | null
  category?: string | null
  resourceUrl?: string | null
  durationMinutes?: number | null
  authorName?: string | null
  sortOrder?: number | null
  pdfFile?: MediaRelation
  thumbnail?: MediaRelation
}

let payloadPromise: ReturnType<typeof getPayload> | null = null

function getPayloadSingleton() {
  if (!payloadPromise) {
    payloadPromise = getPayload({ config: configPromise })
  }

  return payloadPromise
}

function resolveMediaUrl(relation: MediaRelation): string | undefined {
  if (!relation) return undefined
  if (typeof relation === "string") return relation
  if (relation.url) return relation.url
  if (relation.filename) return `/uploads/${relation.filename}`
  return undefined
}

function toModel(doc: RecommendedResourceDoc): RecommendedResourceModel {
  const id = doc.externalId?.trim() || String(doc.id)
  const type = doc.type === "pdf" ? "pdf" : "video"
  const pdfFileUrl = resolveMediaUrl(doc.pdfFile)
  const resourceUrl = doc.resourceUrl?.trim() || pdfFileUrl || ""
  const thumbnailUrl = resolveMediaUrl(doc.thumbnail) || (type === "pdf" ? pdfFileUrl : undefined)

  return {
    id,
    title: doc.title?.trim() || "",
    type,
    category: doc.category?.trim() || "General",
    resourceUrl,
    durationMinutes: Number(doc.durationMinutes) || 0,
    authorName: doc.authorName?.trim() || undefined,
    thumbnailUrl,
    sortOrder: typeof doc.sortOrder === "number" ? doc.sortOrder : undefined,
  }
}

export class RecommendedResourcePayloadDataSource implements IRecommendedResourceRemoteDataSource {
  constructor(private readonly locale: Locale = "es") {}

  private async payload() {
    return getPayloadSingleton()
  }

  async getAll(): Promise<RecommendedResourceModel[]> {
    const payload = await this.payload()
    const result = await payload.find({
      collection: "recommended-resources",
      depth: 1,
      locale: this.locale,
      limit: 200,
      sort: "sortOrder",
      where: {
        _status: {
          equals: "published",
        },
      },
      overrideAccess: true,
    })

    return (result.docs as RecommendedResourceDoc[]).map(toModel)
  }
}
