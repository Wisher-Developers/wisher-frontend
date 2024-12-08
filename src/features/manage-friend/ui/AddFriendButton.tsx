import PlusIcon from "@shared/assets/PlusIcon"
import Button from "@shared/ui/Button"

import { useSendRequestMutation } from "../api"

type AddFriendButtonProps = {
  userId: string
}

export default function AddFriendButton({ userId }: AddFriendButtonProps) {
  const [sendRequest] = useSendRequestMutation()

  const handleAddFriendClick = async () => {
    await sendRequest(userId)
  }

  return (
    <Button
      onClick={handleAddFriendClick}
      size="m"
      appearance="secondary"
      icon={<PlusIcon width={32} height={32} />}
    >
      Добавить в друзья
    </Button>
  )
}
