import { Link } from "react-router-dom"
import styled from "styled-components"

import { Wishlist } from "@entities/wishlist/model/Wishlist"
import { text16 } from "@shared/fonts"

import BlockContainer from "./BlockContainer"

type OwnerBlockProps = {
  wishlist: Wishlist
}

export default function OwnerBlock({ wishlist }: OwnerBlockProps) {
  return (
    <StyledBlock>
      <p>
        Вишлист пользователя{" "}
        <Link to={`/profile/${wishlist.owner.id}`}>{wishlist.owner.name}</Link>
      </p>
    </StyledBlock>
  )
}

const StyledBlock = styled(BlockContainer)`
  > p {
    ${text16};

    > a {
      color: var(--color-black);
      transition: color var(--transition-duration) var(--transition-function);

      &:hover {
        color: var(--color-black-secondary);
      }
    }
  }
`
