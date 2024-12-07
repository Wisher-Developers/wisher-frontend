import { ChangeEventHandler, useRef, useState } from "react"

import { skipToken } from "@reduxjs/toolkit/query"
import { Transition } from "react-transition-group"
import styled from "styled-components"

import { text16 } from "@shared/fonts"
import useDebounce from "@shared/hooks/useDebounce"
import Avatar from "@shared/ui/Avatar"
import LabeledInput from "@shared/ui/LabeledInput"

import { useSearchUsersQuery } from "../api"

type UserSearchProps = {
  onUserClick: (userId: string) => void
  label?: string
  placeholder?: string
}

export default function UserSearch({
  onUserClick,
  label = "Поиск",
  placeholder = "Начни вводить никнейм",
}: UserSearchProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const listRef = useRef<HTMLDivElement>(null)

  const debouncedQuery = useDebounce(query, 500)

  const { data: users, isFetching } = useSearchUsersQuery(
    debouncedQuery || skipToken
  )

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setQuery(event.target.value)
  }

  const handleUserClick = (userId: string) => {
    onUserClick(userId)
    setQuery("")
  }

  return (
    <Wrapper>
      <LabeledInput
        label={label}
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <Transition nodeRef={listRef} in={isFocused} timeout={200} unmountOnExit>
        {state => (
          <UsersList data-open={state} ref={listRef}>
            {users?.map(user => (
              <UserItem key={user.id} onClick={() => handleUserClick(user.id)}>
                <Avatar src={user.avatar} size={24} />

                <span>{user.username}</span>
              </UserItem>
            ))}

            {isFetching && <span>Загрузка...</span>}
            {!users && !isFetching && <span>Ничего не найдено</span>}
          </UsersList>
        )}
      </Transition>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`

const UsersList = styled.div`
  border-radius: 24px;
  padding: 16px 24px;
  width: 100%;
  box-sizing: border-box;
  background: var(--color-white);
  box-shadow: 0px 12px 32px 0px rgba(24, 24, 24, 0.25);

  position: absolute;
  top: calc(100% + 8px);
  z-index: 100;

  max-height: 300px;
  overflow-y: auto;

  > span {
    ${text16};
    text-align: center;
  }

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

const UserItem = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  outline: none;

  padding: 8px 0;
  width: 100%;

  display: flex;
  align-items: center;
  gap: 8px;
  transition: color var(--transition-duration) var(--transition-function);

  > span {
    ${text16};
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &:hover {
    color: var(--color-black-hover);
  }
`
