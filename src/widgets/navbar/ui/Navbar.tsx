import { skipToken } from "@reduxjs/toolkit/query"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { useGetMeQuery } from "@entities/user/api"
import CreateWishlistButton from "@features/create-wishlist/ui/CreateWishlistButton"
import Logo from "@shared/assets/Logo"
import { selectIsLoggedIn } from "@shared/auth"
import { text20SemiBold } from "@shared/fonts"
import { useAppSelector } from "@shared/hooks/store"
import Avatar from "@shared/ui/Avatar"
import Container from "@shared/ui/Container"
import Separator from "@shared/ui/Separator"

export default function Navbar() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { data: me } = useGetMeQuery(isLoggedIn ? undefined : skipToken)

  return (
    <Wrapper>
      <Link to="/">
        <Logo />
      </Link>

      {isLoggedIn ? (
        me && (
          <RightContent>
            {isLoggedIn && (
              <>
                <CreateWishlistButton />
                <Separator height={24} />
              </>
            )}

            <Link to={`/profile/${me.id}`} data-testid="profile-link">
              <ProfileButton>
                {me?.username} <Avatar size={24} src={me?.avatar} />
              </ProfileButton>
            </Link>
          </RightContent>
        )
      ) : (
        <RightContent>
          <Link to="/">
            <ProfileButton>
              Гость <Avatar size={24} />
            </ProfileButton>
          </Link>
        </RightContent>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  position: fixed;
  top: 0;
  z-index: 100;
`

const RightContent = styled(Container)`
  border-radius: 24px;
  box-sizing: border-box;
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 16px;

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    transition: color var(--transition-duration) var(--transition-function);
    ${text20SemiBold};

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

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
`
