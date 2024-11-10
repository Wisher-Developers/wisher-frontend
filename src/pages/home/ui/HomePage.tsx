import { useState } from "react"

import styled from "styled-components"

import SignUpButton from "@features/signup/ui/SignUpButton"
import AiStartIcon from "@shared/assets/AiStarsIcon"
import { selectIsLoggedIn } from "@shared/auth"
import {
  header64,
  text24,
  text24SemiBold,
  text32,
  text32SemiBold,
} from "@shared/fonts"
import { useAppSelector } from "@shared/hooks/store"
import Container from "@shared/ui/Container"

import Recomendations from "./Recomendations"

export default function HomePage() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [showRecomendations, setShowRecomendations] = useState(isLoggedIn)

  const handleContinueClick = () => setShowRecomendations(true)

  if (!showRecomendations)
    return (
      <Wrapper>
        <Top>
          <Header>
            <h1>Место, где твои мечты становятся реальностью</h1>
            <p>
              Расскажи о чём мечтаешь, и тогда кто-нибудь обязательно исполнит
              твоё желание. А Wisher с этим поможет.
            </p>
          </Header>

          <SignUpButton />
        </Top>

        <Bottom>
          <Cards>
            <Card>
              <h3>Создавай свои вишлисты</h3>
              <p>
                Создавай свои собственные вишлисты и добавляй в них желаемые
                вишайтемы
              </p>
            </Card>
            <Card>
              <h3>
                Получай рекомендации от
                <Ai>
                  <AiStartIcon />
                  ИИ
                </Ai>
              </h3>
              <p>
                Создавай свои собственные вишлисты и добавляй в них желаемые
                вишайтемы
              </p>
            </Card>
            <Card>
              <h3>Делись вишлистами с друзьями</h3>
              <p>
                Добавляй пользователей в друзья, чтобы просматривать их вишлисты
                или делиться своими
              </p>
            </Card>
          </Cards>

          <ContinueButton onClick={handleContinueClick}>
            или продолжить без регистрации
          </ContinueButton>
        </Bottom>
      </Wrapper>
    )

  return <Recomendations />
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 64px;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;

  > h1 {
    ${header64};
    max-width: 820px;
  }

  > p {
    ${text32};
    max-width: 955px;
  }
`

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const Cards = styled.div`
  display: flex;
  align-items: stretch;
  gap: 32px;
`

const Card = styled(Container)`
  border-radius: 32px;
  width: 416px;
  box-sizing: border-box;
  padding: 24px;

  > h3 {
    ${text32SemiBold};
    margin-bottom: 16px;
  }

  > p {
    ${text24};
    color: var(--color-black-secondary);
  }
`

const Ai = styled.span`
  width: 0;
  background: var(--color-accent);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  > svg {
    position: relative;
    top: 4px;
    left: 4px;
  }
`

const ContinueButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  ${text24SemiBold};
  color: var(--color-black-tertiary);
  text-decoration: underline;
`
