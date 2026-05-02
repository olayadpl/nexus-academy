---
to: src/features/<%= h.changeCase.kebab(name) %>/data/repositories/<%= h.changeCase.kebab(entity) %>.repository-impl.ts
---
import type { <%= h.changeCase.pascal(entity) %>Entity } from "../../domain/entities/<%= h.changeCase.kebab(entity) %>.entity"
import type { I<%= h.changeCase.pascal(entity) %>Repository } from "../../domain/repositories/<%= h.changeCase.kebab(entity) %>.repository"
import type { I<%= h.changeCase.pascal(entity) %>RemoteDataSource } from "../datasources/<%= h.changeCase.kebab(entity) %>.remote-datasource"
import { fromEntity, toEntity } from "../models/<%= h.changeCase.kebab(entity) %>.model"

export class <%= h.changeCase.pascal(entity) %>RepositoryImpl implements I<%= h.changeCase.pascal(entity) %>Repository {
  constructor(private readonly remoteDataSource: I<%= h.changeCase.pascal(entity) %>RemoteDataSource) {}

  async create(entity: <%= h.changeCase.pascal(entity) %>Entity): Promise<<%= h.changeCase.pascal(entity) %>Entity> {
    const model = await this.remoteDataSource.create(fromEntity(entity))
    return toEntity(model)
  }

  async update(
    id: string,
    entity: Partial<<%= h.changeCase.pascal(entity) %>Entity>,
  ): Promise<<%= h.changeCase.pascal(entity) %>Entity | null> {
    const model = await this.remoteDataSource.update(id, entity)

    if (!model) {
      return null
    }

    return toEntity(model)
  }

  async getById(id: string): Promise<<%= h.changeCase.pascal(entity) %>Entity | null> {
    const model = await this.remoteDataSource.getById(id)

    if (!model) {
      return null
    }

    return toEntity(model)
  }

  async getAll(): Promise<<%= h.changeCase.pascal(entity) %>Entity[]> {
    const models = await this.remoteDataSource.getAll()
    return models.map(toEntity)
  }

  async deleteById(id: string): Promise<boolean> {
    return this.remoteDataSource.deleteById(id)
  }
}
