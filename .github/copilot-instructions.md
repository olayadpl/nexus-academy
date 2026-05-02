# Instrucciones del workspace

## Package manager y comandos

- Este proyecto usa `pnpm` como gestor principal.
- Usa `pnpm` para instalación y scripts (`pnpm install`, `pnpm dev`, `pnpm lint`, `pnpm build`, `pnpm start`).


## Arquitectura del código

- Feature principal en Clean Architecture: `src/features/learning`.
- Capas por feature:
	- `domain/`: entidades, contratos de repositorio y casos de uso.
	- `data/`: datasources, modelos/DTOs e implementación de repositorios.
	- `presentation/`: server actions, states, screens y componentes de UI de la feature.
- Núcleo compartido:
	- `src/core/error`: tipos de error (`Failure`, `AppError`).
	- `src/core/ui/components`: componentes shadcn/ui.
	- `src/core/ui/lib`: utilidades de UI (`utils.ts` con `cn`).
	- `src/core/ui/hooks`: hooks de UI compartidos.

## Convenciones de implementación

- Mantén los componentes base en `src/core/ui/components`; evita duplicar UI base en features.
- En features, importa UI base desde `@/src/core/ui/components/*` y utilidades desde `@/src/core/ui/lib/utils`.
- Nombres de archivos por capa (seguir patrón existente):
	- `*.entity.ts` (domain entities)
	- `*.repo.impl.ts` (repositorio concreto en data)
	- `*.ds.ts` (datasources)
	- `*.dto.ts` / `*.model.ts` (modelado de datos)
- Las server actions deben mapear errores de dominio (`Failure`) a errores de aplicación (`AppError`) en la capa de presentación.

## Instrucciones maestras de arquitectura (Clean + Vertical Slice)

- Organiza el código por funcionalidades (slices). Cada feature contiene sus capas de Clean Architecture.
- El 90% del código debe vivir en `src/features/`.
- Usa `data/` como nombre de capa de implementación. No usar `infrastructure/` en este repositorio.

Estructura objetivo por slice:

```text
src/
├── features/
│   ├── [feature-name]/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   ├── repositories/
│   │   │   └── usecases/
│   │   ├── data/
│   │   │   ├── datasources/
│   │   │   │   └── payload/
│   │   │   ├── mappers/
│   │   │   └── repositories/
│   │   └── presentation/
│   │       ├── components/
│   │       ├── screens/
│   │       └── states/
├── shared/
│   ├── components/
│   └── domain/
└── payload.config.ts
```

Reglas obligatorias para el agente:

- Pensar en slices antes de crear archivos: todo cambio debe pertenecer a una feature concreta.
- Aislamiento de Payload por feature:
	- Definir colecciones de Payload en `src/features/[feature]/data/datasources/payload/`.
	- En `payload.config.ts`, solo importar y registrar colecciones por feature.
	- No usar tipos de Payload dentro de `domain/`.
- Mapeo obligatorio: cualquier dato que venga de Payload debe pasar por un mapper en `data/mappers/` antes de llegar a `domain` o `presentation`.
- Comunicación entre slices: si una feature necesita datos de otra, hacerlo a través de contratos de repositorio de dominio, nunca accediendo a `data/` de otra feature.
- Para CRUD de una misma entidad (ej. curso), preferir un use case unificado en un solo archivo (ej. `manage-course.ts`) en lugar de múltiples use cases separados.

## Referencias

- Setup general y contexto del proyecto: `README.md`.
- Si aparece `Cannot find native binding` de Tailwind v4, reinstala dependencias en limpio con `pnpm` evitando lockfiles mezclados.