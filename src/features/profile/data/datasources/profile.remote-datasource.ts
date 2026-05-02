import type { UserEntity } from "@/src/features/auth/domain/entities/user.entity"
import type { PreferenceEntity } from "@/src/features/preferences/domain/entities/preference.entity"
import type { ProfileModel } from "../models/profile.model"

export interface IProfileRemoteDataSource {
  getCurrentSessionUser(): Promise<UserEntity | null>
  getUserPreferences(userId?: string): Promise<PreferenceEntity | null>
}

export class ProfileRemoteDataSource implements IProfileRemoteDataSource {
  async getCurrentSessionUser(): Promise<UserEntity | null> {
    return null
  }

  async getUserPreferences(): Promise<PreferenceEntity | null> {
    return null
  }
}

export function createProfileModel(user: UserEntity | null, preferences: PreferenceEntity | null): ProfileModel {
  return { user, preferences }
}
