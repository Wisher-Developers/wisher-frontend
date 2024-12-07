import { expect, test } from "~/e2e/fixtures"
import { email, username } from "~/e2e/userData"

test("logout", async ({ page, mainPage, profilePage }) => {
  await mainPage.goto()
  await expect(page).toHaveURL("http://localhost:3000/")

  await profilePage.goto()

  // check if user is logged in
  await expect(profilePage.username).toHaveText(username)
  await expect(profilePage.email).toHaveText(email)

  await profilePage.logout()

  // check if user is logged out
  await expect(page).toHaveURL("http://localhost:3000/")
  await expect(page.getByRole("button", { name: "Гость" })).toBeVisible()

  // login again
  await mainPage.login()

  await profilePage.goto()

  // check if user is logged in again
  await expect(profilePage.username).toHaveText(username)
  await expect(profilePage.email).toHaveText(email)
})
