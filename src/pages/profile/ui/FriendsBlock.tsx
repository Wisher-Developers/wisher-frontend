import styled from "styled-components"

import { useGetFriendsQuery } from "@entities/user/api/friends"
import { User } from "@entities/user/model/User"
import AddFriendSearch from "@features/manage-friend/ui/AddFriendSearch"
import RequestList from "@features/reply-to-request/ui/RequestList"
import { text20SemiBold } from "@shared/fonts"

import BlockContainer from "./BlockContainer"

type FriendsBlockProps = {
  isMe: boolean
  user: User
}

export default function FriendsBlock({ user, isMe }: FriendsBlockProps) {
  const { currentData: friends } = useGetFriendsQuery(user.id)

  const header = isMe ? "Друзья" : `Друзья (${friends?.length})`

  if (!friends) return null

  return (
    <StyledBlock>
      <h3>{header}</h3>
      {isMe && <AddFriendSearch />}
      {isMe && <RequestList />}
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
