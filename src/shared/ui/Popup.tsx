import { MouseEventHandler, ReactNode, useRef } from "react"

import clsx from "clsx"
import { createPortal } from "react-dom"
import { Transition } from "react-transition-group"
import styled from "styled-components"

import Container from "./Container"

type PopupProps = {
  isOpen: boolean
  close: () => void
  onCloseEnd?: () => void
  children?: ReactNode
  className?: string
}

export default function Popup({
  isOpen,
  close,
  onCloseEnd,
  children,
  className,
}: PopupProps) {
  const wrapper = useRef<HTMLDivElement>(null)

  const stopPropagation: MouseEventHandler<HTMLDivElement> = event =>
    event.stopPropagation()

  return createPortal(
    <Transition
      in={isOpen}
      timeout={200}
      onExited={onCloseEnd}
      appear
      nodeRef={wrapper}
    >
      {state => (
        <Background
          onMouseDown={state === "entered" ? close : stopPropagation}
          onClick={stopPropagation}
          data-open={state}
          ref={wrapper}
        >
          <PopupWrapper
            className={clsx(className)}
            onMouseDown={stopPropagation}
            onClick={stopPropagation}
            data-open={state}
          >
            {children}
          </PopupWrapper>
        </Background>
      )}
    </Transition>,
    document.getElementById("root")!
  )
}

const Background = styled.div`
  background: var(--color-shadow);
  backdrop-filter: blur(20px) opacity(1);

  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;

  &[data-open="entering"] {
    animation: appear 0.2s ease-out;
  }

  &[data-open="exiting"] {
    animation: appear 0.2s ease-out reverse;
  }

  &[data-open="exited"] {
    display: none;
  }

  @keyframes appear {
    from {
      background: transparent;
      backdrop-filter: blur(20px) opacity(0);
    }
    to {
      background: var(--color-shadow);
      backdrop-filter: blur(20px) opacity(1);
    }
  }
`

const PopupWrapper = styled(Container)`
  background: var(--color-background-action);
  position: relative;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
  opacity: 1;

  &[data-open="entering"] {
    animation: popup 0.2s ease-in-out;
  }

  &[data-open="exiting"] {
    animation: popup 0.2s ease-in-out reverse;
  }

  &[data-open="exited"] {
    display: none;
  }

  @keyframes popup {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`
