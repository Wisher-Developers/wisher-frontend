import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import { User } from "@entities/user/model/User"
import { useGetWishlistsQuery } from "@entities/wishlist/api"
import { PrivateMode } from "@entities/wishlist/model/Wishlist"
import {
  text20,
  text20SemiBold,
  text24SemiBold,
  text32SemiBold,
} from "@shared/fonts"
import Container from "@shared/ui/Container"

import BlockContainer from "./BlockContainer"

const privateModeToText: Record<PrivateMode, string> = {
  [PrivateMode.Public]: "Для всех",
  [PrivateMode.Friends]: "Для друзей",
  [PrivateMode.Restricted]: "Для выбранных людей",
}

type WishlistsBlockProps = {
  user: User
  isMe: boolean
}

export default function WishlistsBlock({ user, isMe }: WishlistsBlockProps) {
  const navigate = useNavigate()

  const { currentData: wishlists } = useGetWishlistsQuery(user.id)

  return (
    <StyledBlock>
      <h2>{isMe ? "Твои вишлисты" : "Вишлисты"}</h2>
      {wishlists?.length === 0 && <p>Тут пока нет ни одного вишлиста</p>}

      {wishlists?.map(wishlist => (
        <WishlistItem
          key={wishlist.id}
          onClick={() => navigate(`/wishlist/${wishlist.id}`)}
        >
          <h4>{wishlist.name}</h4>
          <p>{wishlist.description}</p>
          {isMe && <span>{privateModeToText[wishlist.privateMode]}</span>}
        </WishlistItem>
      ))}
    </StyledBlock>
  )
}

const StyledBlock = styled(BlockContainer)`
  grid-area: wishlists;
  gap: 16px;

  > h2 {
    ${text32SemiBold};
  }

  > p {
    ${text20};
    color: var(--color-black-secondary);
  }
`

const WishlistItem = styled(Container)`
  border-radius: 32px;

  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 30px;

  transition:
    transform var(--transition-duration) var(--transition-function),
    box-shadow var(--transition-duration) var(--transition-function);

  &:hover {
    cursor: pointer;
    box-shadow: 0px 12px 32px 0px rgba(24, 24, 24, 0.25);
    transform: translateY(-2px);
  }

  > h4 {
    ${text24SemiBold};
  }

  > p {
    ${text20};
    color: var(--color-black-secondary);
  }

  > span {
    width: 100%;
    text-align: right;
    ${text20SemiBold};
  }
`
