import { useRef } from "react"

import styled from "styled-components"

import CrossIcon from "@shared/assets/CrossIcon"
import PlusIcon from "@shared/assets/PlusIcon"
import { text16, text16SemiBold } from "@shared/fonts"
import useFileUploader from "@shared/hooks/useFileUploader"

type FileUploaderProps = {
  label: string
  placeholder: string
  uploadFile: (file: File) => Promise<void>
  resetFile?: () => void
  accept?: string
}

export default function FileUploader({
  label,
  placeholder,
  uploadFile,
  resetFile,
  accept,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const { onChange, clear, currentFile } = useFileUploader(uploadFile)

  const onClearClick = () => {
    resetFile?.()
    clear()
  }

  return (
    <Wrapper {...(currentFile ? { for: "" } : {})}>
      <span>{label}</span>

      <InputWrapper>
        {currentFile ? (
          <span>
            {currentFile.name}{" "}
            <ClearButton onClick={onClearClick}>
              <CrossIcon />
            </ClearButton>
          </span>
        ) : (
          <>
            <span>
              <PlusIcon width={24} height={24} /> {placeholder}
            </span>
            <input
              accept={accept}
              onChange={onChange}
              type="file"
              ref={inputRef}
            />
          </>
        )}
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

const ClearButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  height: 24px;
`
