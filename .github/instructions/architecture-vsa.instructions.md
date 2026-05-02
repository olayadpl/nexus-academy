---
applyTo: "src/features/**,payload.config.ts"
description: "Usar cuando se implemente o refactorice código por funcionalidades (slices), capas de Clean Architecture y configuración de Payload por feature."
---

# Clean + Vertical Slice (Reglas del repositorio)

## Estructura por slice

- Organizar por funcionalidades en src/features/[feature-name].
- El 90% del código debe vivir en src/features/.
- Cada feature debe contener:
  - domain/: entidades, contratos de repositorio y use cases.
  - data/: implementación (datasources, mappers, repositorios, payload).
  - presentation/: componentes, screens y states de presentación.

## Regla de naming de capas

- Usar data como nombre de la capa de implementación.
- No usar infrastructure en este repositorio.

## Reglas de Payload por feature

- Definir colecciones en src/features/[feature]/data/datasources/payload/.
- En payload.config.ts solo importar y registrar colecciones por feature.
- No usar tipos de Payload dentro de domain/.

## Regla de mapeo

- Todo dato que venga de Payload debe pasar por data/mappers/.
- Domain y Presentation no consumen documentos de Payload directamente.

## Comunicación entre slices

- Si una feature necesita datos de otra, hacerlo mediante contratos de repositorio (domain).
- Nunca acceder directamente al data/ de otra feature.

## Use cases CRUD

- Para CRUD de una misma entidad, preferir un use case unificado en un archivo (ejemplo: manage-course.ts).
- Evitar dispersar create/update/get/delete de la misma entidad en múltiples use cases separados, salvo justificación fuerte.

## Convenciones adicionales

- Componentes base compartidos en src/core/ui/components.
- Utilidades compartidas de UI en src/core/ui/lib/utils.
- Server actions deben mapear errores de dominio (Failure) a errores de aplicación (AppError).
