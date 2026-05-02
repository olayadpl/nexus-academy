import type { ProfileEntity } from "../entities/profile.entity"

export interface IProfileRepository {
  getCurrentProfile(userId?: string): Promise<ProfileEntity>
}
