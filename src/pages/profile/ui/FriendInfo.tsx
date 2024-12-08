import { skipToken } from "@reduxjs/toolkit/query"
import styled from "styled-components"

import { useGetMeQuery } from "@entities/user/api"
import {
  useGetFriendsQuery,
  useGetRequestsRecievedQuery,
  useGetRequestsSentQuery,
} from "@entities/user/api/friends"
import { User } from "@entities/user/model/User"
import AddFriendButton from "@features/manage-friend/ui/AddFriendButton"
import RemoveFriendButton from "@features/manage-friend/ui/RemoveFriendButton"
import AcceptFriendRequestButton from "@features/reply-to-request/ui/AcceptFriendRequestButton"
import CancelFriendRequestButton from "@features/reply-to-request/ui/CancelFriendRequestButton"
import FriendsIcon from "@shared/assets/FriendsIcon"
import { selectIsLoggedIn } from "@shared/auth"
import { text20 } from "@shared/fonts"
import { useAppSelector } from "@shared/hooks/store"

type FriendInfoProps = {
  user: User
}

export default function FriendInfo({ user }: FriendInfoProps) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { data: me } = useGetMeQuery(isLoggedIn ? undefined : skipToken)
  const { currentData: friends } = useGetFriendsQuery(user?.id ?? skipToken)
  const { currentData: sentRequests } = useGetRequestsSentQuery(
    isLoggedIn ? undefined : skipToken
  )
  const { currentData: requestsReceived } = useGetRequestsRecievedQuery(
    isLoggedIn ? undefined : skipToken
  )

  const isFriend = friends?.some(friend => friend.id === me?.id)
  const isSentRequest = sentRequests?.some(request => request.id === user.id)
  const isReceivedRequest = requestsReceived?.some(
    request => request.id === user.id
  )

  if (!isLoggedIn || !friends || !sentRequests || !requestsReceived) return null

  if (isFriend)
    return (
      <Wrapper>
        <span>
          <FriendsIcon />
          Вы друзья
        </span>
        <RemoveFriendButton userId={user.id} />
      </Wrapper>
    )
  else if (isSentRequest)
    return (
      <Wrapper>
        <span>Заявка в друзья отправлена</span>
        <CancelFriendRequestButton userId={user.id} />
      </Wrapper>
    )
  else if (isReceivedRequest)
    return (
      <Wrapper>
        <span>Этот пользователь хочет стать твоим другом</span>
        <AcceptFriendRequestButton userId={user.id} />
      </Wrapper>
    )
  else
    return (
      <Wrapper>
        <AddFriendButton userId={user.id} />
      </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  > span {
    ${text20};
    color: var(--color-black-secondary);

    display: flex;
    align-items: center;
    gap: 8px;
  }
`
