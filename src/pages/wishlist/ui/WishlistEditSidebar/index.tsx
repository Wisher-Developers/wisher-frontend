import styled from "styled-components"

import RenameWishlistForm from "@features/rename-wishlist/ui/RenameWishlistForm"

import DeleteBlock from "./DeleteBlock"
import PrivacyBlock from "./PrivacyBlock"

import BlockContainer from "../BlockContainer"

type WishlistSidebarEditProps = {
  setIsEditing: (isEditing: boolean) => void
}

export default function WishlistEditSidebar({
  setIsEditing,
}: WishlistSidebarEditProps) {
  const finishEditing = () => setIsEditing(false)

  return (
    <Wrapper>
      <BlockContainer>
        <RenameWishlistForm />
      </BlockContainer>

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
