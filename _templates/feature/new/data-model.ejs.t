---
to: src/features/<%= h.changeCase.kebab(name) %>/data/models/<%= h.changeCase.kebab(entity) %>.model.ts
---
import type { <%= h.changeCase.pascal(entity) %>Entity } from "../../domain/entities/<%= h.changeCase.kebab(entity) %>.entity"

export interface <%= h.changeCase.pascal(entity) %>Model {
  id: string
}

export function toEntity(model: <%= h.changeCase.pascal(entity) %>Model): <%= h.changeCase.pascal(entity) %>Entity {
  return {
    id: model.id,
  }
}

export function fromEntity(entity: <%= h.changeCase.pascal(entity) %>Entity): <%= h.changeCase.pascal(entity) %>Model {
  return {
    id: entity.id,
  }
}
