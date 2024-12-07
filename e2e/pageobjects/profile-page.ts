import { Locator, Page } from "@playwright/test"

export class ProfilePage {
  private readonly logoutButton: Locator

  readonly profileButton: Locator

  readonly username: Locator
  readonly email: Locator

  constructor(public readonly page: Page) {
    this.logoutButton = this.page.getByRole("button", { name: "Выйти" })

    this.profileButton = this.page.getByTestId("profile-link")

    this.username = this.page.getByTestId("username")
    this.email = this.page.getByTestId("email")
  }

  async logout() {
    await this.logoutButton.click()
  }

  async goto() {
    await this.profileButton.click()
  }
}
