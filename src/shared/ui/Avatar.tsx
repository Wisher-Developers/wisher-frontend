import styled from "styled-components"

import ProfileIcon from "../assets/ProfileIcon"

type AvatarProps = {
  src?: string | null
  size: number
}

export default function Avatar({ src, size }: AvatarProps) {
  if (src)
    return (
      <StyledImage
        src={src}
        alt="avatar"
        style={{ width: size, height: size }}
      />
    )

  return <ProfileIcon width={size} height={size} />
}

const StyledImage = styled.img`
  border-radius: 50%;
`
