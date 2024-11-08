import styled from "styled-components"

import Popup from "@shared/ui/Popup"

type CreateWishlistPopupProps = {
  isOpen: boolean
  close: () => void
}

export default function CreateWishlistPopup({
  isOpen,
  close,
}: CreateWishlistPopupProps) {
  return (
    <StyledPopup isOpen={isOpen} close={close}>
      test
    </StyledPopup>
  )
}

const StyledPopup = styled(Popup)`
  width: 450px;
`
