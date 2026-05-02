import type { ProfileEntity } from "../../domain/entities/profile.entity"
import type { IProfileRepository } from "../../domain/repositories/profile.repository"
import type { IProfileRemoteDataSource } from "../datasources/profile.remote-datasource"
import { createProfileModel } from "../datasources/profile.remote-datasource"
import { toProfileEntity } from "../models/profile.model"

export class ProfileRepositoryImpl implements IProfileRepository {
  constructor(private readonly remoteDataSource: IProfileRemoteDataSource) {}

  async getCurrentProfile(userId?: string): Promise<ProfileEntity> {
    const user = await this.remoteDataSource.getCurrentSessionUser()
    const preferences = await this.remoteDataSource.getUserPreferences(userId ?? user?.id)
    return toProfileEntity(createProfileModel(user, preferences))
  }
}
