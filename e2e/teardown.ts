import { existsSync, unlinkSync } from "fs"

import { USER_DATA_PATH } from "~/playwright.config"

export default function teardown() {
  if (existsSync(USER_DATA_PATH)) {
    unlinkSync(USER_DATA_PATH)
  }
}
