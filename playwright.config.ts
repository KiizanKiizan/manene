import { devices } from "@playwright/test";
import { defineConfig } from "next/experimental/testmode/playwright";
import path from "path";

const PORT = process.env.PORT || 3001;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  timeout: 5 * 1000,
  testDir: path.join(__dirname, "tests"),
  retries: 0,
  webServer: {
    command: "yarn dev -- --experimental-test-proxy",
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: true,
  },
  use: {
    baseURL,
  },
  reporter: [["html", { open: "always" }]],
  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
