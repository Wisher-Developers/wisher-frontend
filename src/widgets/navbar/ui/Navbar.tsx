import styled from "styled-components"

import Logo from "@shared/assets/Logo"
import ProfileIcon from "@shared/assets/ProfileIcon"
import { selectIsLoggedIn } from "@shared/auth"
import { text16SemiBold } from "@shared/fonts"
import { useAppSelector } from "@shared/hooks/store"
import Container from "@shared/ui/Container"
import Separator from "@shared/ui/Separator"

export default function Navbar() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Wrapper>
      <Logo />

      <RightContent>
        {!isLoggedIn && (
          <>
            <CreateWishlistButton>Создать вишлист</CreateWishlistButton>
            <Separator height={16} />
          </>
        )}

        <ProfileButton>
          Гость <ProfileIcon />
        </ProfileButton>
      </RightContent>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  position: fixed;
`

const RightContent = styled(Container)`
  border-radius: 16px;
  box-sizing: border-box;
  height: 32px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 16px;

  > button {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    transition: color var(--transition-duration) var(--transition-function);
    ${text16SemiBold};

    > svg path {
      transition: fill var(--transition-duration) var(--transition-function);
    }

    &:hover {
      color: var(--color-black-hover);

      > svg path {
        fill: var(--color-black-hover);
      }
    }
  }
`

const CreateWishlistButton = styled.button``

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
`
