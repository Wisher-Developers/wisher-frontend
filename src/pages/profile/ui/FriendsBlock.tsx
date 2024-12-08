import styled from "styled-components"

import { useGetFriendsQuery } from "@entities/user/api/friends"
import { User } from "@entities/user/model/User"
import AddFriendSearch from "@features/manage-friend/ui/AddFriendSearch"
import RequestList from "@features/reply-to-request/ui/RequestList"
import { text16, text20, text20SemiBold } from "@shared/fonts"
import Avatar from "@shared/ui/Avatar"

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
      {isMe && <h4>Друзья ({friends.length})</h4>}

      <FriendsList>
        {friends.map(friend => (
          <FriendItem key={friend.id}>
            <Avatar src={friend.avatar} size={32} />
            <span>{friend.username}</span>
          </FriendItem>
        ))}
      </FriendsList>
    </StyledBlock>
  )
}

const StyledBlock = styled(BlockContainer)`
  grid-area: friends;
  gap: 16px;

  > h3 {
    ${text20SemiBold};
  }

  > h4 {
    ${text16};
  }
`

const FriendsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const FriendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  > span {
    ${text20};
  }
`
