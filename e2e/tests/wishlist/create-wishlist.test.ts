import { expect, test } from "~/e2e/fixtures"

const wishlistName = "wishlist name"
const wishlistDescription = "wishlist description"

const newWishlistName = "new wishlist name"
const newWishlistDescription = "new wishlist description"

test("Create wishlist", async ({
  page,
  mainPage,
  profilePage,
  wishlistPage,
}) => {
  await mainPage.goto()

  await wishlistPage.createWishlist(wishlistName, wishlistDescription)

  // check that the wishlist is created
  await expect(wishlistPage.renameWishlistNameInput).toHaveValue(wishlistName)
  await expect(wishlistPage.renameWishlistDescriptionInput).toHaveValue(
    wishlistDescription
  )

  // change wishlist name and description
  await wishlistPage.renameWishlist(newWishlistName, newWishlistDescription)
  await wishlistPage.endEditing()

  // check that new data is visible
  await expect(
    page.getByRole("heading", { name: newWishlistName })
  ).toBeVisible()
  await expect(page.getByText(newWishlistDescription)).toBeVisible()

  // go to profile page to check if the wishlist is created
  await profilePage.goto()

  await expect(
    page.getByRole("heading", { name: newWishlistName })
  ).toBeVisible()
  await expect(page.getByText(newWishlistDescription)).toBeVisible()
})
