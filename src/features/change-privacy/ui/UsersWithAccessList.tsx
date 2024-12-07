import styled from "styled-components"

import { useGetUsersWithAccessQuery } from "@entities/wishlist/api"
import CrossIcon from "@shared/assets/CrossIcon"
import { text20 } from "@shared/fonts"
import Avatar from "@shared/ui/Avatar"

import { useRemoveAccessMutation } from "../api"

type UsersWithAccessListProps = {
  wishlistId: string
}

export default function UsersWithAccessList({
  wishlistId,
}: UsersWithAccessListProps) {
  const { data: usersWithAccess } = useGetUsersWithAccessQuery(wishlistId)

  const [removeAccess, { isLoading }] = useRemoveAccessMutation()

  const handleRemoveAccessClick = async (userId: string) => {
    await removeAccess({ wishlistId, userId })
  }

  if (!usersWithAccess || usersWithAccess.length === 0) return null

  return (
    <Wrapper>
      {usersWithAccess.map(user => (
        <UserItem key={user.id} data-loading={isLoading}>
          <Avatar src={user.avatar} size={32} />
          <span>{user.username}</span>

          <RemoveAccessButton onClick={() => handleRemoveAccessClick(user.id)}>
            <CrossIcon />
          </RemoveAccessButton>
        </UserItem>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  > span {
    ${text20};
  }

  &[data-loading="true"] {
    opacity: 0.5;
  }
`

const RemoveAccessButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;

  margin: 0 8px 0 auto;
  padding: 4px;
  height: 32px;
  box-sizing: border-box;
`
