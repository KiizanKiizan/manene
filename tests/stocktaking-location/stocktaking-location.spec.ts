import { expect, rest } from "next/experimental/testmode/playwright/msw";
import { baseUrl } from "../../app/model/Base-url";
import {
  stocktakingCurrentList,
  stocktakingCurrentListToChecked,
} from "../../mocks/api/stocktaking";
import { stocktakingAllItems } from "../../mocks/api/stocktaking-location";
import { test } from "../testUtil";

test("特定の棚を選択すると棚に存在するアイテム一覧が取得でき、棚番号とアイテムの数が正しく表示される。", async ({
  page,
  msw,
}) => {
  msw.use(rest.get(baseUrl("stocktakings/current"), stocktakingCurrentList));
  msw.use(
    rest.get(baseUrl("stocktaking_locations/19523"), stocktakingAllItems)
  );

  const stocktakingRow = page.locator("id=stocktaking-row");
  const subHeader = page.getByTestId("sub-header");
  const itemMiniCards = page.locator("id=item-mini-card");
  const tab = page.getByRole("tab");

  await page.goto("/stocktaking");
  await stocktakingRow.nth(0).click();
  await expect(page).toHaveURL("/stocktaking/19523");
  await expect(subHeader).toHaveText("棚番: 10171 D-10-下");
  await expect(tab).toHaveText("棚4");
  await expect(itemMiniCards.nth(0)).toBeVisible();
  await expect(itemMiniCards.nth(1)).toBeVisible();
  await expect(itemMiniCards.nth(2)).toBeVisible();
  await expect(itemMiniCards.nth(3)).toBeVisible();
});

test("チェック完了を押すとチェックが完了する", async ({ page, msw }) => {
  const BGCOLOR = "rgb(221, 255, 221)";
  msw.use(rest.get(baseUrl("stocktakings/current"), stocktakingCurrentList));

  msw.use(
    rest.get(baseUrl("stocktaking_locations/19523"), stocktakingAllItems)
  );
  const stocktakingRow = page.locator("id=stocktaking-row");
  const checkedMark = page.getByTestId("checked");
  // const checkButton = page.getByRole("button").nth(1);

  await page.goto("/stocktaking");
  await expect(stocktakingRow.nth(0)).toContainText("D-10-下");

  await stocktakingRow.nth(0).click();

  await expect(page).toHaveURL("/stocktaking/19523");

  await page.getByRole("button").nth(1).click();
  await expect(page.getByTestId("disabled-back-button")).toBeVisible();

  msw.use(
    rest.get(baseUrl("stocktakings/current"), stocktakingCurrentListToChecked)
  );
  await expect(page).toHaveURL("/");

  await expect(stocktakingRow.nth(0)).toContainText("D-10-下");
  await expect(checkedMark).toBeVisible();
  await expect(stocktakingRow.nth(0)).toHaveCSS("background-color", BGCOLOR);
});

test("アイテムスキャンして、それが棚のアイテムと一致したら一致リストに追加され、残りのアイテムが未スキャンリストに追加される。", async ({
  page,
  msw,
}) => {
  msw.use(rest.get(baseUrl("stocktakings/current"), stocktakingCurrentList));
  msw.use(
    rest.get(baseUrl("stocktaking_locations/19523"), stocktakingAllItems)
  );

  const stocktakingRow = page.locator("id=stocktaking-row");
  const itemScanButton = page.getByRole("button", {
    name: "アイテムスキャン",
  });
  const openBarcodeInputButton = page.getByRole("button").nth(1);
  const barcodeInput = page.getByRole("spinbutton");
  const barcodeInputCompleteButton = page.getByRole("button", {
    name: "OK",
  });

  await page.goto("/stocktaking");
  await stocktakingRow.nth(0).click();
  await expect(page).toHaveURL("/stocktaking/19523");
  await itemScanButton.click();
  await openBarcodeInputButton.click();
  await barcodeInput.type("470442");
  await barcodeInputCompleteButton.click();
});

test("棚のアイテム以外をスキャンすると、不一致リストに追加される。", async ({
  page,
  msw,
}) => {});
test("未スキャンアイテムを行方不明登録することができる。", async ({
  page,
  msw,
}) => {});
test("不一致アイテムをこの棚に戻すことができる。", async ({ page, msw }) => {});
test("不一致アイテムを別の棚に戻すことができる。", async ({ page, msw }) => {});
