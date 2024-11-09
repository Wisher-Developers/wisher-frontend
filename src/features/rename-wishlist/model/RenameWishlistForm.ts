import * as yup from "yup"

export type RenameWishlistFormValues = {
  name: string
  description?: string
}

export const renameWishlistFormValidationSchema: yup.ObjectSchema<RenameWishlistFormValues> =
  yup.object().shape({
    name: yup.string().required("Необходимо заполнить"),
    description: yup.string().optional(),
  })
