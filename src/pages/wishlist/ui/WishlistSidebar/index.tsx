import { skipToken } from "@reduxjs/toolkit/query"
import { useParams } from "react-router-dom"
import styled from "styled-components"

import { User } from "@entities/user/model/User"
import { useGetWishlistQuery } from "@entities/wishlist/api"
import { PrivateMode, Wishlist } from "@entities/wishlist/model/Wishlist"

import AccessBlock from "./AccessBlock"
import DescriptionBlock from "./DescriptionBlock"
import OwnerBlock from "./OwnerBlock"

export default function WishlistSidebar() {
  const { id: wishlistId } = useParams()

  // const { data: user } = useGetUserQuery()
  const user: User = {
    id: "d9b6b8f1-9d1b-4a5c-8e3e-3b6e6f1c6f3b",
    name: "Goosescout",
    email: "m@m",
  }

  // const { data: whishlist } = useGetWishlistQuery(wishlistId ?? skipToken)
  const wishlist: Wishlist = {
    id: "d9b6b8f1-9d1b-4a5c-8e3e-3b6e6f1c6f3f",
    name: "My wishlist",
    description: "My wishlist description",
    owner: {
      id: "d9b6b8f1-9d1b-4a5c-8e3e-3b6e6f1c6f3b",
      name: "Goosescout",
      email: "m@m",
    },
    privateMode: PrivateMode.ByLink,
    allowedUsers: [
      {
        id: "d9b6b8f1-9d1b-4a5c-8e3e-3b6e6f1c6f3b",
        name: "Goosescout",
        email: "m@m",
      },
    ],
  }

  if (!wishlist) return null

  const isOwner = wishlist.owner.id === user.id

  return (
    <Wrapper>
      <DescriptionBlock wishlist={wishlist} />
      {isOwner ? (
        <AccessBlock wishlist={wishlist} />
      ) : (
        <OwnerBlock wishlist={wishlist} />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
