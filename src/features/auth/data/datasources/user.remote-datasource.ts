import type { SessionUserModel } from "../models/user.model"

export interface AuthCredentialModel {
  id: string
  name: string
  email: string
  password: string
  provider: "google" | "cas-uci" | "credentials"
}

export interface IAuthRemoteDataSource {
  getSessionUser(): Promise<SessionUserModel | null>
  login(email: string, password: string): Promise<SessionUserModel>
  signup(input: Omit<AuthCredentialModel, "id" | "provider">): Promise<SessionUserModel>
  logout(): Promise<void>
}

export class AuthRemoteDataSource implements IAuthRemoteDataSource {
  async getSessionUser(): Promise<SessionUserModel | null> {
    // Placeholder until external providers are wired.
    return null
  }

  async login(email: string, password: string): Promise<SessionUserModel> {
    void email
    void password
    throw new Error("AuthRemoteDataSource.login not implemented")
  }

  async signup(input: Omit<AuthCredentialModel, "id" | "provider">): Promise<SessionUserModel> {
    void input
    throw new Error("AuthRemoteDataSource.signup not implemented")
  }

  async logout(): Promise<void> {
    throw new Error("AuthRemoteDataSource.logout not implemented")
  }
}
