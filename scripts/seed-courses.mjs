import payload from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { buildConfig } from 'payload'
import { mkdir, access, writeFile } from 'node:fs/promises'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { featureCollections } from '../src/payload-collections.generated.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const projectRoot = path.resolve(dirname, '..')

const IMAGE_ASSETS = [
  {
    publicPath: '/images/course4.png',
    url: 'https://picsum.photos/seed/section-video-course4/1200/630',
  },
  {
    publicPath: '/images/course5.png',
    url: 'https://picsum.photos/seed/section-video-course5/1200/630',
  },
  {
    publicPath: '/images/course6.png',
    url: 'https://picsum.photos/seed/section-video-course6/1200/630',
  },
  {
    publicPath: '/images/course-programming.jpg',
    url: 'https://picsum.photos/seed/section-video-programming/1280/720',
  },
  {
    publicPath: '/images/course-design.jpg',
    url: 'https://picsum.photos/seed/section-video-design/1280/720',
  },
  {
    publicPath: '/images/course-databases.jpg',
    url: 'https://picsum.photos/seed/section-video-databases/1280/720',
  },
]

async function fileExists(absolutePath) {
  try {
    await access(absolutePath)
    return true
  } catch {
    return false
  }
}

async function fetchFileByURL(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

async function ensureImageAssets() {
  for (const asset of IMAGE_ASSETS) {
    const absolutePath = path.join(projectRoot, 'public', asset.publicPath.replace(/^\//, ''))
    const assetDir = path.dirname(absolutePath)

    await mkdir(assetDir, { recursive: true })

    const exists = await fileExists(absolutePath)
    if (exists) {
      continue
    }

    try {
      const fileBuffer = await fetchFileByURL(asset.url)
      await writeFile(absolutePath, fileBuffer)
      console.log('Downloaded image asset:', asset.publicPath)
    } catch (error) {
      console.warn('Could not download image asset:', asset.publicPath, error)
    }
  }
}

async function ensureMediaForCourse(course) {
  try {
    const thumbnailPath = course.thumbnailUrl?.replace(/^\//, '')
    if (!thumbnailPath) return null

    const absolutePath = path.join(projectRoot, 'public', thumbnailPath)
    const basename = path.basename(absolutePath)

    // Try to find existing media by filename
    const found = await payload.find({
      collection: 'media',
      limit: 1,
      where: {
        filename: { equals: basename },
      },
      overrideAccess: true,
    })

    if (found.docs && found.docs.length > 0) {
      return found.docs[0]
    }

    // Read file and create media
    const fileBuffer = await readFile(absolutePath)
    const ext = path.extname(basename).replace(/^\./, '') || 'jpg'
    const fileObj = {
      name: basename,
      data: fileBuffer,
      mimetype: `image/${ext}`,
      size: fileBuffer.length,
    }

    const created = await payload.create({
      collection: 'media',
      data: {
        alt: course.title,
      },
      file: fileObj,
      overrideAccess: true,
    })

    console.log('Created media for', course.externalId, basename)
    return created
  } catch (err) {
    console.warn('Could not create media for', course.externalId, err.message || err)
    return null
  }
}

function toLexicalRichText(text) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: null,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: null,
          textFormat: 0,
          textStyle: '',
          children: [
            {
              type: 'text',
              version: 1,
              text: text || '',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
            },
          ],
        },
      ],
    },
  }
}

function toDurationGroup(durationHours) {
  const safe = Math.max(0, Number(durationHours) || 0)
  const hours = Math.floor(safe)
  const minutes = Math.round((safe - hours) * 60)

  return {
    hours: hours + Math.floor(minutes / 60),
    minutes: minutes % 60,
  }
}

function toResourceBlock(lesson, idx, externalId) {
  const resourceId = lesson.id || `${externalId}-resource-${idx + 1}`
  const durationMinutes = Math.max(1, Number(lesson.durationMinutes) || 1)
  const duration = {
    hours: Math.floor(durationMinutes / 60),
    minutes: durationMinutes % 60,
  }

  if (lesson.type === 'pdf') {
    return {
      blockType: 'document',
      id: resourceId,
      title: lesson.title,
    }
  }

  if (lesson.type === 'form') {
    return {
      blockType: 'quiz',
      id: resourceId,
      title: lesson.title,
      quizRef: lesson.formId || resourceId,
    }
  }

  return {
    blockType: 'video',
    id: resourceId,
    title: lesson.title,
    youtubeUrl: lesson.resourceUrl,
    duration,
    isPreview: false,
  }
}

