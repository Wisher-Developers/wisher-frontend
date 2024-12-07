import { expect, test } from "~/e2e/fixtures"
import { email, username } from "~/e2e/userData"

test("logout", async ({ page, mainPage, profilePage }) => {
  await mainPage.goto()
  await expect(page).toHaveURL("http://localhost:3000/")

  await profilePage.goto()

  await expect(profilePage.username).toHaveText(username)
  await expect(profilePage.email).toHaveText(email)
})
