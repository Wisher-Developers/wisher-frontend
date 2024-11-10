import styled from "styled-components"

import { PrivateMode, Wishlist } from "@entities/wishlist/model/Wishlist"
import CopyIcon from "@shared/assets/CopyIcon"
import { text16, text20SemiBold } from "@shared/fonts"
import Container from "@shared/ui/Container"

import BlockContainer from "../BlockContainer"

const privateModeToText: Record<PrivateMode, string> = {
  [PrivateMode.Public]: "Для всех",
  [PrivateMode.ByLink]: "По ссылке",
  [PrivateMode.Friends]: "Для друзей",
  [PrivateMode.Restricted]: "Для выбранных людей",
}

type AccessBlockProps = {
  wishlist: Wishlist
}

export default function AccessBlock({ wishlist }: AccessBlockProps) {
  const copyLink = () => {
    if (wishlist.accessLink) navigator.clipboard.writeText(wishlist.accessLink)
  }

  return (
    <StyledBlock>
      <h3>Доступ</h3>
      <p>
        {privateModeToText[wishlist.privateMode]}
        {/* {wishlist.privateMode === PrivateMode.Restricted &&
          ` (${wishlist.allowedUsers.length} ${getPeopleCase(wishlist.allowedUsers.length)})`} */}
      </p>
      {wishlist.privateMode === PrivateMode.ByLink && (
        <LinkBlock>
          <span>{wishlist.accessLink}</span>
          <button onClick={copyLink}>
            <CopyIcon />
          </button>
        </LinkBlock>
      )}
    </StyledBlock>
  )
}

const StyledBlock = styled(BlockContainer)`
  > h3 {
    ${text20SemiBold};
  }

  > p {
    ${text16};
    color: var(--color-black-secondary);
  }
`

const LinkBlock = styled(Container)`
  border-radius: 24px;
  height: 48px;
  padding: 0 12px 0 24px;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  > span {
    ${text16};

    overflow: hidden;
    text-overflow: ellipsis;
  }

  > button {
    cursor: pointer;
    padding: 0;
    background: none;
    border: none;
    height: 24px;

    > svg path {
      transition: stroke var(--transition-duration) var(--transition-function);
    }

    &:hover {
      > svg path {
        stroke: var(--color-black-hover);
      }
    }
  }
`
