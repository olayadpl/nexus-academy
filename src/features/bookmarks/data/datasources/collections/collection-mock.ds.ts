import type { CollectionModel } from "../../models/collection.model"

const COLLECTION_FIXTURES: CollectionModel[] = []

const mockDb = new Map<string, CollectionModel>(COLLECTION_FIXTURES.map((item) => [item.id, item]))

export class CollectionMockDataSource {
  async create(model: CollectionModel): Promise<CollectionModel> {
    mockDb.set(model.id, model)
    return model
  }

  async update(id: string, model: Partial<CollectionModel>): Promise<CollectionModel> {
    const current = mockDb.get(id)
    if (!current) {
      throw new Error(`Collection ${id} not found`)
    }
    const updated: CollectionModel = { ...current, ...model, id: current.id, userId: current.userId }
    mockDb.set(id, updated)
    return updated
  }

  async getById(id: string): Promise<CollectionModel | null> {
    return mockDb.get(id) ?? null
  }

  async getByUserId(userId: string): Promise<CollectionModel[]> {
    return [...mockDb.values()]
      .filter((item) => item.userId === userId)
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  }

  async deleteById(id: string): Promise<void> {
    if (!mockDb.delete(id)) {
      throw new Error(`Collection ${id} not found`)
    }
  }
}