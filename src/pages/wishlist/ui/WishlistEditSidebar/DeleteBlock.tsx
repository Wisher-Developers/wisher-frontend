import styled from "styled-components"

import { text16, text20SemiBold } from "@shared/fonts"
import Button from "@shared/ui/Button"

import BlockContainer from "../BlockContainer"

type DeleteBlockProps = {
  finishEditing: () => void
}

export default function DeleteBlock({ finishEditing }: DeleteBlockProps) {
  return (
    <StyledBlock>
      <div>
        <h3>Ты редактируешь вишлист</h3>
        <p>
          Ты можешь изменить название и описание вишлиста, а также управлять
          доступом и вишайтемами. Все изменения, кроме переименования,
          применяются автоматически.
        </p>
      </div>
      <Button size="m" appearance="secondary" onClick={finishEditing}>
        Закончить редактирование
      </Button>
      <DeleteButton size="m" appearance="secondary">
        Удалить вишлист
      </DeleteButton>
    </StyledBlock>
  )
}

const StyledBlock = styled(BlockContainer)`
  display: flex;
  flex-direction: column;
  gap: 16px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  h3 {
    ${text20SemiBold};
  }

  p {
    ${text16};
    color: var(--color-black-secondary);
  }
`

const DeleteButton = styled(Button)`
  color: var(--color-red) !important;
`
