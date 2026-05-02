#!/usr/bin/env node
import { existsSync } from "node:fs"
import { join } from "node:path"
import { spawnSync } from "node:child_process"

const [feature, ...entities] = process.argv.slice(2)

if (!feature || entities.length === 0) {
  console.error("Uso: pnpm gen:feature:multi <feature> <entity1> [entity2] [entity3] ...")
  process.exit(1)
}

function runHygen(action, featureName, entityName) {
  const result = spawnSync(
    "pnpm",
    ["exec", "hygen", "feature", action, "--name", featureName, "--entity", entityName],
    { stdio: "inherit" },
  )

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

const featureDir = join(process.cwd(), "src", "features", feature)

if (!existsSync(featureDir)) {
  runHygen("new", feature, entities[0])

  for (const entity of entities.slice(1)) {
    runHygen("new", feature, entity)
  }
} else {
  for (const entity of entities) {
    runHygen("new", feature, entity)
  }
}

console.log("\nGeneracion multi-entidad completada.")
