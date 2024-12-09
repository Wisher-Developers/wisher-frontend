import { expect, test } from "~/e2e/fixtures"

const wishlistName = "wishlist name"
const wishlistDescription = "wishlist description"

const wishitemName = "wishitem name"
const wishitemDescription = "wishitem description"
const wishitemLink = "https://wishitem_link.com"

const newWishitemName = "new wishitem name"
const newWishitemDescription = "new wishitem description"
const newWishitemLink = "https://new_wishitem_link.com"

test("Edit wishitem", async ({ page, mainPage, wishlistPage }) => {
  mainPage.goto()

  await wishlistPage.createWishlist(wishlistName, wishlistDescription)

  await wishlistPage.createWishitem(
    wishitemName,
    wishitemDescription,
    wishitemLink
  )

  await expect(page.getByText(wishitemName).first()).toBeVisible()
  await expect(page.getByText(wishitemDescription).first()).toBeVisible()

  await wishlistPage.editWishitem(
    newWishitemName,
    newWishitemDescription,
    newWishitemLink
  )
  await wishlistPage.endEditing()

  await expect(page.getByText(newWishitemName).first()).toBeVisible()
  await expect(page.getByText(newWishitemDescription).first()).toBeVisible()
})
