import styled from "styled-components"

import { User } from "@entities/user/model/User"
import ProfileIcon from "@shared/assets/ProfileIcon"
import { removeToken } from "@shared/auth/token"
import { text24, text32SemiBold } from "@shared/fonts"
import { useAppDispatch } from "@shared/hooks/store"
import Button from "@shared/ui/Button"

import BlockContainer from "./BlockContainer"

type InfoBlockProps = {
  user: User
  isMe: boolean
}

export default function InfoBlock({ user, isMe }: InfoBlockProps) {
  const dispatch = useAppDispatch()

  const handleSignOutClick = () => {
    dispatch(removeToken())
  }

  return (
    <StyledBlock>
      {user.avatar ? (
        <img src={user.avatar} alt="avatar" />
      ) : (
        <ProfileIcon width={150} height={150} />
      )}
      <div>
        <h2>{user.username}</h2>
        {isMe && <p>{user.email}</p>}
      </div>
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
