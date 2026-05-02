import type { UserEntity } from "@/src/features/auth/domain/entities/user.entity"
import type { PreferenceEntity } from "@/src/features/preferences/domain/entities/preference.entity"
import type { ProfileEntity } from "../../domain/entities/profile.entity"

export interface ProfileModel {
  user: UserEntity | null
  preferences: PreferenceEntity | null
}

export function toProfileEntity(model: ProfileModel): ProfileEntity {
  return {
    user: model.user,
    preferences: model.preferences,
  }
}
