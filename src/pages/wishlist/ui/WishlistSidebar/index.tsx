import { skipToken } from "@reduxjs/toolkit/query"
import styled from "styled-components"

import { useGetMeQuery } from "@entities/user/api"
import { Wishlist } from "@entities/wishlist/model/Wishlist"
import { selectIsLoggedIn } from "@shared/auth"
import { useAppSelector } from "@shared/hooks/store"

import AccessBlock from "./AccessBlock"
import DescriptionBlock from "./DescriptionBlock"
import EditBlock from "./EditBlock"
import OwnerBlock from "./OwnerBlock"

import LinkBlock from "../LinkBlock"

type WishlistSidebarProps = {
  setIsEditing: (isEditing: boolean) => void
  wishlist: Wishlist
}

export default function WishlistSidebar({
  setIsEditing,
  wishlist,
}: WishlistSidebarProps) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { data: me } = useGetMeQuery(isLoggedIn ? undefined : skipToken)

  const startEditing = () => setIsEditing(true)

  if (!wishlist || (isLoggedIn && !me)) return null

  const isOwner = isLoggedIn && wishlist.owner.id === me?.id

  return (
    <Wrapper>
      <DescriptionBlock wishlist={wishlist} />
      {isOwner ? (
        <>
          <LinkBlock wishlist={wishlist} />
          <AccessBlock wishlist={wishlist} />
        </>
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
