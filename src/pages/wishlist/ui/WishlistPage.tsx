import { useState } from "react"

import { skipToken } from "@reduxjs/toolkit/query"
import { Navigate, useLocation, useParams } from "react-router-dom"
import styled from "styled-components"

import { useGetMeQuery } from "@entities/user/api"
import {
  useGetWishlistByAccessLinkQuery,
  useGetWishlistQuery,
} from "@entities/wishlist/api"
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
  const { id: wishlistId, accessLink } = useParams()

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [isEditing, setIsEditing] = useState(state?.isEditing ?? false)

  const { data: me } = useGetMeQuery(isLoggedIn ? undefined : skipToken)

  const { currentData: wishlistById } = useGetWishlistQuery(
    wishlistId ?? skipToken
  )
  const { currentData: wishlistByAccessLink } = useGetWishlistByAccessLinkQuery(
    accessLink ?? skipToken
  )

  const wishlist = wishlistById ?? wishlistByAccessLink

  const wishlistOwnerId = wishlist?.owner.id

  if ((isLoggedIn && !me) || !wishlistOwnerId) return null

  const hasEditAccess = isLoggedIn && me?.id === wishlistOwnerId

  if (hasEditAccess && !wishlistById)
    return <Navigate to={`/wishlist/${wishlist.id}`} replace />

  if (isEditing && hasEditAccess) {
    return (
      <Wrapper>
        <WishlistEditSidebar wishlist={wishlist} setIsEditing={setIsEditing} />

        <WishlistEditItems wishlist={wishlist} />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <WishlistSidebar wishlist={wishlist} setIsEditing={setIsEditing} />

      <WishlistItems wishlist={wishlist} />
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
