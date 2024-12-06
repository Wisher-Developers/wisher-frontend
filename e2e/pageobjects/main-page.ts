import { Locator, Page } from "@playwright/test"

export class MainPage {
  private readonly registerButton: Locator
  private readonly usernameInput: Locator
  private readonly emailInput: Locator
  private readonly passwordInput: Locator
  private readonly confirmPasswordInput: Locator
  private readonly submitButton: Locator

  constructor(public readonly page: Page) {
    this.registerButton = this.page.getByTestId("register-button")
    this.usernameInput = this.page.getByTestId("register-username")
    this.emailInput = this.page.getByTestId("register-email")
    this.passwordInput = this.page.getByTestId("register-password")
    this.confirmPasswordInput = this.page.getByTestId(
      "register-repeat-password"
    )
    this.submitButton = this.page
      .locator("form")
      .getByRole("button", { name: "Зарегистрироваться" })
  }

  async goto() {
    await this.page.goto("http://localhost:3000")
  }

  async register() {
    const currentTimestamp = Date.now()

    await this.registerButton.click()

    await this.usernameInput.fill(`test_user_${currentTimestamp}`)
    await this.emailInput.fill(`test@${currentTimestamp}`)
    await this.passwordInput.fill("test_password")
    await this.confirmPasswordInput.fill("test_password")

    await this.submitButton.click()

    await this.page.waitForLoadState("networkidle")
  }
}
