import { Locator, Page } from "@playwright/test"

export class ProfilePage {
  private readonly logoutButton: Locator

  readonly profileButton: Locator

  readonly username: Locator
  readonly email: Locator

  private readonly friendSearch: Locator

  constructor(public readonly page: Page) {
    this.logoutButton = this.page.getByRole("button", { name: "Выйти" })

    this.profileButton = this.page.getByTestId("profile-link")

    this.username = this.page.getByTestId("username")
    this.email = this.page.getByTestId("email")

    this.friendSearch = this.page.getByPlaceholder("Начни вводить никнейм")
  }

  async logout() {
    await this.logoutButton.click()
  }

  async goto() {
    await this.profileButton.click()
  }

  async addFriend(friendUsername: string) {
    await this.friendSearch.fill(friendUsername)

    await this.page.getByRole("button", { name: friendUsername }).click()
  }

  async acceptFriendRequest(friendUsername: string) {
    await this.page.getByTestId(`accept-request-${friendUsername}`).click()
  }
}
