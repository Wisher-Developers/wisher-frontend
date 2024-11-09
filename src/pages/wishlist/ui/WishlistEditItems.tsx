import { skipToken } from "@reduxjs/toolkit/query"
import { useParams } from "react-router-dom"
import styled from "styled-components"

import { useGetWishitemsQuery } from "@entities/wishitem/api"
import WishitemPreview from "@entities/wishitem/ui/WishitemPreview"
import PlusIcon from "@shared/assets/PlusIcon"
import { text24SemiBold } from "@shared/fonts"
import Container from "@shared/ui/Container"

export default function WishlistEditItems() {
  const { id } = useParams()

  const { data: wishitems } = useGetWishitemsQuery(id ?? skipToken)

  if (!wishitems) return null

  return (
    <Wrapper>
      <AddItem>
        <PlusIcon />

        <span>Новый вишайтем</span>
      </AddItem>

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

const AddItem = styled(Container)`
  cursor: pointer;
  border-radius: 32px;
  width: 268px;
  height: 359px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  > span {
    width: 200px;
    ${text24SemiBold};
    text-align: center;
  }
`
