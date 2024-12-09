import styled from "styled-components"

import { Wishlist } from "@entities/wishlist/model/Wishlist"
import GenerateLinkButton from "@features/generate-link/ui/GenerateLinkButton"
import CopyIcon from "@shared/assets/CopyIcon"
import { text16, text20SemiBold } from "@shared/fonts"
import Container from "@shared/ui/Container"

import BlockContainer from "./BlockContainer"

type LinkBlockProps = {
  wishlist?: Wishlist
}

export default function LinkBlock({ wishlist }: LinkBlockProps) {
  const link = `${window.location.origin}/share/${wishlist?.accessLink}`

  const handleCopy = () => {
    if (wishlist?.accessLink) navigator.clipboard.writeText(link)
  }

  return (
    <StyledBlock>
      <h3>Ссылка</h3>
      <p>Все, у кого есть эта ссылка, могут получить доступ к этому вишлисту</p>

      {wishlist?.accessLink && (
        <LinkContainer>
          <span>{link}</span>
          <button onClick={handleCopy} data-testid="copy-link">
            <CopyIcon />
          </button>
        </LinkContainer>
      )}

      {wishlist && <GenerateLinkButton wishlistId={wishlist?.id} />}
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

const LinkContainer = styled(Container)`
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
