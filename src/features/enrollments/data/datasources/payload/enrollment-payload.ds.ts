import configPromise from "@payload-config"
import { getPayload } from "payload"

import type { Locale } from "@/src/lib/i18n/translations"
import type { EnrollmentModel } from "../../models/enrollment.model"
import type { IEnrollmentRemoteDataSource } from "../enrollment.remote-datasource"

type EnrollmentDoc = {
  id: string | number
  externalId?: string | null
  userId?: string | null
  course?: string | number | { externalId?: string | null; id?: string | number | null } | null
  courseId?: string | null
  progressPercent?: number | null
  status?: "active" | "completed" | "paused" | null
  enrolledAt?: string | null
  lastAccessedAt?: string | null
}

let payloadPromise: ReturnType<typeof getPayload> | null = null

function getPayloadSingleton() {
  if (!payloadPromise) {
    payloadPromise = getPayload({ config: configPromise })
  }

  return payloadPromise
}

function normalizeDate(dateLike: string | null | undefined): string {
  const parsed = dateLike ? Date.parse(dateLike) : Number.NaN
  if (Number.isNaN(parsed)) {
    return new Date().toISOString()
  }

  return new Date(parsed).toISOString()
}

function resolveCourseId(doc: EnrollmentDoc): string {
  if (typeof doc.course === "object" && doc.course) {
    if (doc.course.externalId?.trim()) return doc.course.externalId.trim()
    if (doc.course.id != null) return String(doc.course.id)
  }

  if (typeof doc.course === "string" || typeof doc.course === "number") {
    return String(doc.course)
  }

  if (doc.courseId?.trim()) {
    return doc.courseId.trim()
  }

  return ""
}

function toModel(doc: EnrollmentDoc): EnrollmentModel {
  const id = doc.externalId?.trim() || String(doc.id)

  return {
    id,
    userId: doc.userId?.trim() || "",
    courseId: resolveCourseId(doc),
    progressPercent: Number(doc.progressPercent) || 0,
    status: doc.status ?? "active",
    enrolledAt: normalizeDate(doc.enrolledAt),
    lastAccessedAt: normalizeDate(doc.lastAccessedAt),
  }
}

function toPayloadData(model: EnrollmentModel) {
  return {
    externalId: model.id,
    userId: model.userId,
    course: model.courseId,
    courseId: model.courseId,
    progressPercent: model.progressPercent,
    status: model.status,
    enrolledAt: model.enrolledAt,
    lastAccessedAt: model.lastAccessedAt,
  }
}

async function resolveCourseRelationId(
  payload: Awaited<ReturnType<typeof getPayload>>,
  courseId: string,
  locale: Locale,
): Promise<string | number> {
  const found = await payload.find({
    collection: "courses",
    limit: 1,
    depth: 0,
    locale,
    where: {
      externalId: {
        equals: courseId,
      },
    },
    overrideAccess: true,
  })

  if (found.docs[0]?.id != null) {
    return found.docs[0].id
  }

  return courseId
}

export class EnrollmentPayloadDataSource implements IEnrollmentRemoteDataSource {
  constructor(private readonly locale: Locale = "es") {}

  private async payload() {
    return getPayloadSingleton()
  }

  async create(model: EnrollmentModel): Promise<EnrollmentModel> {
    const payload = await this.payload()
    const relationCourseId = await resolveCourseRelationId(payload, model.courseId, this.locale)
    const created = await payload.create({
      collection: "enrollments",
      data: {
        ...toPayloadData(model),
        course: relationCourseId,
      },
      depth: 1,
      locale: this.locale,
      overrideAccess: true,
    })

    return toModel(created as EnrollmentDoc)
  }

  async update(id: string, model: Partial<EnrollmentModel>): Promise<EnrollmentModel> {
    const payload = await this.payload()
    const found = await payload.find({
      collection: "enrollments",
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

    const target = found.docs[0] as EnrollmentDoc | undefined
    if (!target) {
      throw new Error(`Enrollment ${id} not found`)
    }

    const existing = toModel(target)
    const merged: EnrollmentModel = {
      ...existing,
      ...model,
      id,
      userId: existing.userId,
      courseId: existing.courseId,
    }

    const updated = await payload.update({
      collection: "enrollments",
      id: target.id,
      data: {
        ...toPayloadData(merged),
        course: await resolveCourseRelationId(payload, merged.courseId, this.locale),
      },
      depth: 1,
      locale: this.locale,
      overrideAccess: true,
    })

    return toModel(updated as EnrollmentDoc)
  }

  async getById(id: string): Promise<EnrollmentModel | null> {
    const payload = await this.payload()
    const result = await payload.find({
      collection: "enrollments",
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

    const doc = result.docs[0] as EnrollmentDoc | undefined
    return doc ? toModel(doc) : null
  }

  async getByUserId(userId: string): Promise<EnrollmentModel[]> {
    const payload = await this.payload()
    const result = await payload.find({
      collection: "enrollments",
      limit: 200,
      depth: 1,
      pagination: false,
      locale: this.locale,
      where: {
        userId: {
          equals: userId,
        },
      },
      sort: "-lastAccessedAt",
      overrideAccess: true,
    })

    return result.docs.map((doc) => toModel(doc as EnrollmentDoc))
  }

  async getAll(): Promise<EnrollmentModel[]> {
    const payload = await this.payload()
    const result = await payload.find({
      collection: "enrollments",
      limit: 200,
      depth: 1,
      pagination: false,
      locale: this.locale,
      sort: "-lastAccessedAt",
      overrideAccess: true,
    })

    return result.docs.map((doc) => toModel(doc as EnrollmentDoc))
  }

  async deleteById(id: string): Promise<void> {
    const payload = await this.payload()
    const found = await payload.find({
      collection: "enrollments",
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

    const target = found.docs[0] as EnrollmentDoc | undefined
    if (!target) {
      throw new Error(`Enrollment ${id} not found`)
    }

    await payload.delete({
      collection: "enrollments",
      id: target.id,
      overrideAccess: true,
    })
  }
}
