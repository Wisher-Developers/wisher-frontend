import { expect, test } from "~/e2e/fixtures"
import { username } from "~/e2e/userData"

const wishlistName = "shared wishlist name"
const wishlistDescription = "shared wishlist description"

test("Share wishlist via link", async ({
  page,
  mainPage,
  wishlistPage,
  profilePage,
}) => {
  await mainPage.goto()

  await wishlistPage.createWishlist(wishlistName, wishlistDescription)
  await wishlistPage.makeWishlistPrivate()
  await wishlistPage.copyWishlistLink()

  const link = await page
    .getByText("http://localhost:3000/share/")
    .textContent()

  expect(link).toContain("http://localhost:3000/share/")

  await profilePage.goto()
  await profilePage.logout()
  await mainPage.loginAsTestUser()

  await page.goto(link!)

  await expect(page.getByRole("heading", { name: wishlistName })).toBeVisible()
  await expect(page.getByText(wishlistDescription)).toBeVisible()
  await expect(page.getByRole("link", { name: username })).toBeVisible()
})
