import styled from "styled-components"

import { PrivateMode, Wishlist } from "@entities/wishlist/model/Wishlist"
import getPeopleCase from "@pages/wishlist/lib/getPeopleCase"
import { text16, text20SemiBold } from "@shared/fonts"

import BlockContainer from "./BlockContainer"

const privateModeToText: Record<PrivateMode, string> = {
  [PrivateMode.Public]: "Для всех",
  [PrivateMode.ByLink]: "По ссылке",
  [PrivateMode.Friends]: "Для друзей",
  [PrivateMode.Restricted]: "Для выбранных людей",
}

type AccessBlockProps = {
  wishlist: Wishlist
}

export default function AccessBlock({ wishlist }: AccessBlockProps) {
  return (
    <StyledBlock>
      <h3>Доступ</h3>
      <p>
        {privateModeToText[wishlist.privateMode]}
        {wishlist.privateMode === PrivateMode.Restricted &&
          ` (${wishlist.allowedUsers.length} ${getPeopleCase(wishlist.allowedUsers.length)})`}
      </p>
      {wishlist.privateMode === PrivateMode.ByLink && null}
    </StyledBlock>
  )
}

const StyledBlock = styled(BlockContainer)`
  > h3 {
    ${text20SemiBold};
  }

  > p {
    ${text16};
    color: var(--color-black-secondary);
  }
`
