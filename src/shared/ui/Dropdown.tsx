import { useMemo } from "react"

import clsx from "clsx"
import styled from "styled-components"

import DropdownIcon from "@shared/assets/DropdownIcon"
import { text16, text16SemiBold } from "@shared/fonts"
import useDropdown from "@shared/hooks/useDropdown"

import Container from "./Container"

type Option = {
  value: string
  label: string
}

type DropdownProps = {
  options?: Option[]
  value: string
  onChange: (value: string) => void
  label: string
  className?: string
  error?: string
  placeholder?: string
  required?: boolean
}

export default function Dropdown({
  options,
  value,
  onChange,
  label,
  className,
  error,
  placeholder,
  required = false,
}: DropdownProps) {
  const { isOpen } = useDropdown()

  const mappedOptions = useMemo(
    () => new Map(options?.map(({ value, label }) => [value, label])),
    [options]
  )

  const valueLabel = mappedOptions.get(value)

  return (
    <Wrapper>
      <Label>
        <span>
          {label}
          {required && "*"}
        </span>

        <DropdownTrigger className={clsx(className)}>
          {valueLabel ? (
            <Value>{valueLabel}</Value>
          ) : (
            <Placeholder>{placeholder}</Placeholder>
          )}

          <DropdownIcon />
        </DropdownTrigger>
      </Label>

      <ListWrapper></ListWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`

const Label = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  > span {
    ${text16SemiBold};
  }
`

const DropdownTrigger = styled(Container)`
  cursor: pointer;
  border-radius: 24px;
  background: var(--color-background-action);

  height: 48px;
  padding: 0 12px 0 24px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Placeholder = styled.span`
  ${text16};
  color: var(--color-black-secondary);
`

const Value = styled.span`
  ${text16};
`

const ListWrapper = styled.div``
