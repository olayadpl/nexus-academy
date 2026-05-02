import type { IPreferenceRemoteDataSource } from "../preference.remote-datasource"
import type { PreferenceModel } from "../../models/preference.model"

const PREFERENCE_FIXTURES: PreferenceModel[] = [
  {
    id: "pref-demo-user",
    userId: "demo-user",
    language: "es",
    theme: "system",
    autoplay: true,
    subtitlesEnabled: true,
    playbackRate: 1,
    reduceMotion: false,
    updatedAt: "2026-03-29T21:00:00.000Z",
  },
]

const mockDb = new Map<string, PreferenceModel>(PREFERENCE_FIXTURES.map((item) => [item.id, item]))

export class PreferenceMockDataSource implements IPreferenceRemoteDataSource {
  async create(model: PreferenceModel): Promise<PreferenceModel> {
    if (mockDb.has(model.id)) {
      throw new Error(`Preference ${model.id} already exists`)
    }

    mockDb.set(model.id, model)
    return model
  }

  async update(id: string, model: Partial<PreferenceModel>): Promise<PreferenceModel> {
    const current = mockDb.get(id)

    if (!current) {
      throw new Error(`Preference ${id} not found`)
    }

    const updated: PreferenceModel = {
      ...current,
      ...model,
      id: current.id,
      userId: current.userId,
    }

    mockDb.set(id, updated)
    return updated
  }

  async getById(id: string): Promise<PreferenceModel | null> {
    return mockDb.get(id) ?? null
  }

  async getByUserId(userId: string): Promise<PreferenceModel | null> {
    for (const item of mockDb.values()) {
      if (item.userId === userId) {
        return item
      }
    }

    return null
  }

  async getAll(): Promise<PreferenceModel[]> {
    return [...mockDb.values()]
  }

  async deleteById(id: string): Promise<void> {
    const deleted = mockDb.delete(id)

    if (!deleted) {
      throw new Error(`Preference ${id} not found`)
    }
  }
}
