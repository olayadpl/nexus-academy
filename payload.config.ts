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

function getCSRFAllowList() {
  const urls = new Set<string>([
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    getServerURL(),
  ])

  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim()
  if (appUrl) urls.add(appUrl)

  return Array.from(urls)
}

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  serverURL: getServerURL(),
  cookiePrefix: process.env.CODESPACE_NAME ? "payloadcs" : "payload",
  auth: {
    jwtOrder: ["cookie", "JWT", "Bearer"],
  },
  csrf: getCSRFAllowList(),
  localization: {
    locales: [
      { label: "Español", code: "es" },
      { label: "English", code: "en" },
    ],
    defaultLocale: "es",
    fallback: true,
  },
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