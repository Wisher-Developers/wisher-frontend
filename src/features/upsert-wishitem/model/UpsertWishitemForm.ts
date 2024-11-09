import * as yup from "yup"

export type UpsertWishitemFormValues = {
  name: string
  description?: string
  link?: string
}

export const upsertWishitemFormValidationSchema: yup.ObjectSchema<UpsertWishitemFormValues> =
  yup.object().shape({
    name: yup.string().required("Необходимо заполнить"),
    description: yup
      .string()
      .optional()
      .max(256, "Максимальная длина 256 символов"),
    link: yup.string().optional(),
  })
