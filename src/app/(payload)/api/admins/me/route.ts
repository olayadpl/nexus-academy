import { NextResponse } from "next/server"
import config from "@payload-config"
import { getPayload } from "payload"

function readCookieToken(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null

  for (const pair of cookieHeader.split(";")) {
    const [rawName, ...rest] = pair.trim().split("=")
    const name = rawName?.trim()
    if (!name) continue
    if (name === "payload-token" || name === "payloadcs-token") {
      const value = rest.join("=").trim()
      if (value) return value
    }
  }

  return null
}

export async function GET(req: Request) {
  const payload = await getPayload({ config })
  const headers = new Headers(req.headers)

  if (!headers.get("authorization")) {
    const cookieToken = readCookieToken(req.headers.get("cookie"))
    if (cookieToken) {
      headers.set("authorization", `Bearer ${cookieToken}`)
    }
  }

  const { user } = await payload.auth({ headers })
  return NextResponse.json({
    user: user ?? null,
    message: "Account",
    collection: user ? "admins" : undefined,
    strategy: user ? "local-jwt" : undefined,
  })
}

