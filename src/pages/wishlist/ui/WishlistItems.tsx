import { skipToken } from "@reduxjs/toolkit/query"
import { useParams } from "react-router-dom"
import styled from "styled-components"

import { useGetWishitemsQuery } from "@entities/wishitem/api"
import WishitemPreview from "@entities/wishitem/ui/WishitemPreview"
import { text16 } from "@shared/fonts"
import Container from "@shared/ui/Container"

export default function WishlistItems() {
  const { id } = useParams()

  const { data: wishitems } = useGetWishitemsQuery(id ?? skipToken)

  if (!wishitems) return null

  if (wishitems.length === 0)
    return (
      <Wrapper>
        <Empty>Тут пока нет ни одного вишайтема</Empty>
      </Wrapper>
    )

  return (
    <Wrapper>
      {wishitems.map(wishitem => (
        <StyledWishitemPreview key={wishitem.id} wishitem={wishitem} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled(Container)`
  border-radius: 32px;
  padding: 30px;

  display: grid;
  grid-template-columns: repeat(auto-fill, 268px);
  gap: 16px;
`

const Empty = styled.p`
  text-align: center;
  width: 100%;
  ${text16};
`

const StyledWishitemPreview = styled(WishitemPreview)`
  transition:
    transform var(--transition-duration) var(--transition-function),
    box-shadow var(--transition-duration) var(--transition-function);

  &:hover {
    cursor: pointer;
    box-shadow: 0px 12px 32px 0px rgba(24, 24, 24, 0.25);
    transform: translateY(-2px);
  }
`
