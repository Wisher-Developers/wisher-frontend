import { yupResolver } from "@hookform/resolvers/yup"
import { skipToken } from "@reduxjs/toolkit/query"
import { Controller, useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import styled from "styled-components"

import { useGetWishlistQuery } from "@entities/wishlist/api"
import Button from "@shared/ui/Button"
import LabeledInput from "@shared/ui/LabeledInput"

import { useRenameWishlistMutation } from "../api"
import {
  RenameWishlistFormValues,
  renameWishlistFormValidationSchema,
} from "../model/RenameWishlistForm"

export default function RenameWishlistForm() {
  const { id } = useParams()

  const { data: wishlist } = useGetWishlistQuery(id ?? skipToken)

  const { control, handleSubmit } = useForm<RenameWishlistFormValues>({
    resolver: yupResolver(renameWishlistFormValidationSchema),
    values: {
      name: wishlist?.name ?? "",
      description: wishlist?.description ?? "",
    },
  })

  const [rename, { isLoading }] = useRenameWishlistMutation()

  const onSubmit = async ({ name, description }: RenameWishlistFormValues) => {
    try {
      if (!id) return

      await rename({ id, name, description })
    } catch {}
  }

  return (
    <StyledForm noValidate onSubmit={handleSubmit(onSubmit)}>
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
          />
        )}
      />

      <SubmitButton isLoading={isLoading} size="m" type="submit">
        Сохранить
      </SubmitButton>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const SubmitButton = styled(Button)`
  width: 100%;
`
