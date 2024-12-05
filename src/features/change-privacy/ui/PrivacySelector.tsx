import { useEffect, useState } from "react"

import { useGetWishlistQuery } from "@entities/wishlist/api"
import { PrivateMode } from "@entities/wishlist/model/Wishlist"
import Dropdown from "@shared/ui/Dropdown"

const options = [
  { value: PrivateMode.Public, label: "Для всех" },
  { value: PrivateMode.Restricted, label: "Для выбранных людей" },
  { value: PrivateMode.Friends, label: "Для друзей" },
]

type PrivacySelectorProps = {
  wishlistId: string
}

export default function PrivacySelector({ wishlistId }: PrivacySelectorProps) {
  const { currentData: wishlist } = useGetWishlistQuery(wishlistId)

  const [privacy, setPrivacy] = useState(
    wishlist?.privateMode ?? PrivateMode.Public
  )

  useEffect(() => {
    if (wishlist) setPrivacy(wishlist.privateMode)
  }, [wishlist])

  return (
    <Dropdown
      value={privacy}
      onChange={value => setPrivacy(value as PrivateMode)}
      label={""}
      options={options}
    />
  )
}
