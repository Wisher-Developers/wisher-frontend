import styled from "styled-components"

import { User } from "@entities/user/model/User"
import AddFriendSearch from "@features/manage-friend/ui/AddFriendSearch"
import { text20SemiBold } from "@shared/fonts"

import BlockContainer from "./BlockContainer"

type FriendsBlockProps = {
  isMe: boolean
  user: User
}

export default function FriendsBlock({ user, isMe }: FriendsBlockProps) {
  return (
    <StyledBlock>
      <h3>Друзья</h3>
      {isMe && <AddFriendSearch />}
    </StyledBlock>
  )
}

const StyledBlock = styled(BlockContainer)`
  grid-area: friends;
  gap: 16px;

  > h3 {
    ${text20SemiBold};
  }
`
