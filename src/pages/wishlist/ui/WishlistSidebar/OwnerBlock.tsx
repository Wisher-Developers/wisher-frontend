import { Link } from "react-router-dom"
import styled from "styled-components"

import { Wishlist } from "@entities/wishlist/model/Wishlist"
import { text20SemiBold } from "@shared/fonts"

import BlockContainer from "./BlockContainer"

type OwnerBlockProps = {
  wishlist: Wishlist
}

export default function OwnerBlock({ wishlist }: OwnerBlockProps) {
  return (
    <StyledBlock>
      <h3>
        Вишлист пользователя{" "}
        <Link to={`/profile/${wishlist.owner.id}`}>{wishlist.owner.name}</Link>
      </h3>
    </StyledBlock>
  )
}

const StyledBlock = styled(BlockContainer)`
  > h3 {
    ${text20SemiBold};

    > a {
      color: var(--color-black);
      transition: color var(--transition-duration) var(--transition-function);

      &:hover {
        color: var(--color-black-secondary);
      }
    }
  }
`
