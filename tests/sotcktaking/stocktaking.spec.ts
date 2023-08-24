import { expect, rest, test } from "next/experimental/testmode/playwright/msw";
import {
  mockStocktakingCurrentChecked,
  mockStocktakingCurrentList,
  mockStocktakingCurrentMismatching,
  mockStocktakingCurrentMismatchingAndUnscanned,
  mockStocktakingCurrentNull,
  mockStocktakingCurrentUnsccaned,
} from "../../mocks/api/stocktaking";

test("棚卸しが開始されていない場合、「棚卸し開始」ボタンが配置されている。", async ({
  page,
  msw,
}) => {
  msw.use(
    rest.get(
      "http://127.0.0.1:3000/igoue_admin/app_api/stocktakings/current",
      mockStocktakingCurrentNull
    )
  );

  const startStocktakingButton = page.getByRole("button", {
    name: "棚卸し開始",
  });
  await page.goto("/stocktaking");
  await expect(startStocktakingButton).toBeVisible();
});

test("棚卸しが既に開始されている場合、棚一覧が取得できる。", async ({
  page,
  msw,
}) => {
  msw.use(
    rest.get(
      "http://127.0.0.1:3000/igoue_admin/app_api/stocktakings/current",
      mockStocktakingCurrentList
    )
  );

  const stocktakingRow = page.locator("id=stocktaking-row");

  await page.goto("/stocktaking");
  await expect(stocktakingRow.nth(0)).toContainText("D-10-下");
  await expect(stocktakingRow.nth(1)).toContainText("D-11-上");
  await expect(stocktakingRow.nth(2)).toContainText("D-11-下");
  await expect(stocktakingRow.nth(3)).toContainText("D-12-上");
  await expect(stocktakingRow.nth(4)).toContainText("D-12-下");
  await expect(stocktakingRow.nth(5)).toContainText("E-01-上");
  await expect(stocktakingRow.nth(6)).toContainText("E-01-下");
  await expect(stocktakingRow.nth(7)).toContainText("E-02-上");
  await expect(stocktakingRow.nth(8)).toContainText("E-02-下");
});

test("棚卸しを開始すると、棚一覧が取得できる。", async ({ page, msw }) => {
  msw.use(
    rest.get(
      "http://127.0.0.1:3000/igoue_admin/app_api/stocktakings/current",
      mockStocktakingCurrentNull
    )
  );
  const startStocktakingButton = page.getByRole("button", {
    name: "棚卸し開始",
  });
  const stocktakingRow = page.locator("id=stocktaking-row");

  await page.goto("/stocktaking");
  await startStocktakingButton.click();
  await expect(stocktakingRow.nth(0)).toContainText("D-10-下");
  await expect(stocktakingRow.nth(1)).toContainText("D-11-上");
  await expect(stocktakingRow.nth(2)).toContainText("D-11-下");
  await expect(stocktakingRow.nth(3)).toContainText("D-12-上");
  await expect(stocktakingRow.nth(4)).toContainText("D-12-下");
  await expect(stocktakingRow.nth(5)).toContainText("E-01-上");
  await expect(stocktakingRow.nth(6)).toContainText("E-01-下");
  await expect(stocktakingRow.nth(7)).toContainText("E-02-上");
  await expect(stocktakingRow.nth(8)).toContainText("E-02-下");
});

test("棚リストにチェック済みの棚がある場合、チェックマークがつき、背景が緑色になっている", async ({
  page,
  msw,
}) => {
  msw.use(
    rest.get(
      "http://127.0.0.1:3000/igoue_admin/app_api/stocktakings/current",
      mockStocktakingCurrentChecked
    )
  );
  const stocktakingRow = page.locator("#stocktaking-row > div");
  const checkedMark = page.getByTestId("checked");
  await page.goto("/stocktaking");
  await expect(stocktakingRow.nth(0)).toContainText("D-10-下");
  await expect(checkedMark).toBeVisible();
  await expect(stocktakingRow.nth(0)).toHaveCSS(
    "background-color",
    "rgb(221, 255, 221)"
  );
});

test("棚リストに未スキャンアイテムがある場合、未スキャンアイテムの数が表示され、背景が赤色になる。", async ({
  page,
  msw,
}) => {
  msw.use(
    rest.get(
      "http://127.0.0.1:3000/igoue_admin/app_api/stocktakings/current",
      mockStocktakingCurrentUnsccaned
    )
  );
  const stocktakingRow = page.locator("#stocktaking-row > div");
  const checkedMark = page.getByTestId("checked");
  const unscannedMark = page.getByTestId("unscanned");

  await page.goto("/stocktaking");
  await expect(stocktakingRow.nth(0)).toContainText("D-10-下");
  await expect(checkedMark).toBeHidden();
  await expect(unscannedMark).toBeVisible();
  await expect(unscannedMark).toContainText("未20");
  await expect(unscannedMark).toHaveCSS("background-color", "rgb(255, 0, 0)");
  await expect(stocktakingRow.nth(0)).toHaveCSS(
    "background-color",
    "rgb(250, 219, 218)"
  );
});

test("棚リストに不一致アイテムがある場合、不一致アイテムの数が表示され、背景が赤色になる。", async ({
  page,
  msw,
}) => {
  msw.use(
    rest.get(
      "http://127.0.0.1:3000/igoue_admin/app_api/stocktakings/current",
      mockStocktakingCurrentMismatching
    )
  );
  const stocktakingRow = page.locator("#stocktaking-row > div");
  const checkedMark = page.getByTestId("checked");
  const mismatchingMark = page.getByTestId("mismatching");

  await page.goto("/stocktaking");
  await expect(stocktakingRow.nth(0)).toContainText("D-10-下");
  await expect(checkedMark).toBeHidden();
  await expect(mismatchingMark).toBeVisible();
  await expect(mismatchingMark).toContainText("不2");
  await expect(mismatchingMark).toHaveCSS(
    "background-color",
    "rgb(253, 126, 0)"
  );
  await expect(stocktakingRow.nth(0)).toHaveCSS(
    "background-color",
    "rgb(250, 219, 218)"
  );
});

test("棚リストに不一致アイテムと未スキャンアイテム両方がある場合、両方とも表示される", async ({
  page,
  msw,
}) => {
  msw.use(
    rest.get(
      "http://127.0.0.1:3000/igoue_admin/app_api/stocktakings/current",
      mockStocktakingCurrentMismatchingAndUnscanned
    )
  );
  const stocktakingRow = page.locator("#stocktaking-row > div");
  const checkedMark = page.getByTestId("checked");
  const unscannedMark = page.getByTestId("unscanned");
  const mismatchingMark = page.getByTestId("mismatching");

  await page.goto("/stocktaking");
  await expect(stocktakingRow.nth(0)).toContainText("D-10-下");
  await expect(checkedMark).toBeHidden();
  await expect(unscannedMark).toBeVisible();
  await expect(unscannedMark).toContainText("未20");
  await expect(unscannedMark).toHaveCSS("background-color", "rgb(255, 0, 0)");
  await expect(mismatchingMark).toBeVisible();
  await expect(mismatchingMark).toContainText("不2");
  await expect(mismatchingMark).toHaveCSS(
    "background-color",
    "rgb(253, 126, 0)"
  );
  await expect(stocktakingRow.nth(0)).toHaveCSS(
    "background-color",
    "rgb(250, 219, 218)"
  );
});
