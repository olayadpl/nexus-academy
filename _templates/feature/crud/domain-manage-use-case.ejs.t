---
to: src/features/<%= h.changeCase.kebab(name) %>/domain/use-cases/manage-<%= h.changeCase.kebab(entity) %>.use-case.ts
unless_exists: true
---
import type { <%= h.changeCase.pascal(entity) %>Entity } from "../entities/<%= h.changeCase.kebab(entity) %>.entity"
import type { I<%= h.changeCase.pascal(entity) %>Repository } from "../repositories/<%= h.changeCase.kebab(entity) %>.repository"

export class Manage<%= h.changeCase.pascal(entity) %>UseCase {
  constructor(private readonly repository: I<%= h.changeCase.pascal(entity) %>Repository) {}

  async create(entity: <%= h.changeCase.pascal(entity) %>Entity): Promise<<%= h.changeCase.pascal(entity) %>Entity> {
    return this.repository.create(entity)
  }

  async update(
    id: string,
    entity: Partial<<%= h.changeCase.pascal(entity) %>Entity>,
  ): Promise<<%= h.changeCase.pascal(entity) %>Entity | null> {
    return this.repository.update(id, entity)
  }

  async getById(id: string): Promise<<%= h.changeCase.pascal(entity) %>Entity | null> {
    return this.repository.getById(id)
  }

  async getAll(): Promise<<%= h.changeCase.pascal(entity) %>Entity[]> {
    return this.repository.getAll()
  }

  async deleteById(id: string): Promise<boolean> {
    return this.repository.deleteById(id)
  }
}
