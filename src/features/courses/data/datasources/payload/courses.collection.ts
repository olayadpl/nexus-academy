import type { CollectionConfig } from "payload"

export const CoursesCollection: CollectionConfig = {
  slug: "courses",
  fields: [
    {
      name: "externalId",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "bibliographicBase",
      type: "textarea",
      required: true,
    },
    {
      name: "isCraiModel",
      type: "checkbox",
      required: true,
      defaultValue: false,
    },
    {
      name: "level",
      type: "select",
      required: true,
      options: ["beginner", "intermediate", "advanced"],
      defaultValue: "beginner",
    },
    {
      name: "durationHours",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "rating",
      type: "number",
      required: true,
      min: 0,
      max: 5,
      defaultValue: 0,
    },
    {
      name: "reviewCount",
      type: "number",
      required: true,
      min: 0,
      defaultValue: 0,
    },
    {
      name: "featured",
      type: "checkbox",
      required: true,
      defaultValue: false,
    },
    {
      name: "progress",
      type: "number",
      min: 0,
      max: 100,
      defaultValue: 0,
    },
    {
      name: "thumbnailUrl",
      type: "text",
      required: true,
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "authorName",
      type: "text",
    },
    {
      name: "authorAvatarUrl",
      type: "text",
    },
    {
      name: "modules",
      type: "array",
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
          name: "type",
          type: "select",
          required: true,
          options: ["video", "pdf"],
        },
        {
          name: "resourceUrl",
          type: "text",
          required: true,
        },
        {
          name: "durationMinutes",
          type: "number",
          required: true,
          min: 1,
        },
        {
          name: "completed",
          type: "checkbox",
          required: true,
          defaultValue: false,
        },
      ],
    },
  ],
}
