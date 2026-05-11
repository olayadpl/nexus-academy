import configPromise from "@payload-config"
import { getPayload } from "payload"

import type { ICourseRemoteDataSource } from "../course.remote-datasource"
import type { CourseModel } from "../../models/course.model"

type CourseLessonDoc = {
  id?: string | null
  title: string
  type?: string | null
  youtubeUrl?: string | null
  videoFile?: { url?: string } | null
  documentFile?: { url?: string } | null
  formId?: string | null
  durationMinutes?: number | null
  completed?: boolean | null
}

type CourseModuleDoc = {
  id?: string | null
  title: string
  resources?: CourseLessonDoc[] | null
}

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
  modules?: CourseModuleDoc[] | null
}

let payloadPromise: ReturnType<typeof getPayload> | null = null

function getPayloadSingleton() {
  if (!payloadPromise) {
    payloadPromise = getPayload({ config: configPromise })
  }
  return payloadPromise
}

function toModel(doc: CourseDoc): CourseModel {
  const thumbnailFromRelation = (doc as any).thumbnail && typeof (doc as any).thumbnail === 'object' && (doc as any).thumbnail.url
  const thumbnailUrlFinal = thumbnailFromRelation || doc.thumbnailUrl || ''
  const externalId = doc.externalId?.trim() || String(doc.id)
  const rawModules = (doc.modules ?? []) as any[]

const sections: CourseModel["modules"] = rawModules.map((module: any, moduleIdx: number) => {
    const rawResources = module.resources

    const isNested = Array.isArray(rawResources) &&
      rawResources.length > 0 &&
      rawResources.every((l: any) => l && typeof l === "object" && ("durationMinutes" in l || "type" in l))

    const resourceData = isNested && rawResources ? rawResources : rawModules

    return {
      id: module.id?.trim() || `section-${externalId}-${moduleIdx + 1}`,
      title: module.title ?? `Módulo ${moduleIdx + 1}`,
      resources: resourceData.map((r: any, idx: number) => ({
        id: r.id?.trim() || `${externalId}-resource-${moduleIdx * 10 + idx + 1}`,
        title: r.title ?? `Lección ${idx + 1}`,
        type: (r.type as "video" | "pdf" | "form") || "video",
        youtubeUrl: r.youtubeUrl ?? undefined,
        videoFile: typeof r.videoFile === 'string' ? r.videoFile : r.videoFile?.url ?? undefined,
        documentFile: typeof r.documentFile === 'string' ? r.documentFile : r.documentFile?.url ?? undefined,
        formId: r.formId ?? undefined,
        durationMinutes: Number(r.durationMinutes) || 1,
        completed: Boolean(r.completed),
      })),
    }
  })

  return {
    id: externalId,
    title: doc.title ?? "",
    description: doc.description ?? "",
    level: doc.level ?? "beginner",
    durationHours: Number(doc.durationHours) || 0,
    rating: Number(doc.rating) || 0,
    reviewCount: Number(doc.reviewCount) || 0,
    featured: Boolean(doc.featured),
    progress: Number(doc.progress) || 0,
    thumbnailUrl: thumbnailUrlFinal,
    authorName: doc.authorName ?? undefined,
    authorAvatarUrl: doc.authorAvatarUrl ?? undefined,
    modules: sections,
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
    modules: model.modules.map((section) => ({
      id: section.id,
      title: section.title,
      resources: section.resources.map((r) => ({
        id: r.id,
        title: r.title,
        type: r.type,
        youtubeUrl: r.youtubeUrl,
        videoFile: r.videoFile,
        documentFile: r.documentFile,
        formId: r.formId,
        durationMinutes: r.durationMinutes,
        completed: r.completed,
      })),
    })),
  }
}

export class CoursePayloadDataSource implements ICourseRemoteDataSource {
  private async payload() {
    return getPayloadSingleton()
  }

  async create(model: CourseModel): Promise<CourseModel> {
    try {
      const payload = await this.payload()
      const created = await payload.create({
        collection: "courses",
        data: toPayloadData(model),
        depth: 1,
        overrideAccess: true,
      })

      return toModel(created as CourseDoc)
    } catch (e) {
      console.error("CoursePayloadDataSource.create error:", e)
      throw e
    }
  }

  async update(id: string, model: Partial<CourseModel>): Promise<CourseModel> {
    try {
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
    } catch (e) {
      console.error("CoursePayloadDataSource.update error:", e)
      throw e
    }
  }

  async getById(id: string): Promise<CourseModel | null> {
    try {
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
    } catch (e) {
      console.error("CoursePayloadDataSource.getById error:", e)
      return null
    }
  }

  async getAll(query?: { featuredOnly?: boolean }): Promise<CourseModel[]> {
    try {
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
    } catch (e) {
      console.error("CoursePayloadDataSource.getAll error:", e)
      return []
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
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
    } catch (e) {
      console.error("CoursePayloadDataSource.deleteById error:", e)
      throw e
    }
  }
}
