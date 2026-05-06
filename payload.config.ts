import path from "node:path"
import { fileURLToPath } from "node:url"

import { sqliteAdapter } from "@payloadcms/db-sqlite"
import { buildConfig } from "payload"

import { featureCollections } from "./src/payload-collections.generated"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function getServerURL() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim()
  if (appUrl) return appUrl

  const codespaceName = process.env.CODESPACE_NAME
  const forwardingDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN
  if (codespaceName && forwardingDomain) {
    return `https://${codespaceName}-3000.${forwardingDomain}`
  }

  return "http://localhost:3000"
}

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  serverURL: getServerURL(),
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
