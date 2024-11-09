import { Wishitem } from "@entities/wishitem/model/Wishitem"
import EditIcon from "@shared/assets/EditIocn"
import Button from "@shared/ui/Button"

type EditWishitemButtonProps = {
  wishitem: Wishitem
}

export default function EditWishitemButton({
  wishitem,
}: EditWishitemButtonProps) {
  return (
    <Button size="m" appearance="secondary" icon={<EditIcon />}>
      Редактировать
    </Button>
  )
}
