import { Locator, Page } from "@playwright/test"

export class MainPage {
  private readonly registerButton: Locator

  constructor(public readonly page: Page) {
    this.registerButton = this.page.getByTestId("register-button")
  }
}
