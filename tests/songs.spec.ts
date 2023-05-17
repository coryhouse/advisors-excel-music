import { test, expect } from "@playwright/test";

test("should display add song form", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByRole("heading", { name: "Add Song" })).toBeVisible();

  // Add song
  await page.getByLabel("Title").fill("Tomorrow");
  await page.getByLabel("Artist").fill("Garth Brooks");
  await page.getByLabel("Length").fill("3:45");
  await page.getByRole("button", { name: "Add Song" }).click();
});
