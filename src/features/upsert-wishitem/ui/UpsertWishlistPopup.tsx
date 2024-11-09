import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import styled from "styled-components"

import { Wishitem } from "@entities/wishitem/model/Wishitem"
import { useGetWishlistsQuery } from "@entities/wishlist/api"
import { text32SemiBold } from "@shared/fonts"
import Button from "@shared/ui/Button"
import Dropdown from "@shared/ui/Dropdown"
import LabeledInput from "@shared/ui/LabeledInput"
import LabeledTextarea from "@shared/ui/LabeledTextarea"
import Popup from "@shared/ui/Popup"

import {
  UpsertWishitemFormValues,
  upsertWishitemFormValidationSchema,
} from "../model/UpsertWishitemForm"

type UpsertWishitemPopupProps = {
  isOpen: boolean
  close: () => void
  wishitem?: Partial<Wishitem>
}

export default function UpsertWishitemPopup({
  isOpen,
  close,
  wishitem,
}: UpsertWishitemPopupProps) {
  const { control, handleSubmit, reset } = useForm<UpsertWishitemFormValues>({
    resolver: yupResolver(upsertWishitemFormValidationSchema),
    values: {
      name: wishitem?.name ?? "",
      description: wishitem?.description ?? "",
      link: wishitem?.link ?? "",
      wishlistId: wishitem?.wishlistId ?? "",
    },
  })

  const { wishlistOptions } = useGetWishlistsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      wishlistOptions: data?.map(({ id, name }) => ({
        value: id,
        label: name,
      })),
    }),
  })

  const onSubmit = async ({
    name,
    description,
    link,
    wishlistId,
  }: UpsertWishitemFormValues) => {}

  return (
    <StyledPopup isOpen={isOpen} close={close} onCloseEnd={reset}>
      <h4>{wishitem ? "Редактирование вишайтема" : "Новый вишайтем"}</h4>

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
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <LabeledTextarea
              {...field}
              error={error?.message}
              label="Описание"
              placeholder="Введи описание"
            />
          )}
        />

        <Controller
          name="link"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <LabeledInput
              {...field}
              type="text"
              error={error?.message}
              label="Ссылка"
              placeholder="Вставь ссылку на товар"
            />
          )}
        />

        <Controller
          name="wishlistId"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Dropdown
              value={value}
              onChange={onChange}
              options={wishlistOptions}
              error={error?.message}
              label="Вишлист"
              placeholder="Выбери вишлист"
              required
            />
          )}
        />

        <ButtonWrapper>
          <Button size="m" type="submit">
            Сохранить
          </Button>
        </ButtonWrapper>
      </form>
    </StyledPopup>
  )
}

const StyledPopup = styled(Popup)`
  border-radius: 32px;
  width: 600px;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`
