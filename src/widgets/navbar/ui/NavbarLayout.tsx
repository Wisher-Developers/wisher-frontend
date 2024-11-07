import { Outlet } from "react-router-dom"
import styled from "styled-components"

import Navbar from "./Navbar"

export default function NavbarLayout() {
  return (
    <Wrapper>
      <Navbar />

      <Content>
        <Outlet />
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Content = styled.main``
