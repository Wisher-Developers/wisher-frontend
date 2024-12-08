import Button from "@shared/ui/Button"

import { useGenerateAccessLinkMutation } from "../api"

type GenerateLinkButtonProps = {
  wishlistId: string
}

export default function GenerateLinkButton({
  wishlistId,
}: GenerateLinkButtonProps) {
  const [generateLink, { isLoading }] = useGenerateAccessLinkMutation()

  const handleCreateLink = async () => {
    await generateLink(wishlistId)
  }

  return (
    <Button
      size="m"
      appearance="secondary"
      onClick={handleCreateLink}
      isLoading={isLoading}
    >
      Сгенерировать ссылку
    </Button>
  )
}
