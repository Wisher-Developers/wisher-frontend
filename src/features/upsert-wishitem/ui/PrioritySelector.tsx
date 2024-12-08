import { Fragment } from "react/jsx-runtime"
import styled from "styled-components"

import { text13, text16, text16SemiBold } from "@shared/fonts"
import Separator from "@shared/ui/Separator"

const PRIORITIES = Array.from({ length: 5 }, (_, i) => i + 1)

type PrioritySelectorProps = {
  value?: number
  onChange: (value: number) => void
}

export default function PrioritySelector({
  value,
  onChange,
}: PrioritySelectorProps) {
  return (
    <Wrapper>
      <h4>Важность</h4>
      <PrioritiesWrapper>
        <p>не важно</p>
        {PRIORITIES.map(priority => (
          <Fragment key={priority}>
            <PrioritySelectorButton
              onClick={() => onChange(priority)}
              data-active={priority === value}
              type="button"
            >
              {priority}
            </PrioritySelectorButton>
            {priority !== PRIORITIES.length && <Separator height={24} />}
          </Fragment>
        ))}
        <p>очень важно</p>
      </PrioritiesWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  > h4 {
    ${text16SemiBold}
  }
`

const PrioritiesWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;

  > ${Separator} {
    background: var(--color-black-secondary);
  }

  > p {
    ${text13};
    color: var(--color-black-secondary);
    width: 42px;
    text-align: center;
  }
`

const PrioritySelectorButton = styled.button`
  cursor: pointer;
  border-radius: 15px;
  border: 2px solid transparent;
  background: transparent;
  padding: 0;

  width: 50px;
  height: 30px;
  box-sizing: border-box;

  ${text16};
  color: var(--color-black-secondary);

  transition: background var(--transition-duration) var(--transition-function)
    border-color var(--transition-duration) var(--transition-function) color
    var(--transition-duration) var(--transition-function);

  &[data-active="true"] {
    color: var(--color-black);
    background: var(--color-background-action);
    border: 2px solid var(--color-border);
  }
`
