import usePopup from "@shared/hooks/usePopup"

import CreateWishlistPopup from "./CreateWishlistPopup"

export default function CreateWishlistButton() {
  const { isOpen, open, close } = usePopup()

  return (
    <>
      <button onClick={open} data-testid="create-wishlist">
        Создать вишлист
      </button>

      <CreateWishlistPopup isOpen={isOpen} close={close} />
    </>
  )
}
