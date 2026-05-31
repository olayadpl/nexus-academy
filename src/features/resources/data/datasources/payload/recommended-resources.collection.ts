import path from "node:path"
import { promises as fs } from "node:fs"
import type { CollectionConfig } from "payload"

type MediaDoc = {
  id: string | number
  filename?: string | null
  url?: string | null
}

type HookDoc = {
  id?: string | number | null
  title?: string | null
  type?: "video" | "pdf" | null
  pdfFile?: string | number | MediaDoc | null
  thumbnail?: string | number | MediaDoc | null
}

type HookArgs = {
  doc?: HookDoc | null
  req: {
    payload: {
      findByID: (args: { collection: string; id: string | number; depth?: number; overrideAccess?: boolean }) => Promise<MediaDoc>
      create: (args: { collection: string; data: Record<string, unknown>; file: { data: Buffer; filename: string; mimeType: string }; overrideAccess?: boolean }) => Promise<MediaDoc>
      update: (args: { collection: string; id: string | number; data: Record<string, unknown>; overrideAccess?: boolean }) => Promise<unknown>
    }
  }
}

async function resolveMediaDoc(input: HookDoc["pdfFile"], payload: HookArgs["req"]["payload"]): Promise<MediaDoc | null> {
  if (!input) return null
  if (typeof input === "object") {
    if (input.filename || input.url) return input
    if (input.id != null) return payload.findByID({ collection: "media", id: input.id, depth: 0, overrideAccess: true })
  }

  return payload.findByID({ collection: "media", id: input, depth: 0, overrideAccess: true })
}

async function generateCoverFromPdf(pdfPath: string): Promise<Buffer> {
  const dynamicImport = new Function("modulePath", "return import(modulePath)")
  const pdfjsLib = await dynamicImport("pdfjs-dist/legacy/build/pdf.js")
  const { createCanvas } = await dynamicImport("@napi-rs/canvas")
  const data = await fs.readFile(pdfPath)
  const loadingTask = pdfjsLib.getDocument({ data, disableWorker: true })
  const pdf = await loadingTask.promise
  const page = await pdf.getPage(1)
  const viewport = page.getViewport({ scale: 1.2 })
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height))
  const context = canvas.getContext("2d")

  await page.render({ canvasContext: context, viewport }).promise

  return canvas.toBuffer("image/jpeg", { quality: 0.85 })
}

export const RecommendedResourcesCollection: CollectionConfig = {
  slug: "recommended-resources",
  labels: {
    singular: "Recurso recomendado",
    plural: "Recursos recomendados",
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "externalId",
      type: "text",
      required: true,
      index: true,
      unique: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: ["video", "pdf"],
      defaultValue: "video",
    },
    {
      name: "category",
      type: "text",
      required: true,
    },
    {
      name: "resourceUrl",
      type: "text",
    },
    {
      name: "pdfFile",
      type: "upload",
      relationTo: "media",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "pdf",
      },
    },
    {
      name: "authorName",
      type: "text",
    },
    {
      name: "durationMinutes",
      type: "number",
      min: 0,
      defaultValue: 0,
    },
    {
      name: "sortOrder",
      type: "number",
      min: 0,
      defaultValue: 0,
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }: HookArgs) => {
        if (!doc || doc.type !== "pdf") return
        if (doc.thumbnail) return

        const mediaDoc = await resolveMediaDoc(doc.pdfFile, req.payload)
        const filename = mediaDoc?.filename?.trim()
        if (!filename) return

        const pdfUrl = mediaDoc?.url?.trim() || `/uploads/${filename}`

        const pdfPath = path.join(process.cwd(), "public", "uploads", filename)

        try {
          const coverBuffer = await generateCoverFromPdf(pdfPath)
          const coverFile = await req.payload.create({
            collection: "media",
            data: {
              alt: doc.title ?? "PDF cover",
            },
            file: {
              data: coverBuffer,
              filename: `${doc.id ?? "pdf"}-cover.jpg`,
              mimeType: "image/jpeg",
            },
            overrideAccess: true,
          })

          if (doc.id != null && coverFile?.id != null) {
            await req.payload.update({
              collection: "recommended-resources",
              id: doc.id,
              data: {
                thumbnail: coverFile.id,
                resourceUrl: doc.resourceUrl?.trim() ? undefined : pdfUrl,
              },
              overrideAccess: true,
            })
          }
        } catch (error) {
          console.error("recommended-resources cover generation error:", error)
        }
      },
    ],
  },
}
