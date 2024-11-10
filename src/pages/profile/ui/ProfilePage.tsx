import { skipToken } from "@reduxjs/toolkit/query"
import { useParams } from "react-router-dom"
import styled from "styled-components"

import { useGetMeQuery, useGetUserQuery } from "@entities/user/api"
import { selectIsLoggedIn } from "@shared/auth"
import { useAppSelector } from "@shared/hooks/store"

import InfoBlock from "./InfoBlock"

export default function ProfilePage() {
  const { id } = useParams()

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { data: user } = useGetUserQuery(id ?? skipToken)
  const { data: me } = useGetMeQuery(isLoggedIn ? undefined : skipToken)

  const isMe = me?.id === user?.id && !!me

  if (!user || (isLoggedIn && !me)) return null

  return (
    <Wrapper>
      <InfoBlock isMe={isMe} user={user} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 450px 900px;
  justify-content: stretch;

  width: fit-content;

  margin: 100px auto 60px;
`
