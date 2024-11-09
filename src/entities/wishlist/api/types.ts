export type CreateWishlistParams = {
  name: string
  description?: string
}

export type RenameWishlistParams = CreateWishlistParams & {
  id: string
}
