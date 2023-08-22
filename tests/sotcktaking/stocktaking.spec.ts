import { expect, rest, test } from "next/experimental/testmode/playwright/msw";

test.use({
  mswHandlers: [
    rest.get(
      "http://127.0.0.1:3000/igoue_admin/app_api/stocktakings/current",
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            locations: [
              {
                id: 10354,
                mLocationId: 10111,
                mLocationName: "E-02-下",
                totalCount: 21,
                unscannedCount: 0,
                mismatchingCount: 0,
                status: 0,
              },
            ],
          })
        );
      }
    ),
  ],
});
test("/product/shoe", async ({ page }) => {
  await page.goto("/stocktaking");

  await expect(page.locator("body")).toHaveText("E-02-下");
});
