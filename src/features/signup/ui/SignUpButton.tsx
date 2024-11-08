import usePopup from "@shared/hooks/usePopup"
import Button from "@shared/ui/Button"

import SignUpPopup from "./SignUpPopup"

export default function SignUpButton() {
  const { isOpen, close, open } = usePopup()

  return (
    <>
      <Button size="l" onClick={open}>
        Зарегистрироваться
      </Button>

      <SignUpPopup isOpen={isOpen} close={close} />
    </>
  )
}
