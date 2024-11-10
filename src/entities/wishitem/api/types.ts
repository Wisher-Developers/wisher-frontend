export type CreateWishitemParams = {
  wishlistId: string
  name: string
  description?: string
  priority?: number
  link?: string
}

export type EditWishitemParams = CreateWishitemParams & {
  id: string
}

export type DeleteWishitemParams = {
  id: string
  wishlistId: string
}

export type CopyWishitemParams = CreateWishitemParams & {
  originalId: string
}
