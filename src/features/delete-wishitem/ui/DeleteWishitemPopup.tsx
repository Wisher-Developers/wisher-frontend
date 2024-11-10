import styled from "styled-components"

import { Wishitem } from "@entities/wishitem/model/Wishitem"
import { text16, text32SemiBold } from "@shared/fonts"
import Button from "@shared/ui/Button"
import Popup from "@shared/ui/Popup"

import { useDeleteWishitemMutation } from "../api"

type DeleteWishitemPopupProps = {
  isOpen: boolean
  close: () => void
  wishitem: Wishitem
}

export default function DeleteWishitemPopup({
  isOpen,
  close,
  wishitem,
}: DeleteWishitemPopupProps) {
  const [deleteWishitem, { isLoading }] = useDeleteWishitemMutation()

  const handleDelete = async () => {
    try {
      await deleteWishitem({ id: wishitem.id, wishlistId: wishitem.wishlistId })

      close()
    } catch {}
  }

  return (
    <StyledPopup isOpen={isOpen} close={close}>
      <TextBlock>
        <h4>Удаление вишайтема</h4>
        <p>
          Ты точно хочешь удалить вишайтем &quot;{wishitem.name}&quot;? Отменить
          это действие будет невозможно
        </p>
      </TextBlock>

      <ButtonBlock>
        <Button size="m" onClick={close} appearance="secondary">
          Отмена
        </Button>
        <Button isLoading={isLoading} size="m" onClick={handleDelete}>
          Да, удалить
        </Button>
      </ButtonBlock>
    </StyledPopup>
  )
}

const StyledPopup = styled(Popup)`
  border-radius: 32px;
  width: 450px;
  padding: 32px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 32px;

  h4 {
    ${text32SemiBold};
  }

  p {
    ${text16};
    color: var(--color-black-secondary);
  }
`

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  width: 100%;

  > button {
    width: fit-content;
  }
`
