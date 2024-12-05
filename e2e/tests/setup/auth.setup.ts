import { AUTH_PATH } from "~/playwright.config"

import { test as setup } from "../../fixtures"

setup("authenticate", async ({ page, mainPage }) => {
  await mainPage.goto()
  await mainPage.register()

  await page.context().storageState({ path: AUTH_PATH })
})
