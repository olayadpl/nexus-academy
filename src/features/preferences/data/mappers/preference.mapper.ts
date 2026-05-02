import type { PreferenceEntity } from "../../domain/entities/preference.entity"
import type { PreferenceModel } from "../models/preference.model"

export function toPreferenceEntity(model: PreferenceModel): PreferenceEntity {
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

export function toPreferenceModel(entity: PreferenceEntity): PreferenceModel {
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
