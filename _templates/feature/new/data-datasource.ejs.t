---
to: src/features/<%= h.changeCase.kebab(name) %>/data/datasources/<%= h.changeCase.kebab(entity) %>.remote-datasource.ts
---
import type { <%= h.changeCase.pascal(entity) %>Model } from "../models/<%= h.changeCase.kebab(entity) %>.model"

export interface I<%= h.changeCase.pascal(entity) %>RemoteDataSource {
  create(model: <%= h.changeCase.pascal(entity) %>Model): Promise<<%= h.changeCase.pascal(entity) %>Model>
  update(id: string, model: Partial<<%= h.changeCase.pascal(entity) %>Model>): Promise<<%= h.changeCase.pascal(entity) %>Model | null>
  getById(id: string): Promise<<%= h.changeCase.pascal(entity) %>Model | null>
  getAll(): Promise<<%= h.changeCase.pascal(entity) %>Model[]>
  deleteById(id: string): Promise<boolean>
}

export class <%= h.changeCase.pascal(entity) %>RemoteDataSource implements I<%= h.changeCase.pascal(entity) %>RemoteDataSource {
  async create(model: <%= h.changeCase.pascal(entity) %>Model): Promise<<%= h.changeCase.pascal(entity) %>Model> {
    return model
  }

  async update(_id: string, _model: Partial<<%= h.changeCase.pascal(entity) %>Model>): Promise<<%= h.changeCase.pascal(entity) %>Model | null> {
    return null
  }

  async getById(_id: string): Promise<<%= h.changeCase.pascal(entity) %>Model | null> {
    return null
  }

  async getAll(): Promise<<%= h.changeCase.pascal(entity) %>Model[]> {
    return []
  }

  async deleteById(_id: string): Promise<boolean> {
    return false
  }
}
