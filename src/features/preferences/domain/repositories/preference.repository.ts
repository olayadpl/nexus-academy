import type { PreferenceEntity } from "../entities/preference.entity"

export type CreatePreferenceInput = PreferenceEntity

export interface UpdatePreferenceInput {
  id: string
  language?: PreferenceEntity["language"]
  theme?: PreferenceEntity["theme"]
  autoplay?: boolean
  subtitlesEnabled?: boolean
  playbackRate?: PreferenceEntity["playbackRate"]
  reduceMotion?: boolean
  updatedAt?: string
}

export interface IPreferenceRepository {
  create(input: CreatePreferenceInput): Promise<PreferenceEntity>
  update(input: UpdatePreferenceInput): Promise<PreferenceEntity>
  getById(id: string): Promise<PreferenceEntity | null>
  getByUserId(userId: string): Promise<PreferenceEntity | null>
  getAll(): Promise<PreferenceEntity[]>
  deleteById(id: string): Promise<void>
}
