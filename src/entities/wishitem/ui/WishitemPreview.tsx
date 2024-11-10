import clsx from "clsx"
import styled from "styled-components"

import { text16, text24SemiBold } from "@shared/fonts"
import Container from "@shared/ui/Container"

import { Wishitem } from "../model/Wishitem"

type WishitemPreviewProps = {
  wishitem: Wishitem
  className?: string
}

export default function WishitemPreview({
  wishitem,
  className,
}: WishitemPreviewProps) {
  const hasPicture = !!wishitem.picture

  return (
    <StyledContainer className={clsx(className)}>
      {hasPicture && <img src={wishitem.picture} alt={wishitem.name} />}

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
  }

  p {
    ${text16};
    color: var(--color-black-secondary);
  }
`
