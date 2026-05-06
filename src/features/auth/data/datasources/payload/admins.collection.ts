import type { CollectionConfig } from "payload"

const isCodespaces = Boolean(process.env.CODESPACE_NAME)

export const AdminsCollection: CollectionConfig = {
  slug: "admins",
  auth: {
    // In Codespaces preview (embedded/cross-site), auth cookies need SameSite=None + Secure
    // to prevent login redirect loops back to /admin/login.
    cookies: isCodespaces
      ? {
          sameSite: "None",
          secure: true,
        }
      : {
          sameSite: "Lax",
          secure: false,
        },
  },
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
