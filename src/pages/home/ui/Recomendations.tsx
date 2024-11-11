import { useState } from "react"

import omit from "lodash/omit"
import styled from "styled-components"

import { useGetRecommendationsQuery } from "@entities/wishitem/api"
import { Wishitem } from "@entities/wishitem/model/Wishitem"
import WishitemPopup from "@entities/wishitem/ui/WishitemPopup"
import WishitemPreview from "@entities/wishitem/ui/WishitemPreview"
import CopyWishitemButton from "@features/upsert-wishitem/ui/CopyWishitemButton"
import { selectIsLoggedIn } from "@shared/auth"
import { text20, text32SemiBold } from "@shared/fonts"
import { useAppSelector } from "@shared/hooks/store"
import usePopup from "@shared/hooks/usePopup"
import Container from "@shared/ui/Container"

export default function Recomendations() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { isOpen, open, close } = usePopup()
  const [selectedWishitem, setSelectedWishitem] = useState<Wishitem | null>(
    null
  )

  const { data: wishitems } = useGetRecommendationsQuery()

  const openPopup = (wishitem: Wishitem) => {
    setSelectedWishitem(wishitem)
    open()
  }

  if (!wishitems) return null

  if (wishitems.length === 0)
    return (
      <Wrapper>
        <Text>
          <h1>Тут пока ничего нет</h1>
          <p>
            Похоже, наша система не смогла определить твои вкусы. Возращаяйся
            позже, и мы обязательно подберём что-нибудь интересное
          </p>
        </Text>
      </Wrapper>
    )

  return (
    <Wrapper>
      <Text>
        <h1>Самые вкусные подарки</h1>
        <p>Подобранные специально для тебя</p>
      </Text>

      <ListWrapper>
        {wishitems.map(wishitem => (
          <StyledWishitemPreview
            key={wishitem.id}
            wishitem={wishitem}
            onClick={() => openPopup(wishitem)}
          />
        ))}
      </ListWrapper>

      {selectedWishitem && (
        <WishitemPopup
          isOpen={isOpen}
          close={close}
          wishitem={selectedWishitem}
          onCloseEnd={() => setSelectedWishitem(null)}
          actions={
            isLoggedIn && (
              <CopyWishitemButton
                original={omit(selectedWishitem, "wishlistId")}
              />
            )
          }
        />
      )}
    </Wrapper>
  )
}

const Wrapper = styled(Container)`
  border-radius: 32px;

  width: 900px;
  box-sizing: border-box;
  padding: 32px;

  margin: 100px auto 60px;
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  > h1 {
    ${text32SemiBold};
  }

  > p {
    ${text20};
    color: var(--color-black-secondary);
    max-width: 600px;
  }
`

const ListWrapper = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 268px);
  gap: 16px;
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
