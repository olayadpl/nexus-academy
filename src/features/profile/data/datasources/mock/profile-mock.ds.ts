import type { UserEntity } from "@/src/features/auth/domain/entities/user.entity"
import type { PreferenceEntity } from "@/src/features/preferences/domain/entities/preference.entity"
import type { IProfileRemoteDataSource } from "../profile.remote-datasource"

const MOCK_USER: UserEntity = {
  id: "demo-user",
  email: "student@nexus.academy",
  name: "Demo User",
  provider: "credentials",
}

const MOCK_PREFERENCES: PreferenceEntity = {
  id: "pref-demo-user",
  userId: "demo-user",
  language: "es",
  theme: "system",
  autoplay: false,
  subtitlesEnabled: true,
  playbackRate: 1,
  reduceMotion: false,
  updatedAt: "2026-03-31T10:00:00.000Z",
}

export class ProfileMockDataSource implements IProfileRemoteDataSource {
  async getCurrentSessionUser(): Promise<UserEntity | null> {
    return MOCK_USER
  }

  async getUserPreferences(userId?: string): Promise<PreferenceEntity | null> {
    if (!userId || userId === MOCK_PREFERENCES.userId) {
      return MOCK_PREFERENCES
    }

    return null
  }
}
