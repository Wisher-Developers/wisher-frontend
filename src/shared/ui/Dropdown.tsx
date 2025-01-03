import { useMemo } from "react"

import clsx from "clsx"
import { Transition } from "react-transition-group"
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
  const { isOpen, wrapper, toggleOpen, close } = useDropdown()

  const mappedOptions = useMemo(
    () => new Map(options?.map(({ value, label }) => [value, label])),
    [options]
  )

  const selectHandler = (value: string) => () => {
    close()
    onChange(value)
  }

  const valueLabel = mappedOptions.get(value)

  return (
    <Wrapper>
      <Label>
        <span>
          {label}
          {required && "*"}
        </span>

        <DropdownTrigger
          className={clsx(className)}
          onClick={toggleOpen}
          data-error={!!error}
        >
          {valueLabel ? (
            <Value>{valueLabel}</Value>
          ) : (
            <Placeholder>{placeholder}</Placeholder>
          )}

          <DropdownIcon />
        </DropdownTrigger>

        {error && <Error>{error}</Error>}
      </Label>

      <Transition in={isOpen} timeout={200} nodeRef={wrapper}>
        {state => (
          <ListWrapper data-open={state} ref={wrapper}>
            {options?.map(({ value: itemValue, label }) => (
              <ListItem
                key={itemValue}
                type="button"
                data-active={value === itemValue}
                onClick={selectHandler(itemValue)}
              >
                {label}
              </ListItem>
            ))}
            {!options?.length && <ListItem disabled>Нет опций</ListItem>}
          </ListWrapper>
        )}
      </Transition>
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

  > span:first-child {
    ${text16SemiBold};
  }
`

const DropdownTrigger = styled(Container)`
  cursor: pointer;
  border-radius: 24px;
  background: var(--color-background-action);
  backdrop-filter: none;

  height: 48px;
  padding: 0 12px 0 24px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &[data-error="true"] {
    background-color: var(--color-red-pale);
    border-color: var(--color-red);
  }
`

const Placeholder = styled.span`
  ${text16};
  color: var(--color-black-secondary);
`

const Value = styled.span`
  ${text16};
`

const Error = styled.span`
  ${text16SemiBold};
  color: var(--color-red);
`

const ListWrapper = styled(Container)`
  border-radius: 24px;
  padding: 16px 24px;
  width: 100%;
  box-sizing: border-box;
  background: var(--color-white);
  box-shadow: 0px 12px 32px 0px rgba(24, 24, 24, 0.25);

  position: absolute;
  top: calc(100% + 8px);
  z-index: 100;

  &[data-open="entering"] {
    animation: dropdownOpen 0.2s ease-in-out;
  }

  &[data-open="entered"] {
    opacity: 1;
  }

  &[data-open="exiting"] {
    animation: dropdownOpen 0.2s ease-in-out reverse;
  }

  &[data-open="exited"] {
    display: none;
  }

  @keyframes dropdownOpen {
    from {
      opacity: 0;
      pointer-events: none;
    }

    to {
      opacity: 1;
      pointer-events: all;
    }
  }
`

const ListItem = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  outline: none;

  padding: 8px 0;
  width: 100%;

  ${text16};
  text-align: left;

  &[data-active="true"] {
    opacity: 0.5;
    cursor: default;
  }
`
