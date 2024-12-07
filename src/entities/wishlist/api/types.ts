import { PrivateMode } from "../model/Wishlist"

export type CreateWishlistParams = {
  name: string
  description?: string
}

export type RenameWishlistParams = CreateWishlistParams & {
  id: string
}

export type ChangePrivacyParams = {
  id: string
  privacy: PrivateMode
}
