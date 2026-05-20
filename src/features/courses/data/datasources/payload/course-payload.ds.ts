import configPromise from "@payload-config"
import { getPayload } from "payload"

import type { ICourseRemoteDataSource } from "../course.remote-datasource"
import type { CourseModel } from "../../models/course.model"
import type { Locale } from "@/src/lib/i18n/translations"

type CourseLessonDoc = {
  blockType?: "video" | "document" | "quiz" | null
  id?: string | null
  title: string
  type?: string | null
  youtubeUrl?: string | null
  videoFile?: { url?: string } | string | null
  documentFile?: { url?: string } | string | null
  formId?: string | null
  quizRef?: string | null
  duration?: {
    hours?: number | null
    minutes?: number | null
  } | null
  durationMinutes?: number | null
  pages?: number | null
  isPreview?: boolean | null
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
  duration?: {
    hours?: number | null
    minutes?: number | null
  } | null
  durationHours?: number | null
  rating: number
  reviewCount: number
  featured: boolean
  progress?: number | null
  thumbnailUrl?: string | null
  thumbnail?: { url?: string } | string | null
  author?: {
    name?: string | null
    avatar?: { url?: string } | string | null
  } | null
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
  const thumbnailFromRelation =
    doc.thumbnail && typeof doc.thumbnail === "object" ? doc.thumbnail.url : undefined
  const thumbnailUrlFinal = thumbnailFromRelation || doc.thumbnailUrl || ''
  const externalId = doc.externalId?.trim() || String(doc.id)
  const docId = String(doc.id)
  const rawModules: CourseModuleDoc[] = Array.isArray(doc.modules) ? doc.modules : []

  const durationGroupHours = Number(doc.duration?.hours) || 0
  const durationGroupMinutes = Number(doc.duration?.minutes) || 0
  const durationHoursFromGroup = durationGroupHours + durationGroupMinutes / 60

  const sections: CourseModel["modules"] = rawModules.map((module, moduleIdx: number) => {
    const rawResources = module.resources

    const resourceData: CourseLessonDoc[] = Array.isArray(rawResources) ? rawResources : []

    return {
      id: module.id?.trim() || `section-${externalId}-${moduleIdx + 1}`,
      title: module.title ?? `Módulo ${moduleIdx + 1}`,
      resources: resourceData.map((r, idx: number) => {
        const resourceType =
          r.blockType === "document"
            ? "pdf"
            : r.blockType === "quiz"
              ? "form"
              : ((r.type as "video" | "pdf" | "form" | undefined) ?? "video")
        const durationMinutesFromGroup = (Number(r.duration?.hours) || 0) * 60 + (Number(r.duration?.minutes) || 0)

        return {
          id: r.id?.trim() || `${externalId}-resource-${moduleIdx * 10 + idx + 1}`,
          title: r.title ?? `Lección ${idx + 1}`,
          type: resourceType,
          youtubeUrl: r.youtubeUrl ?? undefined,
          videoFile: typeof r.videoFile === "string" ? r.videoFile : r.videoFile?.url ?? undefined,
          documentFile: typeof r.documentFile === "string" ? r.documentFile : r.documentFile?.url ?? undefined,
          formId: r.formId ?? r.quizRef ?? undefined,
          durationMinutes: Number(r.durationMinutes) || durationMinutesFromGroup || 1,
          completed: Boolean(r.completed),
        }
      }),
    }
  })

  const authorAvatarFromGroup =
    doc.author?.avatar && typeof doc.author.avatar === "object" ? doc.author.avatar.url : undefined

  return {
    id: docId,
    title: doc.title ?? "",
    description: doc.description ?? "",
    level: doc.level ?? "beginner",
    durationHours: durationHoursFromGroup || Number(doc.durationHours) || 0,
    rating: Number(doc.rating) || 0,
    reviewCount: Number(doc.reviewCount) || 0,
    featured: Boolean(doc.featured),
    progress: Number(doc.progress) || 0,
    thumbnailUrl: thumbnailUrlFinal,
    authorName: doc.author?.name ?? doc.authorName ?? undefined,
    authorAvatarUrl:
      authorAvatarFromGroup ||
      (typeof doc.author?.avatar === "string" ? doc.author.avatar : undefined) ||
      doc.authorAvatarUrl ||
      undefined,
    modules: sections,
  }
}

function toPayloadData(model: CourseModel) {
  const wholeHours = Math.max(0, Math.floor(model.durationHours || 0))
  const minutes = Math.max(0, Math.round(((model.durationHours || 0) - wholeHours) * 60))
  const normalizedHours = wholeHours + Math.floor(minutes / 60)
  const normalizedMinutes = minutes % 60

  return {
    externalId: model.id,
    title: model.title,
    description: model.description,
    level: model.level,
    duration: {
      hours: normalizedHours,
      minutes: normalizedMinutes,
    },
    durationHours: model.durationHours,
    rating: model.rating,
    reviewCount: model.reviewCount,
    featured: model.featured,
    thumbnailUrl: model.thumbnailUrl,
    thumbnail: undefined,
    author: {
      name: model.authorName,
      avatar: undefined,
    },
    authorName: model.authorName,
    authorAvatarUrl: model.authorAvatarUrl,
    modules: model.modules.map((section) => ({
      id: section.id,
      title: section.title,
      resources: section.resources.map((r) => {
        if (r.type === "pdf") {
          return {
            blockType: "document",
            id: r.id,
            title: r.title,
            documentFile: r.documentFile,
          }
        }

        if (r.type === "form") {
          return {
            blockType: "quiz",
            id: r.id,
            title: r.title,
            quizRef: r.formId,
          }
        }

        return {
          blockType: "video",
          id: r.id,
          title: r.title,
          youtubeUrl: r.youtubeUrl,
          videoFile: r.videoFile,
          duration: {
            hours: Math.floor((r.durationMinutes || 0) / 60),
            minutes: Math.max(0, (r.durationMinutes || 0) % 60),
          },
          isPreview: false,
        }
      }),
    })),
  }
}

export class CoursePayloadDataSource implements ICourseRemoteDataSource {
  constructor(private readonly locale: Locale = "es") {}

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
        locale: this.locale,
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
        locale: this.locale,
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
        locale: this.locale,
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
        locale: this.locale,
        where: {
          externalId: { equals: id },
          _status: { equals: "published" },
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
        locale: this.locale,
        where: {
          id: { equals: id },
          _status: { equals: "published" },
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
        locale: this.locale,
        where: {
          ...(query?.featuredOnly ? { featured: { equals: true } } : {}),
          _status: { equals: "published" },
        },
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
        locale: this.locale,
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
