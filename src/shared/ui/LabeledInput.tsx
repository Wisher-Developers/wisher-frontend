import { ComponentProps, forwardRef } from "react"

import styled from "styled-components"

import { text16, text16SemiBold } from "@shared/fonts"

type LabeledInputProps = ComponentProps<"input"> & {
  label: string
  error?: string
}

export default forwardRef<HTMLInputElement, LabeledInputProps>(
  function LabeledInput({ label, error, ...props }, ref) {
    return (
      <Label>
        <span>
          {label}
          {props.required && "*"}
        </span>
        <Input ref={ref} {...props} data-error={!!error} />

        {error && <Error>{error}</Error>}
      </Label>
    )
  }
)

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;

  > span:first-child {
    ${text16SemiBold};
  }
`

const Input = styled.input<{ "data-error"?: boolean }>`
  border-radius: 24px;
  background: var(--color-background);
  border: 2px solid var(--color-border);
  backdrop-filter: blur(32px);
  box-shadow: 0px 8px 32px 0px var(--color-shadow);

  height: 48px;
  padding: 0 24px;
  box-sizing: border-box;

  outline: none;

  ${text16};

  &::placeholder {
    color: var(--color-black-secondary);
  }

  &[data-error="true"] {
    background-color: var(--color-red-pale);
    border-color: var(--color-red);
  }
`

const Error = styled.span`
  ${text16SemiBold};
  color: var(--color-red);
`