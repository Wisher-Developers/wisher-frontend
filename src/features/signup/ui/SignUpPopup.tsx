import { useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import styled from "styled-components"

import { text16SemiBold, text32SemiBold } from "@shared/fonts"
import Button from "@shared/ui/Button"
import LabeledInput from "@shared/ui/LabeledInput"
import LabeledTextarea from "@shared/ui/LabeledTextarea"
import Popup from "@shared/ui/Popup"

import {
  SignUpFormValues,
  signUpFormValidationSchema,
} from "../model/SignUpForm"

type SignUpPopupProps = {
  isOpen: boolean
  close: () => void
}

export default function SignUpPopup({ isOpen, close }: SignUpPopupProps) {
  const [isSignUp, setIsSignUp] = useState(true)

  const { control, handleSubmit, reset } = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpFormValidationSchema(isSignUp)),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  })

  const signUp = ({ username, email, password }: SignUpFormValues) => {
    console.log(username, email, password)
  }

  return (
    <StyledPopup isOpen={isOpen} close={close} onCloseEnd={reset}>
      <h4>Регистрация</h4>

      <form noValidate onSubmit={handleSubmit(signUp)}>
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <LabeledInput
              {...field}
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
            <LabeledTextarea
              {...field}
              error={error?.message}
              label="Email"
              placeholder="Введи почту"
              required
            />
          )}
        />

        <SubmitButton size="m" type="submit">
          {isSignUp ? "Зарегистрироваться" : "Войти"}
        </SubmitButton>
      </form>

      <p>
        {isSignUp ? "Уже есть аккаунт?" : "Ещё нет аккаунта?"}{" "}
        <SwitchButton onClick={() => setIsSignUp(prev => !prev)}>
          {isSignUp ? "Войти" : "Зарегистрироваться"}
        </SwitchButton>
      </p>
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

  > p {
    width: 100%;
    ${text16SemiBold};
    text-align: center;
  }
`

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 32px;
`

const SwitchButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
  ${text16SemiBold};
  text-decoration: underline;
`
