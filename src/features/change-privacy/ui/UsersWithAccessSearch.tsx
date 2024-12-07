import UserSearch from "@entities/user/ui/UserSearch"

import { useAddAccessMutation } from "../api"

type UsersWithAccessSearchProps = {
  wishlistId: string
}

export default function UsersWithAccessSearch({
  wishlistId,
}: UsersWithAccessSearchProps) {
  const [addAccess] = useAddAccessMutation()

  const handleUserClick = async (userId: string) => {
    await addAccess({ wishlistId, userId })
  }

  return <UserSearch label="Добавить человека" onUserClick={handleUserClick} />
}
