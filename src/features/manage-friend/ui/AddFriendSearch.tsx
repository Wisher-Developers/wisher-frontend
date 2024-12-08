import { useNavigate } from "react-router-dom"

import UserSearch from "@entities/user/ui/UserSearch"

import { useSendRequestMutation } from "../api"

export default function AddFriendSearch() {
  const navigate = useNavigate()

  const [sendRequest] = useSendRequestMutation()

  const handleUserClick = async (userId: string) => {
    await sendRequest(userId)
    navigate(`/profile/${userId}`)
  }

  return <UserSearch label="Добавить друга" onUserClick={handleUserClick} />
}
