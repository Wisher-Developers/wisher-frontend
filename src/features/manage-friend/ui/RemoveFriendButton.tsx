import CrossIcon from "@shared/assets/CrossIcon"
import Button from "@shared/ui/Button"

import { useRemoveFriendMutation } from "../api"

type RemoveFriendButtonProps = {
  userId: string
}

export default function RemoveFriendButton({
  userId,
}: RemoveFriendButtonProps) {
  const [removeFriend] = useRemoveFriendMutation()

  const handleRemoveFriendClick = async () => {
    await removeFriend(userId)
  }

  return (
    <Button
      appearance="secondary"
      size="m"
      onClick={handleRemoveFriendClick}
      icon={<CrossIcon />}
    >
      Удалить из друзей
    </Button>
  )
}
