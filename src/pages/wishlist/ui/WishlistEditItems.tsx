import { skipToken } from "@reduxjs/toolkit/query"
import { useParams } from "react-router-dom"
import styled from "styled-components"

import { useGetWishitemsQuery } from "@entities/wishitem/api"
import WishitemPreview from "@entities/wishitem/ui/WishitemPreview"
import DeleteWishitemButton from "@features/delete-wishitem/ui/DeleteWishitemButton"
import CreateWishitemButton from "@features/upsert-wishitem/ui/CreateWishitemButton"
import EditWishitemButton from "@features/upsert-wishitem/ui/EditWishitemButton"
import Container from "@shared/ui/Container"

export default function WishlistEditItems() {
  const { id } = useParams()

  const { data: wishitems } = useGetWishitemsQuery(id ?? skipToken)

  if (!wishitems) return null

  return (
    <Wrapper>
      <CreateWishitemButton />

      {wishitems.map(wishitem => (
        <WishitemWrapper key={wishitem.id}>
          <WishitemPreview wishitem={wishitem} />

          <Hidden>
            <EditWishitemButton wishitem={wishitem} />
            <DeleteWishitemButton wishitem={wishitem} />
          </Hidden>
        </WishitemWrapper>
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

const Hidden = styled.div`
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(32px);

  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 8px;

  position: absolute;
  top: 0;

  opacity: 0;
  transition: opacity var(--transition-duration) var(--transition-function);
`

const WishitemWrapper = styled.div`
  position: relative;
  height: fit-content;
  width: fit-content;

  &:hover ${Hidden} {
    opacity: 1;
  }
`
