import path from "node:path"
import { fileURLToPath } from "node:url"

import { sqliteAdapter } from "@payloadcms/db-sqlite"
import { buildConfig } from "payload"

import { featureCollections } from "./src/payload-collections.generated"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  collections: featureCollections,
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || "file:./payload.db",
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
})
