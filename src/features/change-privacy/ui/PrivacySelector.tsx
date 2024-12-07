import { useEffect, useState } from "react"

import styled from "styled-components"

import UserSearch from "@entities/user/ui/UserSearch"
import { useGetWishlistQuery } from "@entities/wishlist/api"
import { PrivateMode } from "@entities/wishlist/model/Wishlist"
import Dropdown from "@shared/ui/Dropdown"

import { useChangePrivacyMutation } from "../api"

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

  const [changePrivacy] = useChangePrivacyMutation()

  const handlePrivacyChange = async (value: string) => {
    if (!wishlist) return

    setPrivacy(value as PrivateMode)
    await changePrivacy({ id: wishlist.id, privacy: value as PrivateMode })
  }

  useEffect(() => {
    if (wishlist) setPrivacy(wishlist.privateMode)
  }, [wishlist])

  return (
    <Wrapper>
      <Dropdown
        value={privacy}
        onChange={handlePrivacyChange}
        label={""}
        options={options}
      />

      {privacy === PrivateMode.Restricted && (
        <UserSearch label="Добавить человека" onUserClick={() => {}} />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
