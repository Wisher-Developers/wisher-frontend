import { useState } from "react"

import { skipToken } from "@reduxjs/toolkit/query"
import { useLocation, useParams } from "react-router-dom"
import styled from "styled-components"

import { useGetMeQuery } from "@entities/user/api"
import { useGetWishlistQuery } from "@entities/wishlist/api"
import { selectIsLoggedIn } from "@shared/auth"
import { useAppSelector } from "@shared/hooks/store"

import WishlistEditItems from "./WishlistEditItems"
import WishlistEditSidebar from "./WishlistEditSidebar"
import WishlistItems from "./WishlistItems"
import WishlistSidebar from "./WishlistSidebar"

type WishlistPageState = {
  isEditing: boolean
}

export default function WishlistPage() {
  const { state }: { state?: WishlistPageState } = useLocation()
  const { id: wishlistId } = useParams()

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [isEditing, setIsEditing] = useState(state?.isEditing ?? false)

  const { data: me } = useGetMeQuery(isLoggedIn ? undefined : skipToken)

  const { wishlistOwnerId } = useGetWishlistQuery(wishlistId ?? skipToken, {
    selectFromResult: ({ data }) => ({
      wishlistOwnerId: data?.owner.id,
    }),
  })

  if ((isLoggedIn && !me) || !wishlistOwnerId) return null

  const hasEditAccess = isLoggedIn && me?.id === wishlistOwnerId

  if (isEditing && hasEditAccess) {
    return (
      <Wrapper>
        <WishlistEditSidebar setIsEditing={setIsEditing} />

        <WishlistEditItems />
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
