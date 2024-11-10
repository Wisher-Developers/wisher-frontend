import { skipToken } from "@reduxjs/toolkit/query"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"

import { useGetWishlistQuery } from "@entities/wishlist/api"
import { text16, text32SemiBold } from "@shared/fonts"
import Button from "@shared/ui/Button"
import Popup from "@shared/ui/Popup"

import { useDeleteWishlistMutation } from "../api"

type DeleteWishlistPopupProps = {
  isOpen: boolean
  close: () => void
}

export default function DeleteWishlistPopup({
  isOpen,
  close,
}: DeleteWishlistPopupProps) {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data: wishlist } = useGetWishlistQuery(id ?? skipToken)

  const [deleteWishlist, { isLoading }] = useDeleteWishlistMutation()

  const handleDelete = async () => {
    if (!id) {
      return
    }

    try {
      await deleteWishlist(id)
      navigate("/profile")
    } catch {}
  }

  return (
    <StyledPopup isOpen={isOpen} close={close}>
      <TextBlock>
        <h4>Удаление вишлиста</h4>
        <p>
          Ты точно хочешь удалить вишлист &quot;{wishlist?.name}&quot;? Отменить
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