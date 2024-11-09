import { skipToken } from "@reduxjs/toolkit/query"
import { useParams } from "react-router-dom"
import styled from "styled-components"

import { useGetWishitemsQuery } from "@entities/wishitem/api"
import WishitemPreview from "@entities/wishitem/ui/WishitemPreview"
import CreateWishitemButton from "@features/upsert-wishitem/ui/CreateWishitemButton"
import Container from "@shared/ui/Container"

export default function WishlistEditItems() {
  const { id } = useParams()

  const { data: wishitems } = useGetWishitemsQuery(id ?? skipToken)

  if (!wishitems) return null

  return (
    <Wrapper>
      <CreateWishitemButton />

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

const StyledWishitemPreview = styled(WishitemPreview)`
  &:hover {
  }
`
