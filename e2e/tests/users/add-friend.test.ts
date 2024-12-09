import { expect, test } from "~/e2e/fixtures"
import { username } from "~/e2e/userData"

const friendName = process.env.TEST_USER_USERNAME

test("Add friend", async ({ page, mainPage, profilePage }) => {
  if (!friendName) throw new Error("TEST_USER_USERNAME is not set")

  await mainPage.goto()
  await profilePage.goto()

  await profilePage.addFriend(friendName)

  await expect(page.getByText(friendName)).toBeVisible()
  await expect(page.getByText("Заявка в друзья отправлена")).toBeVisible()

  await profilePage.goto()
  await profilePage.logout()

  await mainPage.loginAsTestUser()
  await profilePage.goto()

  await expect(page.getByText(username)).toBeVisible()

  await profilePage.acceptFriendRequest(username)

  await page.getByRole("link", { name: username }).click()

  await expect(page.getByText("Вы друзья")).toBeVisible()
})
