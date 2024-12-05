import { test as base } from "@playwright/test"

import { MainPage } from "./pageobjects/main-page"

type Fixtures = {
  mainPage: MainPage
}

export const test = base.extend<Fixtures>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page)

    await use(mainPage)
  },
})
