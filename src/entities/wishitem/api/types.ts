export type CreateWishitemParams = {
  wishlistId: string
  name: string
  description?: string
  picture?: string
  priority?: number
  link?: string
}

export type UpdateWishitemParams = CreateWishitemParams & {
  id: string
}

export type DeleteWishitemParams = {
  id: string
  wishlistId: string
}

export type CopyWishitemParams = CreateWishitemParams & {
  originalId: string
}

export type UploadImageReponse = {
  url: string
}
