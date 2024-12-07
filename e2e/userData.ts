import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { dirname } from "path"

import { USER_DATA_PATH } from "~/playwright.config"

let userData: { username: string; email: string; password: string }

if (existsSync(USER_DATA_PATH)) {
  userData = JSON.parse(readFileSync(USER_DATA_PATH, "utf-8"))
} else {
  const currentTimestamp = Date.now()
  userData = {
    username: `test_user_${currentTimestamp}`,
    email: `test@${currentTimestamp}`,
    password: "test_password",
  }
  mkdirSync(dirname(USER_DATA_PATH), { recursive: true })
  writeFileSync(USER_DATA_PATH, JSON.stringify(userData, null, 2))
}

export const { username, email, password } = userData
