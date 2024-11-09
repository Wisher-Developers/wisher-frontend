import styled from "styled-components"

import TrashIcon from "@shared/assets/TrashIcon"
import usePopup from "@shared/hooks/usePopup"
import Button from "@shared/ui/Button"

import DeleteWishlistPopup from "./DeleteWishlistPopup"

export default function DeleteWishlistButton() {
  const { isOpen, close, open } = usePopup()

  return (
    <>
      <DeleteButton
        size="m"
        appearance="secondary"
        icon={<TrashIcon />}
        onClick={open}
      >
        Удалить вишлист
      </DeleteButton>

      <DeleteWishlistPopup isOpen={isOpen} close={close} />
    </>
  )
}

const DeleteButton = styled(Button)`
  color: var(--color-red) !important;
`
