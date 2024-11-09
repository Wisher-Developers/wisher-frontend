import styled from "styled-components"

import { text16 } from "@shared/fonts"
import Container from "@shared/ui/Container"

export default function WishlistItems() {
  return (
    <Wrapper>
      <Empty>Тут пока нет ни одного вишайтема</Empty>
    </Wrapper>
  )
}

const Wrapper = styled(Container)`
  border-radius: 32px;
  padding: 32px;
`

const Empty = styled.p`
  text-align: center;
  width: 100%;
  ${text16};
`
