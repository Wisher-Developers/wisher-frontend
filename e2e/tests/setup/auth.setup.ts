import { test as setup } from "~/e2e/fixtures"
import { AUTH_PATH } from "~/playwright.config"

setup("authenticate", async ({ page, mainPage }) => {
  await mainPage.goto()
  await mainPage.register()

  await page.context().storageState({ path: AUTH_PATH })
})
