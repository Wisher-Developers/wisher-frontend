import PlusIcon from "@shared/assets/PlusIcon"
import Button from "@shared/ui/Button"

import { useAcceptRequestMutation } from "../api"

type AcceptFriendRequestButtonProps = {
  userId: string
}

export default function AcceptFriendRequestButton({
  userId,
}: AcceptFriendRequestButtonProps) {
  const [acceptRequest] = useAcceptRequestMutation()

  const handleAcceptRequestClick = async () => {
    await acceptRequest(userId)
  }

  return (
    <Button
      onClick={handleAcceptRequestClick}
      size="m"
      appearance="secondary"
      icon={<PlusIcon width={32} height={32} />}
    >
      Принять заявку
    </Button>
  )
}
