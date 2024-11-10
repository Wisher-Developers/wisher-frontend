import styled from "styled-components"

import { text20, text32SemiBold } from "@shared/fonts"
import Container from "@shared/ui/Container"

export default function Recomendations() {
  // TODO: add recommended wishitems query
  const wishitems: unknown[] = [13]

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
