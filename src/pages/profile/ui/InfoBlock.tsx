import { useState } from "react"

import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import { User } from "@entities/user/model/User"
import EditProfileForm from "@features/edit-profile/ui/EditProfileForm"
import { removeToken } from "@shared/auth/token"
import { text24, text32SemiBold } from "@shared/fonts"
import { useAppDispatch } from "@shared/hooks/store"
import Avatar from "@shared/ui/Avatar"
import Button from "@shared/ui/Button"

import BlockContainer from "./BlockContainer"
import FriendInfo from "./FriendInfo"

type InfoBlockProps = {
  user: User
  isMe: boolean
}

export default function InfoBlock({ user, isMe }: InfoBlockProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSignOutClick = () => {
    dispatch(removeToken())

    navigate("/")
  }

  if (isEditing) {
    return (
      <StyledBlock>
        <EditProfileForm onSuccess={() => setIsEditing(false)} />
      </StyledBlock>
    )
  }

  return (
    <StyledBlock>
      <Avatar size={150} src={user?.avatar} />

      <div>
        <h2 data-testid="username">{user.username}</h2>
        {isMe && <p data-testid="email">{user.email}</p>}
      </div>

      {isMe && (
        <Button onClick={handleEditClick} size="m" appearance="primary">
          Редактировать профиль
        </Button>
      )}

      {!isMe && <FriendInfo user={user} />}

      {isMe && (
        <SignOutButton
          onClick={handleSignOutClick}
          size="m"
          appearance="secondary"
        >
          Выйти
        </SignOutButton>
      )}
    </StyledBlock>
  )
}

const StyledBlock = styled(BlockContainer)`
  grid-area: info;
  gap: 16px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  h2 {
    margin-top: 8px;
    ${text32SemiBold};
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    ${text24};
    color: var(--color-black-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const SignOutButton = styled(Button)`
  color: var(--color-red) !important;
`
