export type RegisterParams = {
  name: string
  email: string
  password: string
}

export type LoginParams = {
  name: string
  password: string
}

export type AuthResponse = {
  token: string
}
