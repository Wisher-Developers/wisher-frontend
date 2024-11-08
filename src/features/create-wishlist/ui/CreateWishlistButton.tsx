import usePopup from "@shared/hooks/usePopup"

import CreateWishlistPopup from "./CreateWishlistPopup"

export default function CreateWishlistButton() {
  const { isOpen, open, close } = usePopup()

  return (
    <>
      <button onClick={open}>Создать вишлист</button>

      <CreateWishlistPopup isOpen={isOpen} close={close} />
    </>
  )
}
