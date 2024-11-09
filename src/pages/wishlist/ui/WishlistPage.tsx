import { useState } from "react"

import { useLocation } from "react-router-dom"
import styled from "styled-components"

import WishlistItems from "./WishlistItems"
import WishlistSidebar from "./WishlistSidebar"

type WishlistPageState = {
  isEditing: boolean
}

export default function WishlistPage() {
  const { state }: { state?: WishlistPageState } = useLocation()

  const [isEditing, setIsEditing] = useState(state?.isEditing ?? false)

  if (isEditing) {
    return (
      <Wrapper>
        {/* <WishlistSidebar setIsEditing={setIsEditing} /> */}

        <WishlistItems />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <WishlistSidebar setIsEditing={setIsEditing} />

      <WishlistItems />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 400px 900px;
  align-items: start;
  gap: 64px;

  width: fit-content;

  margin: 100px auto 60px;
`
