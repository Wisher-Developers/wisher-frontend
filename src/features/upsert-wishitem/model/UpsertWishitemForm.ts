import * as yup from "yup"

export type UpsertWishitemFormValues = {
  name: string
  description?: string
  priority?: number
  link?: string
  wishlistId: string
}

export const upsertWishitemFormValidationSchema: yup.ObjectSchema<UpsertWishitemFormValues> =
  yup.object().shape({
    name: yup.string().required("Необходимо заполнить"),
    description: yup
      .string()
      .optional()
      .max(256, "Максимальная длина 256 символов"),
    priority: yup.number().optional().min(1).max(5),
    link: yup.string().optional(),
    wishlistId: yup.string().required("Необходимо заполнить"),
  })
