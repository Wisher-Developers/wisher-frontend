import { useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import styled from "styled-components"

import { useSignInMutation, useSignUpMutation } from "@entities/user/api"
import { text16SemiBold, text32SemiBold } from "@shared/fonts"
import Button from "@shared/ui/Button"
import LabeledInput from "@shared/ui/LabeledInput"
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

  const [signUp, { isLoading: isSigningUp }] = useSignUpMutation()
  const [signIn, { isLoading: isSigningIn }] = useSignInMutation()

  const onSubmit = async ({ username, email, password }: SignUpFormValues) => {
    try {
      if (isSignUp && email) {
        await signUp({ username, email, password }).unwrap()
      } else {
        await signIn({ username, password }).unwrap()
      }

      close()
    } catch {}
  }

  const isLoading = isSigningUp || isSigningIn

  return (
    <StyledPopup isOpen={isOpen} close={close} onCloseEnd={reset}>
      <h4>{isSignUp ? "Регистрация" : "Вход"}</h4>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <LabeledInput
              {...field}
              type="text"
              autoComplete="username"
              error={error?.message}
              label="Имя пользователя"
              placeholder="Введи никнейм"
              required
              dataTestId="register-username"
            />
          )}
        />

        {isSignUp && (
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <LabeledInput
                {...field}
                type="email"
                autoComplete="email"
                error={error?.message}
                label="Email"
                placeholder="Введи email"
                required
                dataTestId="register-email"
              />
            )}
          />
        )}

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <LabeledInput
              {...field}
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              error={error?.message}
              label="Пароль"
              placeholder="Введи пароль"
              required
              dataTestId="register-password"
            />
          )}
        />

        {isSignUp && (
          <Controller
            name="repeatPassword"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <LabeledInput
                {...field}
                type="password"
                autoComplete="new-password"
                error={error?.message}
                label="Пароль ещё раз"
                placeholder="Введи пароль"
                required
                dataTestId="register-repeat-password"
              />
            )}
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          size="m"
          type="submit"
          data-testid="signup-button"
        >
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
`

const SwitchButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
  ${text16SemiBold};
  text-decoration: underline;
`
