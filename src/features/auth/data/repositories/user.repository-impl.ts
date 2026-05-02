import type { UserEntity } from "../../domain/entities/user.entity"
import type { AuthLoginInput, AuthSignupInput, IAuthRepository } from "../../domain/repositories/user.repository"
import type { IAuthRemoteDataSource } from "../datasources/user.remote-datasource"
import { toEntity } from "../models/user.model"

export class UserRepositoryImpl implements IAuthRepository {
  constructor(private readonly remoteDataSource: IAuthRemoteDataSource) {}

  async getCurrentUser(): Promise<UserEntity | null> {
    const model = await this.remoteDataSource.getSessionUser()
    if (!model) {
      return null
    }

    return toEntity(model)
  }

  async login(input: AuthLoginInput): Promise<UserEntity> {
    const model = await this.remoteDataSource.login(input.email, input.password)
    return toEntity(model)
  }

  async signup(input: AuthSignupInput): Promise<UserEntity> {
    const model = await this.remoteDataSource.signup({
      name: input.name,
      email: input.email,
      password: input.password,
    })
    return toEntity(model)
  }

  async logout(): Promise<void> {
    await this.remoteDataSource.logout()
  }
}
