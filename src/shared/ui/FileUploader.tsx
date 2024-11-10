import { useRef } from "react"

import styled from "styled-components"

import PlusIcon from "@shared/assets/PlusIcon"
import { text16, text16SemiBold } from "@shared/fonts"
import useFileUploader from "@shared/hooks/useFileUploader"

type FileUploaderProps = {
  label: string
  placeholder: string
  uploadFile: (file: File) => Promise<void>
  resetFile?: () => void
}

export default function FileUploader({
  label,
  placeholder,
  uploadFile,
  resetFile,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const { onChange, clear, currentFile } = useFileUploader(uploadFile)

  return (
    <Wrapper>
      <span>{label}</span>

      <InputWrapper>
        <span>
          <PlusIcon width={24} height={24} /> {placeholder}
        </span>
        <input onChange={onChange} type="file" ref={inputRef} />
      </InputWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${text16SemiBold};
`

const InputWrapper = styled.div`
  cursor: pointer;

  background: var(--color-background-action);
  border-radius: 24px;
  border: 2px solid var(--color-border);
  backdrop-filter: blur(32px);

  box-sizing: border-box;
  height: 48px;
  width: 100%;
  padding: 0 22px;

  display: flex;
  align-items: center;
  justify-content: center;

  > span {
    ${text16};
    color: var(--color-black-secondary);

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    > svg path {
      fill: var(--color-black-secondary);
    }
  }

  > input {
    display: none;
  }
`
