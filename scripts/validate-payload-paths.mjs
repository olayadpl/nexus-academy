#!/usr/bin/env node
import { promises as fs } from "node:fs"
import path from "node:path"

const projectRoot = process.cwd()
const featuresRoot = path.join(projectRoot, "src", "features")

const SCAN_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".mjs", ".md", ".json"])
const FORBIDDEN_PATTERNS = [/data\/cms\//g, /datasources\/cms\//g]

const violations = []
let payloadCollectionCount = 0

async function walk(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true })

  for (const entry of entries) {
    const absolutePath = path.join(dirPath, entry.name)
    const relativePath = path.relative(projectRoot, absolutePath).replaceAll(path.sep, "/")

    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") {
        continue
      }

      if (entry.name === "cms") {
        violations.push(`Directorio prohibido detectado: ${relativePath}`)
      }

      await walk(absolutePath)
      continue
    }

    const ext = path.extname(entry.name)
    if (!SCAN_EXTENSIONS.has(ext)) {
      continue
    }

    if (
      relativePath.includes("/data/datasources/payload/") &&
      relativePath.endsWith(".collection.ts")
    ) {
      payloadCollectionCount += 1
    }

    const content = await fs.readFile(absolutePath, "utf8")
    for (const pattern of FORBIDDEN_PATTERNS) {
      if (pattern.test(content)) {
        violations.push(`Referencia prohibida en ${relativePath}: coincide con ${pattern}`)
      }
    }
  }
}

async function main() {
  try {
    await fs.access(featuresRoot)
  } catch {
    console.error("No se encontro src/features para validar.")
    process.exit(1)
  }

  await walk(featuresRoot)

  if (payloadCollectionCount === 0) {
    violations.push(
      "No se encontro ninguna coleccion en src/features/**/data/datasources/payload/*.collection.ts",
    )
  }

  if (violations.length > 0) {
    console.error("\nValidacion fallida de rutas Payload:\n")
    for (const violation of violations) {
      console.error(`- ${violation}`)
    }
    process.exit(1)
  }

  console.log("Validacion OK: no hay rastros de cms y Payload esta ubicado en data/datasources/payload.")
}

main().catch((error) => {
  console.error("Error ejecutando validacion de rutas Payload:", error)
  process.exit(1)
})
