import { ComponentProps } from "react"

import styled from "styled-components"

import { text20SemiBold, text24SemiBold } from "@shared/fonts"

import Loader from "./Loader"

type ButtonProps = ComponentProps<"button"> & {
  size: "m" | "l"
  isLoading?: boolean
}

export default function Button({
  children,
  size,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <Wrapper {...props} data-size={size} disabled={isLoading || props.disabled}>
      {isLoading ? <Loader size={size} /> : children}
    </Wrapper>
  )
}

const Wrapper = styled.button<{ "data-size": "m" | "l" }>`
  cursor: pointer;
  background: var(--color-accent);
  border: none;

  padding: ${({ "data-size": size }) => (size === "m" ? "0 16px" : "0 32px")};
  border-radius: ${({ "data-size": size }) => (size === "m" ? "24px" : "32px")};
  height: ${({ "data-size": size }) => (size === "m" ? "48px" : "64px")};
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ "data-size": size }) =>
    size === "m" ? text20SemiBold : text24SemiBold};
  color: var(--color-white);

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
