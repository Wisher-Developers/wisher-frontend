import { test as base } from "@playwright/test"

import { MainPage } from "./pageobjects/main-page"
import { ProfilePage } from "./pageobjects/profile-page"
import { WishlistPage } from "./pageobjects/wishlist-page"

type Fixtures = {
  mainPage: MainPage
  profilePage: ProfilePage
  wishlistPage: WishlistPage
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

  wishlistPage: async ({ page }, use) => {
    const wishlistPage = new WishlistPage(page)

    await use(wishlistPage)
  },
})

export { expect } from "@playwright/test"
