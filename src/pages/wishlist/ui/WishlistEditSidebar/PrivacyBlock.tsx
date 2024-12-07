import { useParams } from "react-router-dom"
import styled from "styled-components"

import PrivacySelector from "@features/change-privacy/ui/PrivacySelector"
import { text24SemiBold } from "@shared/fonts"

import BlockContainer from "../BlockContainer"

export default function WishlistEditPrivacy() {
  const { id } = useParams()

  if (!id) return null

  return (
    <StyledBlock>
      <h3>Доступ</h3>
      <PrivacySelector wishlistId={id} />
    </StyledBlock>
  )
}

const StyledBlock = styled(BlockContainer)`
  position: relative;
  z-index: 1;

  > h3 {
    ${text24SemiBold};
  }
`
