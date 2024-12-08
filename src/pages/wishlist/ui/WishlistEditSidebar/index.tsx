import { skipToken } from "@reduxjs/toolkit/query"
import { useParams } from "react-router-dom"
import styled from "styled-components"

import { useGetWishlistQuery } from "@entities/wishlist/api"
import RenameWishlistForm from "@features/rename-wishlist/ui/RenameWishlistForm"

import DeleteBlock from "./DeleteBlock"
import PrivacyBlock from "./PrivacyBlock"

import BlockContainer from "../BlockContainer"
import LinkBlock from "../LinkBlock"

type WishlistSidebarEditProps = {
  setIsEditing: (isEditing: boolean) => void
}

export default function WishlistEditSidebar({
  setIsEditing,
}: WishlistSidebarEditProps) {
  const { id: wishlistId } = useParams()

  const finishEditing = () => setIsEditing(false)

  const { currentData: wishlist } = useGetWishlistQuery(wishlistId ?? skipToken)

  return (
    <Wrapper>
      <BlockContainer>
        <RenameWishlistForm />
      </BlockContainer>

      <LinkBlock wishlist={wishlist} />

      <PrivacyBlock />

      <DeleteBlock finishEditing={finishEditing} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
