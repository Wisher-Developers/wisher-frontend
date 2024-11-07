import { ComponentProps } from "react"

import styled from "styled-components"

import { text20SemiBold, text24SemiBold } from "@shared/fonts"

type ButtonProps = ComponentProps<"button"> & {
  size: "m" | "l"
}

export default function Button({ children, size, ...props }: ButtonProps) {
  return (
    <Wrapper {...props} data-size={size}>
      {children}
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
  width: fit-content;

  ${({ "data-size": size }) =>
    size === "m" ? text20SemiBold : text24SemiBold};
  color: var(--color-white);

  transition: opacity var(--transition-duration) var(--transition-function);

  &:hover {
    opacity: 0.8;
  }
`
