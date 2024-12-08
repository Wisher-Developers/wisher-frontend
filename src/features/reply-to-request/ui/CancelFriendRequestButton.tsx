import CrossIcon from "@shared/assets/CrossIcon"
import Button from "@shared/ui/Button"

import { useCancelRequestMutation } from "../api"

type CancelFriendRequestButtonProps = {
  userId: string
}

export default function CancelFriendRequestButton({
  userId,
}: CancelFriendRequestButtonProps) {
  const [cancelRequest] = useCancelRequestMutation()

  const handleCancelRequestClick = async () => {
    await cancelRequest(userId)
  }

  return (
    <Button
      onClick={handleCancelRequestClick}
      size="m"
      appearance="secondary"
      icon={<CrossIcon />}
    >
      Отменить заявку
    </Button>
  )
}
