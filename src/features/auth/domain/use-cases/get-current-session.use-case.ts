import { UnauthorizedFailure } from "@/src/core/error/failures"
import type { UserEntity } from "../entities/user.entity"
import type { IAuthRepository } from "../repositories/user.repository"

export class GetCurrentSessionUseCase {
  constructor(private readonly repository: IAuthRepository) {}

  async execute(): Promise<UserEntity | null> {
    return this.repository.getCurrentUser()
  }

  async requireAuthenticatedUser(): Promise<UserEntity> {
    const user = await this.execute()

    if (!user) {
      throw new UnauthorizedFailure()
    }

    return user
  }
}
