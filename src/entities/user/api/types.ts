export type RegisterParams = {
  username: string
  email: string
  password: string
}

export type LoginParams = {
  username: string
  password: string
}

export type AuthResponse = {
  token: string
}

export type UpdateProfileParams = {
  id: string
  username: string
  email: string
  avatar?: string | null
}
