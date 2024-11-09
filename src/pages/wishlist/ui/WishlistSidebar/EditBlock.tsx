import styled from "styled-components"

import { text20SemiBold } from "@shared/fonts"
import Button from "@shared/ui/Button"

import BlockContainer from "./BlockContainer"

type EditBlockProps = {
  startEditing: () => void
}

export default function EditBlock({ startEditing }: EditBlockProps) {
  return (
    <StyledBlock>
      <h3>Это твой вишлист</h3>

      <Button size="m" onClick={startEditing}>
        Редактировать
      </Button>
    </StyledBlock>
  )
}

const StyledBlock = styled(BlockContainer)`
  > h3 {
    ${text20SemiBold};
  }
`
