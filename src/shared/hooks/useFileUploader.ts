import { ChangeEvent, useState } from "react"

export default function useFileUploader(
  uploadFile: (file: File) => Promise<void>
) {
  const [currentFile, setCurrentFile] = useState<File | null>(null)

  const onChange = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length < 1) return

    const file = target.files[0]

    try {
      await uploadFile(file)
      setCurrentFile(file)
    } catch {}
  }

  const clear = () => setCurrentFile(null)

  return { onChange, clear, currentFile }
}
