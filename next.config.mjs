import { withPayload } from "@payloadcms/next/withPayload"

const isCodespaces = Boolean(process.env.CODESPACE_NAME)
const devDistDir = process.env.NEXT_DEV_DIST_DIR || "/tmp/section-video-next"

function getTrustedActionOrigins() {
  const origins = new Set([
    "localhost:3000",
    "127.0.0.1:3000",
  ])

  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  if (appUrl) {
    try {
      origins.add(new URL(appUrl).host)
    } catch {
      // Ignore malformed env values.
    }
  }

  const codespaceName = process.env.CODESPACE_NAME
  const forwardingDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN

  if (codespaceName && forwardingDomain) {
    origins.add(`${codespaceName}-3000.${forwardingDomain}`)
  }

  origins.add("*.app.github.dev")

  return Array.from(origins)
}

function getAllowedDevOrigins() {
  const origins = new Set([
    "localhost",
    "127.0.0.1",
    "localhost:3000",
    "127.0.0.1:3000",
    "localhost:3001",
    "127.0.0.1:3001",
  ])

  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  if (appUrl) {
    try {
      origins.add(new URL(appUrl).host)
    } catch {
      // Ignore malformed env values.
    }
  }

  const codespaceName = process.env.CODESPACE_NAME
  const forwardingDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN

  if (codespaceName && forwardingDomain) {
    origins.add(`${codespaceName}-3000.${forwardingDomain}`)
    origins.add(`${codespaceName}-3001.${forwardingDomain}`)
  }

  origins.add("*.app.github.dev")

  return Array.from(origins)
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NODE_ENV === "development" && isCodespaces ? devDistDir : ".next",
  allowedDevOrigins: getAllowedDevOrigins(),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: getTrustedActionOrigins(),
    },
  },
}

export default withPayload(nextConfig)
