import { Wishitem } from "@entities/wishitem/model/Wishitem"
import PlusIcon from "@shared/assets/PlusIcon"
import usePopup from "@shared/hooks/usePopup"
import Button from "@shared/ui/Button"

import UpsertWishitemPopup from "./UpsertWishlistPopup"

type CopyWishitemButtonProps = {
  original: Omit<Wishitem, "wishlistId">
}

export default function CopyWishitemButton({
  original,
}: CopyWishitemButtonProps) {
  const { isOpen, open, close } = usePopup()

  return (
    <>
      <Button
        appearance="secondary"
        size="m"
        icon={<PlusIcon width={24} height={24} />}
        onClick={open}
      >
        Скопировать
      </Button>

      <UpsertWishitemPopup wishitem={original} isOpen={isOpen} close={close} />
    </>
  )
}
