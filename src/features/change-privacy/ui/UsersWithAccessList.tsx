import styled from "styled-components"

import CrossIcon from "@shared/assets/CrossIcon"

import { useGetUsersWithAccessQuery, useRemoveAccessMutation } from "../api"

type UsersWithAccessListProps = {
  wishlistId: string
}

export default function UsersWithAccessList({
  wishlistId,
}: UsersWithAccessListProps) {
  const { data: usersWithAccess } = useGetUsersWithAccessQuery(wishlistId)

  const [removeAccess] = useRemoveAccessMutation()

  const handleRemoveAccessClick = async (userId: string) => {
    await removeAccess({ wishlistId, userId })
  }

  if (!usersWithAccess || usersWithAccess.length === 0) return null

  return (
    <Wrapper>
      {usersWithAccess.map(user => (
        <UserItem key={user.id}>
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
  gap: 8px;
`

const UserItem = styled.div``

const RemoveAccessButton = styled.button``
