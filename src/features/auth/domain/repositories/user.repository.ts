import type { UserEntity } from "../entities/user.entity"

export interface AuthLoginInput {
  email: string
  password: string
}

export interface AuthSignupInput {
  name: string
  email: string
  password: string
}

export interface IAuthRepository {
  getCurrentUser(): Promise<UserEntity | null>
  login(input: AuthLoginInput): Promise<UserEntity>
  signup(input: AuthSignupInput): Promise<UserEntity>
  logout(): Promise<void>
}
