import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import styled from "styled-components"

import { text32SemiBold } from "@shared/fonts"
import Button from "@shared/ui/Button"
import Popup from "@shared/ui/Popup"

import { useCreateWishlistMutation } from "../api"
import {
  CreateWishlistFormValues,
  createWishlistFormValidationSchema,
} from "../model/CreateWishlistForm"

type CreateWishlistPopupProps = {
  isOpen: boolean
  close: () => void
}

export default function CreateWishlistPopup({
  isOpen,
  close,
}: CreateWishlistPopupProps) {
  const { control, handleSubmit, reset } = useForm<CreateWishlistFormValues>({
    resolver: yupResolver(createWishlistFormValidationSchema),
    defaultValues: {
      name: "",
    },
  })

  const [createWishlist] = useCreateWishlistMutation()

  const onSubmit = ({ name, description }: CreateWishlistFormValues) => {
    console.log(name, description)

    close()
  }

  return (
    <StyledPopup isOpen={isOpen} close={close} onCloseEnd={reset}>
      <h4>Новый вишлист</h4>

      <form noValidate></form>
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

  > h4 {
    ${text32SemiBold};
  }

  > form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`

const SubmitButton = styled(Button)`
  width: 100%;
`
