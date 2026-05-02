export interface UserEntity {
  id: string
  email: string
  name: string
  avatarUrl?: string
  provider: "google" | "cas-uci" | "credentials"
}
