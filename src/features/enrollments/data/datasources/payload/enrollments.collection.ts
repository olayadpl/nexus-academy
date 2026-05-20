import type { CollectionConfig } from "payload"

export const EnrollmentsCollection: CollectionConfig = {
  slug: "enrollments",
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
      unique: true,
      index: true,
    },
    {
      name: "userId",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "course",
      type: "relationship",
      relationTo: "courses",
      required: true,
      index: true,
    },
    {
      name: "progressPercent",
      type: "number",
      required: true,
      min: 0,
      max: 100,
      defaultValue: 0,
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      options: ["active", "completed", "paused"],
    },
    {
      name: "enrolledAt",
      type: "date",
      required: true,
    },
    {
      name: "lastAccessedAt",
      type: "date",
      required: true,
    },
    {
      name: "courseId",
      type: "text",
      admin: {
        hidden: true,
      },
    },
  ],
}
