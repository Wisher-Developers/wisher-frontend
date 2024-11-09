import styled from "styled-components"

import PlusIcon from "@shared/assets/PlusIcon"
import { text24SemiBold } from "@shared/fonts"
import usePopup from "@shared/hooks/usePopup"
import Container from "@shared/ui/Container"

import UpsertWishitemPopup from "./UpsertWishlistPopup"

export default function CreateWishitemButton() {
  const { isOpen, open, close } = usePopup()

  return (
    <>
      <AddItem onClick={open}>
        <PlusIcon />

        <span>Новый вишайтем</span>
      </AddItem>

      <UpsertWishitemPopup isOpen={isOpen} close={close} />
    </>
  )
}

const AddItem = styled(Container)`
  cursor: pointer;
  border-radius: 32px;
  width: 268px;
  height: 359px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  > span {
    width: 200px;
    ${text24SemiBold};
    text-align: center;
  }
`
