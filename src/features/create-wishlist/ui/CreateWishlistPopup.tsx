import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import { text32SemiBold } from "@shared/fonts"
import Button from "@shared/ui/Button"
import LabeledInput from "@shared/ui/LabeledInput"
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
  const navigate = useNavigate()

  const { control, handleSubmit, reset } = useForm<CreateWishlistFormValues>({
    resolver: yupResolver(createWishlistFormValidationSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const [createWishlist, { isLoading }] = useCreateWishlistMutation()

  const onSubmit = async ({ name, description }: CreateWishlistFormValues) => {
    try {
      const wishlist = await createWishlist({ name, description }).unwrap()

      close()

      navigate(`/wishlist/${wishlist.id}`, { state: { isEditing: true } })
    } catch {}
  }

  return (
    <StyledPopup isOpen={isOpen} close={close} onCloseEnd={reset}>
      <h4>Новый вишлист</h4>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <LabeledInput
              {...field}
              type="text"
              error={error?.message}
              label="Название"
              placeholder="Введи название"
              required
              dataTestId="create-wishlist-name"
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <LabeledInput
              {...field}
              type="text"
              error={error?.message}
              label="Описание"
              placeholder="Введи описание"
              dataTestId="create-wishlist-description"
            />
          )}
        />

        <SubmitButton
          isLoading={isLoading}
          size="m"
          type="submit"
          data-testid="submit-creation"
        >
          Создать
        </SubmitButton>
      </form>
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
