import { useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import styled from "styled-components"

import { useGetMeQuery, useUpdateProfileMutation } from "@entities/user/api"
import { useUploadImageMutation } from "@shared/api/image"
import Button from "@shared/ui/Button"
import FileUploader from "@shared/ui/FileUploader"
import LabeledInput from "@shared/ui/LabeledInput"

import {
  EditProfileFormValues,
  editProfileFormValidationSchema,
} from "../model/EditProfileForm"

type EditProfileFormProps = {
  onSuccess: () => void
}

export default function EditProfileForm({ onSuccess }: EditProfileFormProps) {
  const { data: me } = useGetMeQuery()

  const [imageUrl, setImageUrl] = useState<string | null>(me?.avatar ?? null)

  const { control, handleSubmit } = useForm<EditProfileFormValues>({
    resolver: yupResolver(editProfileFormValidationSchema),
    values: {
      username: me?.username ?? "",
      email: me?.email ?? "",
    },
  })

  const [uploadImage] = useUploadImageMutation()

  const uploadFile = async (file: File) => {
    try {
      const { url } = await uploadImage(file).unwrap()

      setImageUrl(url)
    } catch {}
  }

  const resetFile = () => setImageUrl(null)

  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

  const save = async ({ username, email }: EditProfileFormValues) => {
    try {
      if (me)
        await updateProfile({
          id: me?.id,
          username,
          email,
          avatar: imageUrl,
        }).unwrap()

      onSuccess()
    } catch {}
  }

  return (
    <StyledForm noValidate onSubmit={handleSubmit(save)}>
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <LabeledInput
            {...field}
            type="text"
            error={error?.message}
            label="Имя пользователя"
            placeholder="Введи никнейм"
            required
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <LabeledInput
            {...field}
            type="email"
            error={error?.message}
            label="Email"
            placeholder="Введи email"
            required
          />
        )}
      />

      <FileUploader
        label="Аватар"
        placeholder="Прикрепить изображение"
        uploadFile={uploadFile}
        resetFile={resetFile}
        accept="image/*"
      />

      <Button size="m" type="submit" isLoading={isLoading}>
        Сохранить
      </Button>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
