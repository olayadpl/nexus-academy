import payload from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { buildConfig } from 'payload'

import { featureCollections } from '../src/payload-collections.generated.ts'

async function getCourseInternalIdByExternalId(externalId) {
  const found = await payload.find({
    collection: 'courses',
    limit: 1,
    depth: 0,
    where: {
      externalId: {
        equals: externalId,
      },
    },
    overrideAccess: true,
  })

  return found.docs[0]?.id ?? null
}

async function upsertEnrollment(seed) {
  const existing = await payload.find({
    collection: 'enrollments',
    limit: 1,
    depth: 0,
    where: {
      externalId: {
        equals: seed.externalId,
      },
    },
    overrideAccess: true,
  })

  if (existing.docs[0]) {
    const updated = await payload.update({
      collection: 'enrollments',
      id: existing.docs[0].id,
      data: seed,
      overrideAccess: true,
    })
    console.log('Updated enrollment:', updated.id || seed.externalId)
    return
  }

  const created = await payload.create({
    collection: 'enrollments',
    data: seed,
    overrideAccess: true,
  })
  console.log('Created enrollment:', created.id || seed.externalId)
}

async function main() {
  const secret = process.env.PAYLOAD_SECRET || 'dev-secret-change-me'
  const dbUrl = process.env.DATABASE_URL || 'file:./payload.db'

  const config = buildConfig({
    secret,
    collections: featureCollections,
    db: sqliteAdapter({ client: { url: dbUrl } }),
  })

  await payload.init({ secret, config })

  const now = new Date()
  const seeds = [
    {
      externalId: 'enroll-1',
      userId: 'demo-user',
      courseExternalId: 'course-communication',
      progressPercent: 64,
      status: 'active',
      enrolledAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 75).toISOString(),
      lastAccessedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
    {
      externalId: 'enroll-2',
      userId: 'demo-user',
      courseExternalId: 'course-study-methods',
      progressPercent: 20,
      status: 'active',
      enrolledAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 50).toISOString(),
      lastAccessedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    },
    {
      externalId: 'enroll-3',
      userId: 'demo-user',
      courseExternalId: 'course-problem-solving',
      progressPercent: 100,
      status: 'completed',
      enrolledAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 120).toISOString(),
      lastAccessedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    },
  ]

  console.log('Seeding enrollments:', seeds.length)

  for (const seed of seeds) {
    const courseId = await getCourseInternalIdByExternalId(seed.courseExternalId)
    if (!courseId) {
      console.warn('Skipping enrollment, course not found:', seed.externalId, seed.courseExternalId)
      continue
    }

    await upsertEnrollment({
      externalId: seed.externalId,
      userId: seed.userId,
      course: courseId,
      courseId: seed.courseExternalId,
      progressPercent: seed.progressPercent,
      status: seed.status,
      enrolledAt: seed.enrolledAt,
      lastAccessedAt: seed.lastAccessedAt,
    })
  }

  try {
    if (payload && typeof payload.destroy === 'function') await payload.destroy()
  } catch {
    // ignore
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
