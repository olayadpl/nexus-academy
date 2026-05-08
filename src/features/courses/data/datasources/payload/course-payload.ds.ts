import configPromise from "@payload-config"
import { getPayload } from "payload"

import type { ICourseRemoteDataSource } from "../course.remote-datasource"
import type { CourseModel } from "../../models/course.model"

type CourseDoc = {
  id: string | number
  externalId?: string | null
  title: string
  description: string
  level: "beginner" | "intermediate" | "advanced"
  durationHours: number
  rating: number
  reviewCount: number
  featured: boolean
  progress?: number | null
  thumbnailUrl: string
  authorName?: string | null
  authorAvatarUrl?: string | null
  modules?: Array<{
    id?: string | null
    title: string
    type: "video" | "pdf"
    resourceUrl?: string | null
    youtubeUrl?: string | null
    videoFile?: { url?: string } | null
    documentFile?: { url?: string } | null
    durationMinutes: number
    completed?: boolean | null
  }> | null
}

function toModel(doc: CourseDoc): CourseModel {
  const thumbnailFromRelation = (doc as any).thumbnail && typeof (doc as any).thumbnail === 'object' && (doc as any).thumbnail.url
  const thumbnailUrlFinal = thumbnailFromRelation || doc.thumbnailUrl || ''
  const externalId = doc.externalId?.trim() || String(doc.id)
  const modules = (doc.modules ?? []).map((module, index) => ({
    id: module.id?.trim() || `${externalId}-module-${index + 1}`,
    title: module.title,
    type: module.type,
    resourceUrl: module.resourceUrl ?? undefined,
    youtubeUrl: module.youtubeUrl ?? undefined,
    videoUrl: module.videoFile?.url ?? undefined,
    documentUrl: module.documentFile?.url ?? undefined,
    durationMinutes: Number(module.durationMinutes) || 1,
    completed: Boolean(module.completed),
  }))

  return {
    id: externalId,
    title: doc.title,
    description: doc.description,
    level: doc.level,
    durationHours: Number(doc.durationHours) || 0,
    rating: Number(doc.rating) || 0,
    reviewCount: Number(doc.reviewCount) || 0,
    featured: Boolean(doc.featured),
    progress: Number(doc.progress) || 0,
    thumbnailUrl: thumbnailUrlFinal,
    authorName: doc.authorName ?? undefined,
    authorAvatarUrl: doc.authorAvatarUrl ?? undefined,
    modules,
  }
}

function toPayloadData(model: CourseModel) {
  return {
    externalId: model.id,
    title: model.title,
    description: model.description,
    level: model.level,
    durationHours: model.durationHours,
    rating: model.rating,
    reviewCount: model.reviewCount,
    featured: model.featured,
    progress: model.progress ?? 0,
    thumbnailUrl: model.thumbnailUrl,
    authorName: model.authorName,
    authorAvatarUrl: model.authorAvatarUrl,
    modules: model.modules.map((module) => ({
      id: module.id,
      title: module.title,
      type: module.type,
      resourceUrl: module.resourceUrl,
      youtubeUrl: module.youtubeUrl,
      durationMinutes: module.durationMinutes,
      completed: module.completed,
    })),
  }
}

export class CoursePayloadDataSource implements ICourseRemoteDataSource {
  private async payload() {
    return getPayload({ config: configPromise })
  }

  async create(model: CourseModel): Promise<CourseModel> {
    const payload = await this.payload()
    const created = await payload.create({
      collection: "courses",
      data: toPayloadData(model),
      depth: 1,
      overrideAccess: true,
    })

    return toModel(created as CourseDoc)
  }

  async update(id: string, model: Partial<CourseModel>): Promise<CourseModel> {
    const payload = await this.payload()
    const found = await payload.find({
      collection: "courses",
      limit: 1,
      depth: 1,
      where: {
        externalId: {
          equals: id,
        },
      },
      overrideAccess: true,
    })

    const target = found.docs[0]

    if (!target) {
      throw new Error(`Course ${id} not found`)
    }

    const existing = toModel(target as CourseDoc)
    const merged: CourseModel = {
      ...existing,
      ...model,
      id: model.id ?? id,
      modules: model.modules ?? existing.modules,
    }

    const payloadData = toPayloadData(merged)

    const updated = await payload.update({
      collection: "courses",
      id: target.id,
      data: payloadData,
      depth: 1,
      overrideAccess: true,
    })

    return toModel(updated as CourseDoc)
  }

  async getById(id: string): Promise<CourseModel | null> {
    const payload = await this.payload()

    const byExternalId = await payload.find({
      collection: "courses",
      limit: 1,
      depth: 1,
      where: {
        externalId: {
          equals: id,
        },
      },
      overrideAccess: true,
    })

    if (byExternalId.docs[0]) {
      return toModel(byExternalId.docs[0] as CourseDoc)
    }

    const byInternalId = await payload.find({
      collection: "courses",
      limit: 1,
      depth: 1,
      where: {
        id: {
          equals: id,
        },
      },
      overrideAccess: true,
    })

    if (!byInternalId.docs[0]) {
      return null
    }

    return toModel(byInternalId.docs[0] as CourseDoc)
  }

  async getAll(query?: { featuredOnly?: boolean }): Promise<CourseModel[]> {
    const payload = await this.payload()
    const result = await payload.find({
      collection: "courses",
      limit: 100,
      depth: 1,
      pagination: false,
      where: query?.featuredOnly
        ? {
            featured: {
              equals: true,
            },
          }
        : undefined,
      overrideAccess: true,
    })

    return result.docs.map((doc) => toModel(doc as CourseDoc))
  }

  async deleteById(id: string): Promise<void> {
    const payload = await this.payload()
    const found = await payload.find({
      collection: "courses",
      limit: 1,
      depth: 0,
      where: {
        externalId: {
          equals: id,
        },
      },
      overrideAccess: true,
    })

    const target = found.docs[0]

    if (!target) {
      throw new Error(`Course ${id} not found`)
    }

    await payload.delete({
      collection: "courses",
      id: target.id,
      overrideAccess: true,
    })
  }
}
