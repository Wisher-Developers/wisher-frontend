import { expect, test } from "~/e2e/fixtures"

const wishlistName = "wishlist name"
const wishlistDescription = "wishlist description"

const newWishlistName = "new wishlist name"
const newWishlistDescription = "new wishlist description"

test("create wishlist", async ({
  page,
  mainPage,
  profilePage,
  wishlistPage,
}) => {
  await mainPage.goto()

  await wishlistPage.createWishlist(wishlistName, wishlistDescription)

  await expect(wishlistPage.renameWishlistNameInput).toHaveValue(wishlistName)
  await expect(wishlistPage.renameWishlistDescriptionInput).toHaveValue(
    wishlistDescription
  )

  await wishlistPage.renameWishlist(newWishlistName, newWishlistDescription)

  await wishlistPage.endEditing()

  await expect(
    page.getByRole("heading", { name: newWishlistName })
  ).toBeVisible()
  await expect(page.getByText(newWishlistDescription)).toBeVisible()

  await profilePage.goto()

  await expect(
    page.getByRole("heading", { name: newWishlistName })
  ).toBeVisible()
  await expect(page.getByText(newWishlistDescription)).toBeVisible()
})
