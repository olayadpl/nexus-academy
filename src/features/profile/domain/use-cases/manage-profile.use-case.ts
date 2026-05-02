import type { ProfileEntity } from "../entities/profile.entity"
import type { IProfileRepository } from "../repositories/profile.repository"

export class ManageProfileUseCase {
  constructor(private readonly repository: IProfileRepository) {}

  async getCurrentProfile(userId?: string): Promise<ProfileEntity> {
    return this.repository.getCurrentProfile(userId)
  }
}
