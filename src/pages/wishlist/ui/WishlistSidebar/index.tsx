import { skipToken } from "@reduxjs/toolkit/query"
import { useParams } from "react-router-dom"
import styled from "styled-components"

import { useGetMeQuery } from "@entities/user/api"
import { useGetWishlistQuery } from "@entities/wishlist/api"
import { selectIsLoggedIn } from "@shared/auth"
import { useAppSelector } from "@shared/hooks/store"

import AccessBlock from "./AccessBlock"
import DescriptionBlock from "./DescriptionBlock"
import EditBlock from "./EditBlock"
import OwnerBlock from "./OwnerBlock"

type WishlistSidebarProps = {
  setIsEditing: (isEditing: boolean) => void
}

export default function WishlistSidebar({
  setIsEditing,
}: WishlistSidebarProps) {
  const { id: wishlistId } = useParams()

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { data: me } = useGetMeQuery(isLoggedIn ? undefined : skipToken)
  const { data: wishlist } = useGetWishlistQuery(wishlistId ?? skipToken)

  const startEditing = () => setIsEditing(true)

  if (!wishlist || (isLoggedIn && !me)) return null

  const isOwner = isLoggedIn && wishlist.owner.id === me?.id

  return (
    <Wrapper>
      <DescriptionBlock wishlist={wishlist} />
      {isOwner ? (
        <AccessBlock wishlist={wishlist} />
      ) : (
        <OwnerBlock wishlist={wishlist} />
      )}
      {isOwner && <EditBlock startEditing={startEditing} />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
