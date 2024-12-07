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
}
