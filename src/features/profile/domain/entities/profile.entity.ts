import type { UserEntity } from "@/src/features/auth/domain/entities/user.entity"
import type { PreferenceEntity } from "@/src/features/preferences/domain/entities/preference.entity"

export interface ProfileEntity {
  user: UserEntity | null
  preferences: PreferenceEntity | null
}
