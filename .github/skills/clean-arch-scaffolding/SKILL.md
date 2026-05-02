---
name: clean-arch-scaffolding
description: "Use when creating or extending features with Clean Architecture scaffolding in this repo: generate feature slices, domain/data/presentation skeletons, manage-<entity>.use-case CRUD grouped use cases, hygen templates, and generator scripts. Keywords: scaffold, scaffolding, hygen, feature generator, clean architecture, vertical slice, CRUD use case, manage-course, template generation."
---

# Clean Arch Scaffolding Skill

## Purpose

Standardize and speed up feature generation for this Next.js repository using Clean Architecture and vertical slices.

This skill is optimized for:
- Creating new features under src/features/<feature-name>
- Creating entities independent from feature name via --entity
- Creating multiple entities inside one feature in a single command
- Maintaining repo naming conventions and layer boundaries
- Enforcing grouped CRUD use cases in a single manage-<entity>.use-case.ts file
- Keeping presentation structure aligned with this workspace

## Repository Rules To Enforce

- Use pnpm for install and scripts.
- Keep code in feature slices under src/features.
- Keep layer naming as domain, data, presentation.
- Do not place Payload types in domain.
- Prefer grouped CRUD use case for one entity in one file.
- Keep Payload collections under data/datasources/payload.
- For generated presentation layer in this repo, use only:
  - presentation/components
  - presentation/screens
  - presentation/states

## Recommended Workflow

1. Confirm prerequisites.
- Ensure hygen is installed as dev dependency.
- Ensure templates exist in _templates/feature/new and _templates/feature/crud.

2. Generate feature skeleton.
- Run: pnpm gen:feature <feature-name> <entity-name>
- Example: pnpm gen:feature learning course
- For multiple entities in one run: pnpm gen:feature:multi <feature-name> <entity1> <entity2> ...

3. Ensure grouped CRUD use case exists.
- Run: pnpm gen:feature:crud <feature-name> <entity-name>
- If manage-<entity-name>.use-case.ts already exists, keep it and avoid overwriting unless requested.

4. Verify generated structure.
- Required files:
  - domain/entities/<entity>.entity.ts
  - domain/repositories/<entity>.repository.ts
  - domain/use-cases/manage-<entity>.use-case.ts
  - data/models/<entity>.model.ts
  - data/datasources/<entity>.remote-datasource.ts
  - data/repositories/<entity>.repository-impl.ts
  - presentation/components/.gitkeep
  - presentation/screens/.gitkeep
  - presentation/states/.gitkeep

5. Validate quality gates.
- Model has both toEntity and fromEntity mapping.
- Repository implementation injects datasource via constructor.
- Domain repository exposes grouped CRUD methods.
- TypeScript signatures are strict and explicit.
- Run architecture path guard: pnpm ci:arch

## Command Reference

- Generate full feature:
```bash
pnpm gen:feature <feature> <entity>
```

- Generate full feature in one step (recommended):
```bash
pnpm gen:feature:full <feature> <entity>
```

- Generate or reinforce grouped CRUD use case:
```bash
pnpm gen:feature:crud <feature> <entity>
```

- Generate multiple entities in same feature:
```bash
pnpm gen:feature:multi <feature> <entity1> <entity2> <entity3>
```

- Quick inspect generated files:
```bash
find src/features/<feature> -maxdepth 5 -type f | sort
```

- Validate payload path conventions (local and CI):
```bash
pnpm ci:arch
```

## Definition Of Done

- Feature folder exists and follows the expected layers.
- Grouped CRUD use case is present and compiles.
- Data model includes toEntity/fromEntity.
- No accidental cross-feature data-layer coupling.
- No unrelated files were modified.

## Anti-Patterns To Avoid

- Generating separate create/update/delete/get use case files for the same entity by default.
- Assuming the feature name must match the entity name.
- Introducing presentation/hooks for new scaffolds in this repo profile.
- Importing Payload-specific types into domain files.
- Using npm/yarn commands in this repository.
