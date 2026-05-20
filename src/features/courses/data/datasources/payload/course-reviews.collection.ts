import type { CollectionConfig } from "payload"

type PayloadLike = {
  find: (args: {
    collection: string
    depth?: number
    limit?: number
    pagination?: boolean
    where?: Record<string, unknown>
    overrideAccess?: boolean
  }) => Promise<{ docs?: Array<{ rating?: number | string | null }> }>
  update: (args: {
    collection: string
    id: string | number
    data: Record<string, unknown>
    overrideAccess?: boolean
  }) => Promise<unknown>
}

type HookDoc = {
  course?: string | number | { id?: string | number | null } | null
}

type HookArgs = {
  doc?: HookDoc | null
  req: {
    payload: PayloadLike
  }
}

async function recalculateCourseStats(payload: PayloadLike, courseId: string | number | null | undefined) {
  if (!courseId) return

  const reviews = await payload.find({
    collection: "course-reviews",
    depth: 0,
    limit: 10000,
    pagination: false,
    where: {
      course: {
        equals: courseId,
      },
    },
    overrideAccess: true,
  })

  const docs = Array.isArray(reviews.docs) ? reviews.docs : []
  const reviewCount = docs.length
  const ratingSum = docs.reduce((sum: number, item) => sum + (Number(item.rating) || 0), 0)
  const rating = reviewCount > 0 ? Number((ratingSum / reviewCount).toFixed(2)) : 0

  await payload.update({
    collection: "courses",
    id: courseId,
    data: {
      rating,
      reviewCount,
    },
    overrideAccess: true,
  })
}

export const CourseReviewsCollection: CollectionConfig = {
  slug: "course-reviews",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: "userId",
  },
  fields: [
    {
      name: "course",
      type: "relationship",
      relationTo: "courses",
      required: true,
      index: true,
    },
    {
      name: "userId",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "rating",
      type: "number",
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: "comment",
      type: "textarea",
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }: HookArgs) => {
        const courseId = typeof doc?.course === "object" ? doc.course?.id : doc?.course
        await recalculateCourseStats(req.payload, courseId)
      },
    ],
    afterDelete: [
      async ({ doc, req }: HookArgs) => {
        const courseId = typeof doc?.course === "object" ? doc.course?.id : doc?.course
        await recalculateCourseStats(req.payload, courseId)
      },
    ],
  },
}
