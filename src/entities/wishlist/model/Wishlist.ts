import { User } from "@entities/user/@x/wishlist"
import { Wishitem } from "@entities/wishitem/@x"

export enum PrivateMode {
  Public = "PUBLIC",
  Friends = "FRIENDS",
  ByLink = "LINK",
  Restricted = "RESTRICTED",
}

export type Wishlist = {
  id: string
  owner: User

  name: string
  description?: string

  accessLink?: string
  privateMode: PrivateMode
  items: Wishitem[]
}
