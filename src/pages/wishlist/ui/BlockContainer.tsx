import styled from "styled-components"

import Container from "@shared/ui/Container"

const BlockContainer = styled(Container)`
  border-radius: 32px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 32px;
  width: 100%;
  box-sizing: border-box;
`

export default BlockContainer
