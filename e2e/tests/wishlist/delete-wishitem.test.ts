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

  await expect(page.getByText(wishitemName).first()).toBeVisible()
  await expect(page.getByText(wishitemDescription).first()).toBeVisible()

  await wishlistPage.deleteWishitem()

  await expect(page.getByText(wishitemName).first()).not.toBeVisible()
  await expect(page.getByText(wishitemDescription).first()).not.toBeVisible()
})
