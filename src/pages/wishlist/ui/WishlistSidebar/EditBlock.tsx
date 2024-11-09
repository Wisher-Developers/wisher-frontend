import { Link } from "react-router-dom"
import styled from "styled-components"

import { text20SemiBold } from "@shared/fonts"
import Button from "@shared/ui/Button"

import BlockContainer from "./BlockContainer"

export default function EditBlock() {
  return (
    <StyledBlock>
      <h3>Это твой вишлист</h3>

      <Link to="edit" relative="path">
        <Button size="m">Редактировать</Button>
      </Link>
    </StyledBlock>
  )
}

const StyledBlock = styled(BlockContainer)`
  > h3 {
    ${text20SemiBold};
  }

  > a {
    width: 100%;
    text-decoration: none;

    > button {
      width: 100%;
    }
  }
`
