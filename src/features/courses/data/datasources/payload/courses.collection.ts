import type { CollectionConfig } from "payload"
import { lexicalEditor } from "@payloadcms/richtext-lexical"

export const CoursesCollection: CollectionConfig = {
  slug: "courses",
  versions: {
    drafts: {
      maxPerDoc: 50,
    },
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
      unique: true,
    },
    {
      name: "description",
      type: "richText",
      editor: lexicalEditor({}),
      required: true,
    },
    {
      name: "level",
      type: "select",
      required: true,
      options: ["beginner", "intermediate", "advanced"],
      defaultValue: "beginner",
    },
    {
      name: "duration",
      type: "group",
      fields: [
        {
          name: "hours",
          type: "number",
          required: true,
          min: 0,
          defaultValue: 0,
        },
        {
          name: "minutes",
          type: "number",
          required: true,
          min: 0,
          max: 59,
          defaultValue: 0,
        },
      ],
    },
    {
      name: "rating",
      type: "number",
      required: true,
      min: 0,
      max: 5,
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "reviewCount",
      type: "number",
      required: true,
      min: 0,
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "featured",
      type: "checkbox",
      required: true,
      defaultValue: false,
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "author",
      type: "group",
      fields: [
        {
          name: "name",
          type: "text",
        },
        {
          name: "avatar",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "modules",
      type: "array",
      labels: {
        singular: "Modulo",
        plural: "Modulos",
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "id",
          type: "text",
          required: true,
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "resources",
          type: "blocks",
          labels: {
            singular: "Recurso",
            plural: "Recursos",
          },
          blocks: [
            {
              slug: "video",
              labels: {
                singular: "Video",
                plural: "Videos",
              },
              fields: [
                {
                  name: "id",
                  type: "text",
                  required: true,
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                },
                {
                  name: "videoFile",
                  type: "upload",
                  relationTo: "media",
                },
                {
                  name: "youtubeUrl",
                  type: "text",
                },
                {
                  name: "duration",
                  type: "group",
                  fields: [
                    {
                      name: "hours",
                      type: "number",
                      required: true,
                      min: 0,
                      defaultValue: 0,
                    },
                    {
                      name: "minutes",
                      type: "number",
                      required: true,
                      min: 0,
                      max: 59,
                      defaultValue: 0,
                    },
                  ],
                },
                {
                  name: "isPreview",
                  type: "checkbox",
                  required: true,
                  defaultValue: false,
                },
              ],
            },
            {
              slug: "document",
              labels: {
                singular: "Documento",
                plural: "Documentos",
              },
              fields: [
                {
                  name: "id",
                  type: "text",
                  required: true,
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                },
                {
                  name: "documentFile",
                  type: "upload",
                  relationTo: "media",
                },
                {
                  name: "pages",
                  type: "number",
                  min: 1,
                },
              ],
            },
            {
              slug: "quiz",
              labels: {
                singular: "Cuestionario",
                plural: "Cuestionarios",
              },
              fields: [
                {
                  name: "id",
                  type: "text",
                  required: true,
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                },
                {
                  name: "quizRef",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "thumbnailUrl",
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "authorName",
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "authorAvatarUrl",
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "durationHours",
      type: "number",
      min: 0,
      admin: {
        hidden: true,
      },
    },
    {
      name: "progress",
      type: "number",
      min: 0,
      max: 100,
      admin: {
        hidden: true,
      },
    },
  ],
}
