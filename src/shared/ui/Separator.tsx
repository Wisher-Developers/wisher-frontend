import styled from "styled-components"

const Separator = styled.div<{ height: number }>`
  width: 2px;
  height: ${({ height }) => height}px;
  background: var(--color-black);
  border-radius: 1px;
`

export default Separator
