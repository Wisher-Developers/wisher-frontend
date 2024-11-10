import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

export default function useDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const wrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      const listener = () => setIsOpen(false)
      document.addEventListener("click", listener)

      return () => document.removeEventListener("click", listener)
    }
  }, [isOpen])

  const toggleOpen: MouseEventHandler<HTMLDivElement> = event => {
    event.stopPropagation()

    setIsOpen(prev => !prev)
  }

  const close = useCallback(() => setIsOpen(false), [])

  return { isOpen, wrapper, toggleOpen, close }
}
