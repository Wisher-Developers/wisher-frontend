import { User } from "@entities/user/@x/wishlist"

export enum PrivateMode {
  Public = "public",
  Friends = "friends",
  ByLink = "byLink",
  Restricted = "restricted",
}

export type Wishlist = {
  id: string
  owner: User

  name: string
  description?: string

  accessLink?: string
  privateMode: PrivateMode
  allowedUsers: User[]
}
