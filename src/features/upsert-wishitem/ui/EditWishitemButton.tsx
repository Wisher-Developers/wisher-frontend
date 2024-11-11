import { Wishitem } from "@entities/wishitem/model/Wishitem"
import EditIcon from "@shared/assets/EditIocn"
import usePopup from "@shared/hooks/usePopup"
import Button from "@shared/ui/Button"

import UpsertWishitemPopup from "./UpsertWishitemPopup"

type EditWishitemButtonProps = {
  wishitem: Wishitem
}

export default function EditWishitemButton({
  wishitem,
}: EditWishitemButtonProps) {
  const { isOpen, open, close } = usePopup()

  return (
    <>
      <Button
        size="m"
        appearance="secondary"
        icon={<EditIcon />}
        onClick={open}
      >
        Редактировать
      </Button>

      <UpsertWishitemPopup isOpen={isOpen} close={close} wishitem={wishitem} />
    </>
  )
}
