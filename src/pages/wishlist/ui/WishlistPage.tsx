import { useState } from "react"

import { skipToken } from "@reduxjs/toolkit/query"
import { useLocation, useParams } from "react-router-dom"
import styled from "styled-components"

import { User } from "@entities/user/model/User"
import { useGetWishlistQuery } from "@entities/wishlist/api"
import { Wishlist } from "@entities/wishlist/model/Wishlist"

import WishlistEditSidebar from "./WishlistEditSidebar"
import WishlistItems from "./WishlistItems"
import WishlistSidebar from "./WishlistSidebar"

type WishlistPageState = {
  isEditing: boolean
}

export default function WishlistPage() {
  const { state }: { state?: WishlistPageState } = useLocation()
  const { id: wishlistId } = useParams()

  const [isEditing, setIsEditing] = useState(state?.isEditing ?? false)

  // const { data: user } = useGetUserQuery()
  const user: User = {
    id: "d9b6b8f1-9d1b-4a5c-8e3e-3b6e6f1c6f3b",
    name: "Goosescout",
    email: "m@m",
  }

  // const { wishlistOwnerId } = useGetWishlistQuery(wishlistId ?? skipToken, {
  //   selectFromResult: ({ data }) => ({
  //     wishlistOwnerId: data?.owner.id,
  //   }),
  // })
  const wishlistOwnerId = "d9b6b8f1-9d1b-4a5c-8e3e-3b6e6f1c6f3b"

  if (!user || !wishlistOwnerId) return null

  const hasAccess = user.id === wishlistOwnerId

  if (isEditing && hasAccess) {
    return (
      <Wrapper>
        <WishlistEditSidebar setIsEditing={setIsEditing} />

        <WishlistItems />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <WishlistSidebar setIsEditing={setIsEditing} />

      <WishlistItems />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 400px 900px;
  align-items: start;
  gap: 64px;

  width: fit-content;

  margin: 100px auto 60px;
`
