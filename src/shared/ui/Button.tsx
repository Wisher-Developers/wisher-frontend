import { ComponentProps, ReactNode } from "react"

import styled from "styled-components"

import { text20SemiBold, text24SemiBold } from "@shared/fonts"

import Loader from "./Loader"

type Size = "m" | "l"
type Appearance = "primary" | "secondary"

type ButtonProps = ComponentProps<"button"> & {
  size: Size
  isLoading?: boolean
  appearance?: Appearance
  icon?: ReactNode
}

export default function Button({
  children,
  size,
  isLoading = false,
  appearance = "primary",
  icon,
  ...props
}: ButtonProps) {
  const loaderColor =
    appearance === "primary" ? "var(--color-white)" : "var(--color-black)"

  return (
    <Wrapper
      {...props}
      data-size={size}
      data-appearence={appearance}
      disabled={isLoading || props.disabled}
    >
      {icon}
      {isLoading ? <Loader size={size} color={loaderColor} /> : children}
    </Wrapper>
  )
}

const Wrapper = styled.button<{
  "data-size": Size
  "data-appearence": Appearance
}>`
  cursor: pointer;

  &[data-size="m"] {
    padding: 0 16px;
    border-radius: 24px;
    height: 48px;
    ${text20SemiBold};
  }

  &[data-size="l"] {
    padding: 0 32px;
    border-radius: 32px;
    height: 64px;
    ${text24SemiBold};
  }

  &[data-appearence="secondary"] {
    background: var(--color-background-action);
    color: var(--color-black);
    border: 2px solid var(--color-border);
    box-shadow: 0px 8px 32px 0px var(--color-shadow);
    backdrop-filter: blur(32px);
  }

  &[data-appearence="primary"] {
    background: var(--color-accent);
    color: var(--color-white);
    border: none;
  }

  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  transition: opacity var(--transition-duration) var(--transition-function);

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    &:hover {
      opacity: 1;
    }

    cursor: not-allowed;
  }
`
