---
to: src/features/<%= h.changeCase.kebab(name) %>/domain/entities/<%= h.changeCase.kebab(entity) %>.entity.ts
---
export interface <%= h.changeCase.pascal(entity) %>Entity {
  id: string
}
