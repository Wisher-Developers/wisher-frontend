import { Outlet } from "react-router-dom"
import styled from "styled-components"

import Navbar from "./Navbar"

export default function NavbarLayout() {
  return (
    <Wrapper>
      <FixedBackground />
      <Navbar />

      <Content>
        <Outlet />
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Content = styled.main``

const FixedBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: var(--color-accent-pale);
  z-index: -1;
`
