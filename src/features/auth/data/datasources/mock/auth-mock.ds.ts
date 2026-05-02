import type { IAuthRemoteDataSource } from "../user.remote-datasource"
import type { SessionUserModel } from "../../models/user.model"
import type { AuthCredentialModel } from "../user.remote-datasource"
import { UnauthorizedFailure, ValidationFailure } from "@/src/core/error/failures"

const USER_FIXTURES: AuthCredentialModel[] = [
  {
    id: "demo-user",
    email: "demo.user@uci.cu",
    name: "Demo User",
    password: "demo123",
    provider: "cas-uci",
  },
]

let currentSessionUserId: string | null = "demo-user"

function toSessionUserModel(user: AuthCredentialModel): SessionUserModel {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    provider: user.provider,
  }
}

const usersDb = new Map<string, AuthCredentialModel>(USER_FIXTURES.map((item) => [item.id, item]))

const SESSION_USER: SessionUserModel = toSessionUserModel({
  id: "demo-user",
  email: "demo.user@uci.cu",
  name: "Demo User",
  password: "demo123",
  provider: "cas-uci",
})

export class AuthMockDataSource implements IAuthRemoteDataSource {
  async getSessionUser(): Promise<SessionUserModel | null> {
    if (!currentSessionUserId) {
      return null
    }

    const user = usersDb.get(currentSessionUserId)
    return user ? toSessionUserModel(user) : SESSION_USER
  }

  async login(email: string, password: string): Promise<SessionUserModel> {
    const normalizedEmail = email.trim().toLowerCase()
    const user = [...usersDb.values()].find((item) => item.email.toLowerCase() === normalizedEmail)

    if (!user || user.password !== password) {
      throw new UnauthorizedFailure("Invalid credentials")
    }

    currentSessionUserId = user.id
    return toSessionUserModel(user)
  }

  async signup(input: Omit<AuthCredentialModel, "id" | "provider">): Promise<SessionUserModel> {
    const normalizedEmail = input.email.trim().toLowerCase()
    const exists = [...usersDb.values()].some((item) => item.email.toLowerCase() === normalizedEmail)
    if (exists) {
      throw new ValidationFailure("Email already registered")
    }

    const user: AuthCredentialModel = {
      id: `user-${Date.now()}`,
      name: input.name.trim(),
      email: normalizedEmail,
      password: input.password,
      provider: "credentials",
    }

    usersDb.set(user.id, user)
    currentSessionUserId = user.id
    return toSessionUserModel(user)
  }

  async logout(): Promise<void> {
    currentSessionUserId = null
  }
}
