import type { CollectionConfig } from "payload"

export const AdminsCollection: CollectionConfig = {
  slug: "admins",
  auth: true,
  admin: { useAsTitle: "email" },
  access: {
    // Allow read access for admin UI (in development). If you need stricter rules,
    // replace with a function that checks the request user or admin context.
    read: () => true,
  },
  fields: [
    { name: "email", type: "email", required: true },
    { name: "name", type: "text" },
    { name: "password", type: "password", required: true },
  ],
}
