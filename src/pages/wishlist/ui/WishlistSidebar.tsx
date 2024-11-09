import { skipToken } from "@reduxjs/toolkit/query"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"

import { useGetUserQuery } from "@entities/user/api"
import { User } from "@entities/user/model/User"
import { useGetWishlistQuery } from "@entities/wishlist/api"
import { PrivateMode, Wishlist } from "@entities/wishlist/model/Wishlist"
import { text16, text20SemiBold, text24SemiBold } from "@shared/fonts"
import Container from "@shared/ui/Container"

import getPeopleCase from "../lib/getPeopleCase"

const privateModeToText: Record<PrivateMode, string> = {
  [PrivateMode.Public]: "Для всех",
  [PrivateMode.ByLink]: "По ссылке",
  [PrivateMode.Friends]: "Для друзей",
  [PrivateMode.Restricted]: "Для выбранных людей",
}

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
    privateMode: PrivateMode.Restricted,
    allowedUsers: [],
  }

  if (!wishlist && !user) return null

  const isOwner = wishlist.owner.id === user.id

  return (
    <Wrapper>
      <DescriptionBlock>
        <h2>{wishlist.name}</h2>
        <p>{wishlist.description}</p>
      </DescriptionBlock>

      {isOwner ? (
        <AccessBlock>
          <h3>Доступ</h3>
          <p>
            {privateModeToText[wishlist.privateMode]}
            {wishlist.privateMode === PrivateMode.Restricted &&
              ` (${wishlist.allowedUsers.length} ${getPeopleCase(wishlist.allowedUsers.length)})`}
          </p>
        </AccessBlock>
      ) : (
        <OwnerBlock>
          <p>
            Вишлист пользователя{" "}
            <Link to={`/profile/${wishlist.owner.id}`}>
              {wishlist.owner.name}
            </Link>
          </p>
        </OwnerBlock>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const BlockContainer = styled(Container)`
  border-radius: 32px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 32px;
  width: 100%;
  box-sizing: border-box;
`

const DescriptionBlock = styled(BlockContainer)`
  > h2 {
    ${text24SemiBold};
  }

  > p {
    ${text16};
    color: var(--color-black-secondary);
  }
`

const OwnerBlock = styled(BlockContainer)`
  > p {
    ${text16};

    > a {
      color: var(--color-black);
      transition: color var(--transition-duration) var(--transition-function);

      &:hover {
        color: var(--color-black-secondary);
      }
    }
  }
`

const AccessBlock = styled(BlockContainer)`
  > h3 {
    ${text20SemiBold};
  }

  > p {
    ${text16};
    color: var(--color-black-secondary);
  }
`
