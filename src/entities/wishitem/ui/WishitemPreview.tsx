import clsx from "clsx"
import styled from "styled-components"

import { text16, text24SemiBold } from "@shared/fonts"
import Container from "@shared/ui/Container"

import { Wishitem } from "../model/Wishitem"

const FALLBACK_IMAGE =
  "https://static.wikia.nocookie.net/gensin-impact/images/c/cd/Yae_Miko_Birthday_2022.png"

type WishitemPreviewProps = {
  wishitem: Wishitem
  onClick?: () => void
  className?: string
}

export default function WishitemPreview({
  wishitem,
  onClick,
  className,
}: WishitemPreviewProps) {
  return (
    <StyledContainer className={clsx(className)} onClick={onClick}>
      <img src={wishitem.picture ?? FALLBACK_IMAGE} alt={wishitem.name} />

      <div>
        <h6>{wishitem.name}</h6>
        <p>{wishitem.description}</p>
      </div>
    </StyledContainer>
  )
}

const StyledContainer = styled(Container)`
  border-radius: 32px;
  width: 268px;
  height: 359px;
  box-sizing: border-box;
  padding: 14px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  > img {
    border-radius: 16px;
    width: 236px;
    height: 236px;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  h6 {
    ${text24SemiBold};
    max-width: 236px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    ${text16};
    color: var(--color-black-secondary);
    max-width: 236px;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`
