import { PlaywrightTestConfig, defineConfig, devices } from "@playwright/test"

export const AUTH_PATH = "e2e/playwright/.auth/user.json"
export const USER_DATA_PATH = "e2e/playwright/.user/userData.json"

const projects: PlaywrightTestConfig["projects"] = [
  {
    name: "setup",
    testMatch: /.*\.setup\.ts/,
  },
  {
    name: "chromium",
    use: {
      ...devices["Desktop Chrome"],
      storageState: AUTH_PATH,
      viewport: { width: 1600, height: 900 },
    },
    dependencies: ["setup"],
  },
]

export default defineConfig({
  testDir: "./e2e/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: [
    ["junit", { outputFile: "test_results.xml" }],
    ["html", { outputFolder: "html-report", open: "never" }],
  ],
  use: {
    headless: true,
    video: process.env.CI ? "retain-on-failure" : "on",
    screenshot: process.env.CI ? "only-on-failure" : "on",
    baseURL: "http://localhost:3000",
  },
  projects,
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
  globalSetup: "./e2e/setup.ts",
})
