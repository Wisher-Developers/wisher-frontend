import { expect, test } from "~/e2e/fixtures"

const wishlistName = "wishlist name"
const wishlistDescription = "wishlist description"

const wishitemName = "wishitem name"
const wishitemDescription = "wishitem description"
const wishitemLink = "https://wishitem_link.com"

test("Create a wishitem", async ({ page, mainPage, wishlistPage }) => {
  await mainPage.goto()

  await wishlistPage.createWishlist(wishlistName, wishlistDescription)

  await wishlistPage.createWishitem(
    wishitemName,
    wishitemDescription,
    wishitemLink
  )
  await wishlistPage.endEditing()

  await expect(page.getByText(wishitemName)).toBeVisible()
  await expect(page.getByText(wishitemDescription)).toBeVisible()

  await page.locator("div").filter({ hasText: wishitemName }).nth(1).click()

  await expect(
    page.locator("h3").filter({ hasText: wishitemName })
  ).toBeVisible()
  await expect(page.getByText(wishitemDescription).nth(1)).toBeVisible()
  await expect(page.getByRole("link", { name: wishitemLink })).toBeVisible()
})