function normalizeCourseForPayload(course, media) {
  const legacyModules = Array.isArray(course.modules) ? course.modules : []

  return {
    externalId: course.externalId,
    title: course.title,
    description: toLexicalRichText(course.description),
    level: course.level,
    duration: toDurationGroup(course.durationHours),
    durationHours: course.durationHours,
    rating: course.rating,
    reviewCount: course.reviewCount,
    featured: Boolean(course.featured),
    progress: Number(course.progress) || 0,
    thumbnail: media?.id,
    thumbnailUrl: media?.url || course.thumbnailUrl,
    author: {
      name: course.authorName,
    },
    authorName: course.authorName,
    authorAvatarUrl: course.authorAvatarUrl,
    modules: legacyModules.map((lesson, idx) => ({
      id: lesson.id || `${course.externalId}-module-${idx + 1}`,
      title: lesson.title || `Modulo ${idx + 1}`,
      resources: [toResourceBlock(lesson, idx, course.externalId)],
    })),
  }
}

/**
 * Seed de cursos idempotente.
 * Si existe un curso por externalId, lo actualiza; si no existe, lo crea.
 */
async function main() {
  const secret = process.env.PAYLOAD_SECRET || 'dev-secret-change-me'
  const dbUrl = process.env.DATABASE_URL || 'file:./payload.db'

  const config = buildConfig({
    secret,
    collections: featureCollections,
    db: sqliteAdapter({ client: { url: dbUrl } }),
  })

  await payload.init({ secret, config })
  await ensureImageAssets()

  const courses = [
    {
      externalId: 'course-communication',
      title: 'Speak Confidently',
      description:
        'Comunicacion interpersonal aplicada al contexto academico. En este curso se exploraran tecnicas practicas para mejorar la comunicacion en entornos academicos y profesionales.',
      bibliographicBase: 'Interpersonal Communication Foundations',
      isCraiModel: true,
      level: 'beginner',
      durationHours: 1.2,
      rating: 4.5,
      reviewCount: 14115,
      featured: true,
      progress: 34,
      thumbnailUrl: '/images/course1.png',
      authorName: 'Dr. Mark Elliot',
      authorAvatarUrl: 'https://i.pravatar.cc/150?u=course-communication',
      modules: [
        {
          id: 'lesson-1',
          title: '01: Learn The Alphabets',
          type: 'video',
          resourceUrl: '/images/course-thumbnail.jpg',
          durationMinutes: 20,
          completed: true,
        },
        {
          id: 'lesson-2',
          title: '02: Touch The Grass',
          type: 'video',
          resourceUrl: '/images/course-thumbnail.jpg',
          durationMinutes: 23,
          completed: false,
        },
        {
          id: 'lesson-3',
          title: '03: Practice, Practice, Practice',
          type: 'pdf',
          resourceUrl: '/docs/practice-guide.pdf',
          durationMinutes: 112,
          completed: false,
        },
      ],
    },
    {
      externalId: 'course-study-methods',
      title: 'Study Methods',
      description: 'Estrategias de estudio para carreras de ciencias informaticas.',
      bibliographicBase: 'Cognitive Learning Methods',
      isCraiModel: true,
      level: 'intermediate',
      durationHours: 2.1,
      rating: 4.7,
      reviewCount: 5620,
      featured: false,
      progress: 0,
      thumbnailUrl: '/images/course2.png',
      authorName: 'Sarah Connors',
      authorAvatarUrl: 'https://i.pravatar.cc/150?u=course-study-methods',
      modules: [
        {
          id: 'study-1',
          title: '01: Planificacion por bloques',
          type: 'video',
          resourceUrl: '/images/course-thumbnail.jpg',
          durationMinutes: 42,
          completed: false,
        },
        {
          id: 'study-2',
          title: '02: Active recall',
          type: 'pdf',
          resourceUrl: '/docs/practice-guide.pdf',
          durationMinutes: 36,
          completed: false,
        },
      ],
    },
    {
      externalId: 'course-problem-solving',
      title: 'Problem Solving',
      description: 'Metodo practico para resolver problemas complejos paso a paso.',
      bibliographicBase: 'Analytical Thinking Essentials',
      isCraiModel: true,
      level: 'advanced',
      durationHours: 1.8,
      rating: 4.6,
      reviewCount: 3870,
      featured: false,
      progress: 0,
      thumbnailUrl: '/images/course3.png',
      authorName: 'Ana Rios',
      authorAvatarUrl: 'https://i.pravatar.cc/150?u=course-problem-solving',
      modules: [
        {
          id: 'solve-1',
          title: '01: Descomposicion del problema',
          type: 'video',
          resourceUrl: '/images/course-thumbnail.jpg',
          durationMinutes: 38,
          completed: false,
        },
        {
          id: 'solve-2',
          title: '02: Estrategias de solucion',
          type: 'pdf',
          resourceUrl: '/docs/practice-guide.pdf',
          durationMinutes: 24,
          completed: false,
        },
      ],
    },
    {
      externalId: 'course-programming',
      title: 'Introduction to Programming',
      description: 'Fundamentos de programacion: variables, control de flujo y estructuras de datos.',
      bibliographicBase: 'Intro to CS',
      isCraiModel: false,
      level: 'beginner',
      durationHours: 3.5,
      rating: 4.4,
      reviewCount: 980,
      featured: false,
      progress: 0,
      thumbnailUrl: '/images/course4.png',
      authorName: 'Carlos Lopez',
      authorAvatarUrl: 'https://i.pravatar.cc/150?u=course-programming',
      modules: [
        {
          id: 'prog-1',
          title: 'Variables y tipos',
          type: 'video',
          resourceUrl: '/images/course-programming.jpg',
          durationMinutes: 30,
          completed: false,
        },
        {
          id: 'prog-2',
          title: 'Control de flujo',
          type: 'video',
          resourceUrl: '/images/course-programming.jpg',
          durationMinutes: 45,
          completed: false,
        },
        {
          id: 'prog-3',
          title: 'Estructuras de datos',
          type: 'pdf',
          resourceUrl: '/docs/datastructures.pdf',
          durationMinutes: 60,
          completed: false,
        },
      ],
    },
    {
      externalId: 'course-design-ui',
      title: 'UI Design Basics',
      description: 'Principios de diseno visual y experiencia de usuario para interfaces.',
      bibliographicBase: 'Design Systems',
      isCraiModel: false,
      level: 'intermediate',
      durationHours: 2.8,
      rating: 4.6,
      reviewCount: 420,
      featured: false,
      progress: 0,
      thumbnailUrl: '/images/course5.png',
      authorName: 'Mariana Diaz',
      authorAvatarUrl: 'https://i.pravatar.cc/150?u=course-design-ui',
      modules: [
        {
          id: 'ui-1',
          title: 'Principios visuales',
          type: 'video',
          resourceUrl: '/images/course-design.jpg',
          durationMinutes: 25,
          completed: false,
        },
        {
          id: 'ui-2',
          title: 'Prototipado',
          type: 'video',
          resourceUrl: '/images/course-design.jpg',
          durationMinutes: 40,
          completed: false,
        },
      ],
    },
    {
      externalId: 'course-databases',
      title: 'Databases 101',
      description: 'Modelado relacional, consultas SQL y optimizacion basica.',
      bibliographicBase: 'Database Systems',
      isCraiModel: false,
      level: 'beginner',
      durationHours: 2.4,
      rating: 4.3,
      reviewCount: 310,
      featured: false,
      progress: 0,
      thumbnailUrl: '/images/course6.png',
      authorName: 'Luis Garcia',
      authorAvatarUrl: 'https://i.pravatar.cc/150?u=course-databases',
      modules: [
        {
          id: 'db-1',
          title: 'Modelado relacional',
          type: 'video',
          resourceUrl: '/images/course-databases.jpg',
          durationMinutes: 35,
          completed: false,
        },
        {
          id: 'db-2',
          title: 'SQL basico',
          type: 'pdf',
          resourceUrl: '/docs/sql-basics.pdf',
          durationMinutes: 50,
          completed: false,
        },
      ],
    },
  ]

  console.log('Seeding courses:', courses.length)

  for (const course of courses) {
    try {
      // ensure media is created and attach its id to `thumbnail` field
      const media = await ensureMediaForCourse(course)
      const payloadCourse = normalizeCourseForPayload(course, media)

      const existing = await payload.find({
        collection: 'courses',
        limit: 1,
        depth: 0,
        where: {
          externalId: {
            equals: course.externalId,
          },
        },
        overrideAccess: true,
      })

      const fallbackByTitle =
        existing.docs[0] ||
        (
          await payload.find({
            collection: 'courses',
            limit: 1,
            depth: 0,
            where: {
              title: {
                equals: course.title,
              },
            },
            overrideAccess: true,
          })
        ).docs[0]

        if (fallbackByTitle) {
        const updated = await payload.update({
          collection: 'courses',
          id: fallbackByTitle.id,
          data: { ...payloadCourse, _status: 'published' },
          overrideAccess: true,
        })
        console.log('Updated course:', updated.id || course.externalId)
      } else {
        const created = await payload.create({
          collection: 'courses',
          data: { ...payloadCourse, _status: 'published' },
          overrideAccess: true,
        })
        console.log('Created course:', created.id || course.externalId)
      }

      const sameTitle = await payload.find({
        collection: 'courses',
        limit: 100,
        depth: 0,
        where: {
          title: {
            equals: course.title,
          },
        },
        overrideAccess: true,
      })

      const docs = sameTitle.docs
      if (docs.length > 1) {
        const keeper = docs.find((doc) => doc.externalId === course.externalId) ?? docs[0]
        const extras = docs.filter((doc) => doc.id !== keeper.id)

        for (const extra of extras) {
          await payload.delete({
            collection: 'courses',
            id: extra.id,
            overrideAccess: true,
          })
          console.log('Deleted duplicate course:', extra.id)
        }
      }
    } catch (err) {
      console.error('Error upserting course:', course.externalId, err)
    }
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
