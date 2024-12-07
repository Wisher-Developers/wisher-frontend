import * as yup from "yup"

export type EditProfileFormValues = {
  username: string
  email: string
}

export const editProfileFormValidationSchema: yup.ObjectSchema<EditProfileFormValues> =
  yup.object().shape({
    username: yup.string().required("Необходимо заполнить"),
    email: yup
      .string()
      .email("Некорректный email")
      .required("Необходимо заполнить"),
  })
