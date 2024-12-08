import { ReactNode } from "react"

import styled from "styled-components"

import { text24, text24SemiBold, text32SemiBold } from "@shared/fonts"
import Popup from "@shared/ui/Popup"

import { Wishitem } from "../model/Wishitem"

const FALLBACK_IMAGE =
  "https://static.wikia.nocookie.net/gensin-impact/images/c/cd/Yae_Miko_Birthday_2022.png"

type WishitemPopupProps = {
  wishitem: Wishitem
  isOpen: boolean
  close: () => void
  onCloseEnd?: () => void
  actions?: ReactNode
}

export default function WishitemPopup({
  wishitem,
  isOpen,
  close,
  onCloseEnd,
  actions,
}: WishitemPopupProps) {
  return (
    <StyledPopup isOpen={isOpen} close={close} onCloseEnd={onCloseEnd}>
      <Left>
        <Description>
          <h3>{wishitem.name}</h3>
          <p>{wishitem.description}</p>
        </Description>

        {wishitem.priority && (
          <Priority>Важность: {wishitem.priority}/5</Priority>
        )}

        {wishitem.link && (
          <Links>
            <p>Ссылки:</p>
            <a href={wishitem.link} target="_blank" rel="noreferrer">
              {wishitem.link}
            </a>
          </Links>
        )}
      </Left>

      <Right>
        <img src={wishitem.picture ?? FALLBACK_IMAGE} alt={wishitem.name} />
      </Right>

      <ActionsWrapper>{actions}</ActionsWrapper>
    </StyledPopup>
  )
}

const StyledPopup = styled(Popup)`
  border-radius: 32px;
  width: 900px;
  padding: 30px;
  box-sizing: border-box;

  display: flex;
  gap: 32px;

  position: relative;
`

const Left = styled.div`
  width: 494px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`

const Description = styled.div`
  > h3 {
    ${text32SemiBold};
  }

  > p {
    ${text24};
    color: var(--color-black-secondary);
  }
`

const Links = styled.div`
  > p {
    ${text24SemiBold};
  }

  > a {
    ${text24};
    color: var(--color-black-secondary);
    text-decoration: underline;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const Right = styled.div`
  > img {
    border: 2px solid var(--color-border);
    border-radius: 32px;
    width: 310px;
    height: 310px;
    box-sizing: border-box;
  }
`

const ActionsWrapper = styled.div`
  position: absolute;
  bottom: -24px;
  right: -24px;
`

const Priority = styled.p`
  ${text24SemiBold};
`
