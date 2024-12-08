import styled from "styled-components"

import { Wishlist } from "@entities/wishlist/model/Wishlist"
import RenameWishlistForm from "@features/rename-wishlist/ui/RenameWishlistForm"

import DeleteBlock from "./DeleteBlock"
import PrivacyBlock from "./PrivacyBlock"

import BlockContainer from "../BlockContainer"
import LinkBlock from "../LinkBlock"

type WishlistSidebarEditProps = {
  setIsEditing: (isEditing: boolean) => void
  wishlist: Wishlist
}

export default function WishlistEditSidebar({
  setIsEditing,
  wishlist,
}: WishlistSidebarEditProps) {
  const finishEditing = () => setIsEditing(false)

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
