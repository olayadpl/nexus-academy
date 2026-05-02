---
to: src/features/<%= h.changeCase.kebab(name) %>/domain/repositories/<%= h.changeCase.kebab(entity) %>.repository.ts
---
import type { <%= h.changeCase.pascal(entity) %>Entity } from "../entities/<%= h.changeCase.kebab(entity) %>.entity"

export interface I<%= h.changeCase.pascal(entity) %>Repository {
  create(entity: <%= h.changeCase.pascal(entity) %>Entity): Promise<<%= h.changeCase.pascal(entity) %>Entity>
  update(id: string, entity: Partial<<%= h.changeCase.pascal(entity) %>Entity>): Promise<<%= h.changeCase.pascal(entity) %>Entity | null>
  getById(id: string): Promise<<%= h.changeCase.pascal(entity) %>Entity | null>
  getAll(): Promise<<%= h.changeCase.pascal(entity) %>Entity[]>
  deleteById(id: string): Promise<boolean>
}
