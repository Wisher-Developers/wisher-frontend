import styled from "styled-components"

import { Wishitem } from "@entities/wishitem/model/Wishitem"
import TrashIcon from "@shared/assets/TrashIcon"
import usePopup from "@shared/hooks/usePopup"
import Button from "@shared/ui/Button"

import DeleteWishitemPopup from "./DeleteWishitemPopup"

type DeleteWishitemButtonProps = {
  wishitem: Wishitem
}

export default function DeleteWishitemButton({
  wishitem,
}: DeleteWishitemButtonProps) {
  const { isOpen, close, open } = usePopup()

  return (
    <>
      <DeleteButton
        size="m"
        appearance="secondary"
        icon={<TrashIcon />}
        onClick={open}
      >
        Удалить
      </DeleteButton>

      <DeleteWishitemPopup isOpen={isOpen} close={close} wishitem={wishitem} />
    </>
  )
}

const DeleteButton = styled(Button)`
  color: var(--color-red) !important;
`
