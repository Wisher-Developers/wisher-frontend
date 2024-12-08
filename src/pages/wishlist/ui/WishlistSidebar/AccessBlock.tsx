import styled from "styled-components"

import { useGetUsersWithAccessQuery } from "@entities/wishlist/api"
import { PrivateMode, Wishlist } from "@entities/wishlist/model/Wishlist"
import { text16, text20SemiBold } from "@shared/fonts"

import getPeopleCase from "../../lib/getPeopleCase"
import BlockContainer from "../BlockContainer"

const privateModeToText: Record<PrivateMode, string> = {
  [PrivateMode.Public]: "Для всех",
  [PrivateMode.Friends]: "Для друзей",
  [PrivateMode.Restricted]: "Для выбранных людей",
}

type AccessBlockProps = {
  wishlist: Wishlist
}

export default function AccessBlock({ wishlist }: AccessBlockProps) {
  const { data: usersWithAccess } = useGetUsersWithAccessQuery(wishlist.id)

  return (
    <StyledBlock>
      <h3>Доступ</h3>
      <p>
        {privateModeToText[wishlist.privateMode]}
        {wishlist.privateMode === PrivateMode.Restricted &&
          usersWithAccess &&
          ` (${usersWithAccess.length} ${getPeopleCase(usersWithAccess.length)})`}
      </p>
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
