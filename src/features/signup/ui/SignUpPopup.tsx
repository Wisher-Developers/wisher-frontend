import { useState } from "react"

import styled from "styled-components"

import { text32SemiBold } from "@shared/fonts"
import Popup from "@shared/ui/Popup"

type SignUpPopupProps = {
  isOpen: boolean
  close: () => void
}

export default function SignUpPopup({ isOpen, close }: SignUpPopupProps) {
  const [isSignUp, setIsSignUp] = useState(true)

  return (
    <StyledPopup isOpen={isOpen} close={close}>
      <h4>Регистрация</h4>
    </StyledPopup>
  )
}

const StyledPopup = styled(Popup)`
  border-radius: 32px;
  width: 450px;
  padding: 32px;
  box-sizing: border-box;

  > h4 {
    ${text32SemiBold};
  }
`
