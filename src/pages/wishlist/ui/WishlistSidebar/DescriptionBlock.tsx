import styled from "styled-components"

import { Wishlist } from "@entities/wishlist/model/Wishlist"
import { text16, text24SemiBold } from "@shared/fonts"

import BlockContainer from "../BlockContainer"

type DescriptionBlockProps = {
  wishlist: Wishlist
}

export default function DescriptionBlock({ wishlist }: DescriptionBlockProps) {
  return (
    <StyledBlock>
      <h2>{wishlist.name}</h2>
      <p>{wishlist.description}</p>
    </StyledBlock>
  )
}

const StyledBlock = styled(BlockContainer)`
  > h2 {
    ${text24SemiBold};
  }

  > p {
    ${text16};
    color: var(--color-black-secondary);
  }
`
