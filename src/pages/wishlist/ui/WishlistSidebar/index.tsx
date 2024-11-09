import { skipToken } from "@reduxjs/toolkit/query"
import { useParams } from "react-router-dom"
import styled from "styled-components"

import { useGetUserQuery } from "@entities/user/api"
import { useGetWishlistQuery } from "@entities/wishlist/api"

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

  const { data: user } = useGetUserQuery()
  const { data: wishlist } = useGetWishlistQuery(wishlistId ?? skipToken)

  const startEditing = () => setIsEditing(true)

  if (!wishlist || !user) return null

  const isOwner = wishlist.owner.id === user.id

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
