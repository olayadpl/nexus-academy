import { UnauthorizedFailure, ValidationFailure } from "@/src/core/error/failures"
import type { UserEntity } from "../entities/user.entity"
import type { AuthLoginInput, AuthSignupInput, IAuthRepository } from "../repositories/user.repository"

function assertNonEmpty(value: string, fieldName: string) {
  if (!value.trim()) {
    throw new ValidationFailure(`${fieldName} is required`)
  }
}

function assertEmail(email: string) {
  const normalized = email.trim()
  if (!normalized.includes("@")) {
    throw new ValidationFailure("email is invalid")
  }
}

export class ManageAuthUseCase {
  constructor(private readonly repository: IAuthRepository) {}

  async login(input: AuthLoginInput): Promise<UserEntity> {
    assertNonEmpty(input.email, "email")
    assertNonEmpty(input.password, "password")
    assertEmail(input.email)
    return this.repository.login(input)
  }

  async signup(input: AuthSignupInput): Promise<UserEntity> {
    assertNonEmpty(input.name, "name")
    assertNonEmpty(input.email, "email")
    assertNonEmpty(input.password, "password")
    if (input.password.trim().length < 6) {
      throw new ValidationFailure("password must have at least 6 characters")
    }
    assertEmail(input.email)
    return this.repository.signup(input)
  }

  async logout(): Promise<void> {
    const current = await this.repository.getCurrentUser()
    if (!current) {
      throw new UnauthorizedFailure("No active session")
    }
    await this.repository.logout()
  }
}
