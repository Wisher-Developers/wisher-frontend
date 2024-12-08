import styled from "styled-components"

type LoaderProps = {
  size: "m" | "l"
  color?: string
}

export default function Loader({
  size,
  color = "var(--color-white)",
}: LoaderProps) {
  return (
    <StyledLoader
      width={size === "m" ? 24 : 48}
      height={size === "m" ? 24 : 48}
      color={color}
    />
  )
}

const StyledLoader = styled.div<{
  width: number
  height: number
  color: string
}>`
  border: 2.5px solid ${({ color }) => color};
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
