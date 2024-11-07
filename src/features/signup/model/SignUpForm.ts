import * as yup from "yup"

export type SignUpFormValues = {
  username: string
  email?: string
  password: string
  repeatPassword?: string
}

export function signUpFormValidationSchema(
  isSignUp: boolean
): yup.ObjectSchema<SignUpFormValues> {
  return yup.object().shape({
    username: yup.string().required("Необходимо заполнить"),
    email: isSignUp
      ? yup.string().email().required("Необходимо заполнить")
      : yup.string().optional(),
    password: yup.string().required("Необходимо заполнить"),
    repeatPassword: isSignUp
      ? yup
          .string()
          .required()
          .oneOf([yup.ref("password")], "Пароли не совпадают")
      : yup.string().optional(),
  })
}
