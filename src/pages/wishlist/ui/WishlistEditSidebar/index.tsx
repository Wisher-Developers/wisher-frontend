import styled from "styled-components"

type WishlistSidebarEditProps = {
  setIsEditing: (isEditing: boolean) => void
}

export default function WishlistEditSidebar({
  setIsEditing,
}: WishlistSidebarEditProps) {
  return <Wrapper />
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
