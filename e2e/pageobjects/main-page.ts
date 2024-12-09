import { Locator, Page } from "@playwright/test"

import { email, password, username } from "~/e2e/userData"

export class MainPage {
  private readonly registerButton: Locator
  private readonly usernameInput: Locator
  private readonly emailInput: Locator
  private readonly passwordInput: Locator
  private readonly confirmPasswordInput: Locator
  private readonly submitButton: Locator

  private readonly continueButton: Locator

  constructor(public readonly page: Page) {
    this.registerButton = this.page.getByTestId("register-button")
    this.usernameInput = this.page.getByTestId("register-username")
    this.emailInput = this.page.getByTestId("register-email")
    this.passwordInput = this.page.getByTestId("register-password")
    this.confirmPasswordInput = this.page.getByTestId(
      "register-repeat-password"
    )
    this.submitButton = this.page.getByTestId("signup-button")

    this.continueButton = this.page.getByRole("button", {
      name: "или продолжить без регистрации",
    })
  }

  async goto() {
    await this.page.goto("http://localhost:3000")
  }

  async register() {
    await this.registerButton.click()

    await this.usernameInput.fill(username)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.confirmPasswordInput.fill(password)

    await this.submitButton.click()

    await this.page.waitForLoadState("networkidle")
  }

  async login() {
    await this.registerButton.click()
    await this.page.getByRole("button", { name: "Войти" }).click()

    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)

    await this.submitButton.click()

    await this.page.waitForLoadState("networkidle")
  }

  async loginAsTestUser() {
    if (!process.env.TEST_USER_USERNAME || !process.env.TEST_USER_PASSWORD)
      throw new Error("The environment is not configured properly")

    await this.registerButton.click()
    await this.page.getByRole("button", { name: "Войти" }).click()

    await this.usernameInput.fill(process.env.TEST_USER_USERNAME)
    await this.passwordInput.fill(process.env.TEST_USER_PASSWORD)

    await this.submitButton.click()

    await this.page.waitForLoadState("networkidle")
  }

  async continueWithoutRegistration() {
    await this.continueButton.click()
  }
}
