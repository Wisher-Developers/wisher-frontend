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
