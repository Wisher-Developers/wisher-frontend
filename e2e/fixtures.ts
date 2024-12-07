import { test as base } from "@playwright/test"

import { MainPage } from "./pageobjects/main-page"
import { ProfilePage } from "./pageobjects/profile-page"

type Fixtures = {
  mainPage: MainPage
  profilePage: ProfilePage
}

export const test = base.extend<Fixtures>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page)

    await use(mainPage)
  },

  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page)

    await use(profilePage)
  },
})

export { expect } from "@playwright/test"
