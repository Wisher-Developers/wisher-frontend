import { skipToken } from "@reduxjs/toolkit/query"
import styled from "styled-components"

import { useGetRequestsRecievedQuery } from "@entities/user/api/friends"
import CrossIcon from "@shared/assets/CrossIcon"
import PlusIcon from "@shared/assets/PlusIcon"
import { selectIsLoggedIn } from "@shared/auth"
import { text16, text20 } from "@shared/fonts"
import { useAppSelector } from "@shared/hooks/store"
import Avatar from "@shared/ui/Avatar"

import { useAcceptRequestMutation, useRejectRequestMutation } from "../api"

export default function RequestList() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { currentData: requestsReceived } = useGetRequestsRecievedQuery(
    isLoggedIn ? undefined : skipToken
  )

  const [acceptRequest] = useAcceptRequestMutation()
  const [rejectRequest] = useRejectRequestMutation()

  const handleAcceptClick = async (userId: string) => {
    await acceptRequest(userId)
  }

  const handleRejectClick = async (userId: string) => {
    await rejectRequest(userId)
  }

  if (!requestsReceived || requestsReceived.length === 0) return null

  return (
    <Wrapper>
      <h4>Заявки в друзья ({requestsReceived.length})</h4>
      {requestsReceived?.map(request => (
        <Request key={request.id}>
          <Avatar src={request.avatar} size={32} />
          <span>{request.username}</span>

          <AcceptButton
            onClick={() => handleAcceptClick(request.id)}
            data-testid={`accept-request-${request.username}`}
          >
            <PlusIcon width={24} height={24} />
          </AcceptButton>
          <RejectButton onClick={() => handleRejectClick(request.id)}>
            <CrossIcon />
          </RejectButton>
        </Request>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  > h4 {
    ${text16};
  }
`

const Request = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  > span {
    ${text20};
  }
`

const RejectButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;

  padding: 4px;
  height: 32px;
  box-sizing: border-box;

  > svg path {
    stroke: var(--color-red);
  }
`

const AcceptButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  margin-left: auto;

  padding: 4px;
  height: 32px;
  box-sizing: border-box;
`
