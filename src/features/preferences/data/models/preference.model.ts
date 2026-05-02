import type { PreferenceEntity } from "../../domain/entities/preference.entity"

export interface PreferenceModel {
  id: string
  userId: string
  language: "es" | "en"
  theme: "light" | "dark" | "system"
  autoplay: boolean
  subtitlesEnabled: boolean
  playbackRate: 0.75 | 1 | 1.25 | 1.5 | 2
  reduceMotion: boolean
  updatedAt: string
}

export function toEntity(model: PreferenceModel): PreferenceEntity {
  return {
    id: model.id,
    userId: model.userId,
    language: model.language,
    theme: model.theme,
    autoplay: model.autoplay,
    subtitlesEnabled: model.subtitlesEnabled,
    playbackRate: model.playbackRate,
    reduceMotion: model.reduceMotion,
    updatedAt: model.updatedAt,
  }
}

export function fromEntity(entity: PreferenceEntity): PreferenceModel {
  return {
    id: entity.id,
    userId: entity.userId,
    language: entity.language,
    theme: entity.theme,
    autoplay: entity.autoplay,
    subtitlesEnabled: entity.subtitlesEnabled,
    playbackRate: entity.playbackRate,
    reduceMotion: entity.reduceMotion,
    updatedAt: entity.updatedAt,
  }
}
