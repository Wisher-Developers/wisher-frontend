import * as yup from "yup"

export type CreateWishlistFormValues = {
  name: string
  description?: string
}

export const createWishlistFormValidationSchema: yup.ObjectSchema<CreateWishlistFormValues> =
  yup.object().shape({
    name: yup.string().required("Необходимо заполнить"),
    description: yup.string().optional(),
  })
