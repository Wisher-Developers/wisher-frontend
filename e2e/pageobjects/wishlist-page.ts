import { Locator, Page } from "@playwright/test"

export class WishlistPage {
  private readonly createWishlistButton: Locator
  private readonly wishlistNameInput: Locator
  private readonly wishlistDescriptionInput: Locator
  private readonly submitCreationButton: Locator

  private readonly renameWishlistButton: Locator
  readonly renameWishlistNameInput: Locator
  readonly renameWishlistDescriptionInput: Locator

  private readonly endEditingButton: Locator

  private readonly createWishitemButton: Locator
  private readonly wishitemNameInput: Locator
  private readonly wishitemDescriptionInput: Locator
  private readonly wishitemPriorityInput: Locator
  private readonly wishitemLinkInput: Locator
  private readonly submitWishitemButton: Locator

  private readonly deleteWishitemButton: Locator
  private readonly confirmDeletionButton: Locator

  constructor(public readonly page: Page) {
    this.createWishlistButton = this.page.getByTestId("create-wishlist")
    this.wishlistNameInput = this.page.getByTestId("create-wishlist-name")
    this.wishlistDescriptionInput = this.page.getByTestId(
      "create-wishlist-description"
    )
    this.submitCreationButton = this.page.getByTestId("submit-creation")

    this.renameWishlistButton = this.page.getByTestId("rename-wishlist")
    this.renameWishlistNameInput = this.page.getByTestId("rename-wishlist-name")
    this.renameWishlistDescriptionInput = this.page.getByTestId(
      "rename-wishlist-description"
    )

    this.endEditingButton = this.page.getByTestId("end-editing")

    this.createWishitemButton = this.page.getByTestId("create-wishitem")
    this.wishitemNameInput = this.page.getByTestId("wishitem-name")
    this.wishitemDescriptionInput = this.page.getByTestId(
      "wishitem-description"
    )
    this.wishitemPriorityInput = this.page.getByRole("button", {
      name: "5",
      exact: true,
    })
    this.wishitemLinkInput = this.page.getByTestId("wishitem-link")
    this.submitWishitemButton = this.page.getByTestId("submit-wishitem")

    this.deleteWishitemButton = this.page.getByRole("button", {
      name: "Удалить",
      exact: true,
    })
    this.confirmDeletionButton = this.page.getByRole("button", {
      name: "Да, удалить",
    })
  }

  async createWishlist(name: string, description: string) {
    await this.createWishlistButton.click()

    await this.wishlistNameInput.fill(name)
    await this.wishlistDescriptionInput.fill(description)

    await this.submitCreationButton.click()
  }

  async renameWishlist(name: string, description: string) {
    await this.renameWishlistNameInput.fill(name)
    await this.renameWishlistDescriptionInput.fill(description)

    await this.renameWishlistButton.click()
  }

  async endEditing() {
    await this.endEditingButton.click()
  }

  async createWishitem(name: string, description: string, link: string) {
    await this.createWishitemButton.click()

    await this.wishitemNameInput.fill(name)
    await this.wishitemDescriptionInput.fill(description)

    await this.wishitemPriorityInput.click()
    await this.wishitemLinkInput.fill(link)

    await this.submitWishitemButton.click()
  }

  async deleteWishitem() {
    await this.deleteWishitemButton.click()
    await this.confirmDeletionButton.click()
  }
}
