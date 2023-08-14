import { expect, test } from "@playwright/test";

const TEST_ITEM_ID = "497288";
const TEST_ITEM_SIZE = "L";
const TEST_ITEM_CATEGORY = `柄カットソー`;

test.beforeEach(async ({ page }) => {
  await page.goto("/item_location");
});

test("「アイテムスキャン」と「棚移動」のボタンが表示される", async ({
  page,
}) => {
  const itemScanButton = page.getByRole("button").nth(1);
  const locationMoveButton = page.getByRole("button").nth(2);

  await expect(itemScanButton).toHaveText("アイテムスキャン");
  await expect(locationMoveButton).toHaveText("棚移動");
});

test("アイテムを未スキャン状態だと、「棚移動」ボタンがdisabledになっている", async ({
  page,
}) => {
  const locationMoveButton = page
    .getByRole("button", { name: "棚移動" })
    .nth(1);

  await expect(locationMoveButton).toBeDisabled();
});

test("アイテムをスキャンするとそのアイテムのカードが表示され、アイテムを追加するとリストに追加される。", async ({
  page,
}) => {
  const TEST_ITEM_ID_SECOND = "497220";
  const TEST_ITEM_SIZE_SECOND = "M";
  const TEST_ITEM_CATEGORY_SECOND = `無地Tシャツ`;

  const itemScanButton = page.getByRole("button", {
    name: "アイテムスキャン",
  });
  const openBarcodeInputButton = page.getByRole("button").nth(1);
  const barcodeInput = page.getByRole("spinbutton");
  const barcodeInputCompleteButton = page.getByRole("button", {
    name: "OK",
  });
  const itemMiniCardFirst = page.locator(
    "body > section > div.MuiBox-root.css-ncs2ti > div:nth-child(1) > div > div > p"
  );
  const itemMiniCardSecond = page.locator(
    "body > section > div.MuiBox-root.css-ncs2ti > div:nth-child(2) > div > div > p"
  );

  await itemScanButton.click();
  await openBarcodeInputButton.click();
  await barcodeInput.type(TEST_ITEM_ID);
  await barcodeInputCompleteButton.click();

  await expect(itemMiniCardFirst.nth(0)).toHaveText(TEST_ITEM_ID);
  await expect(itemMiniCardFirst.nth(1)).toHaveText(`サイズ:${TEST_ITEM_SIZE}`);
  await expect(itemMiniCardFirst.nth(2)).toHaveText(
    `小カテ:${TEST_ITEM_CATEGORY}`
  );

  await barcodeInput.type(TEST_ITEM_ID_SECOND);
  await barcodeInputCompleteButton.click();

  await expect(itemMiniCardSecond.nth(0)).toHaveText(TEST_ITEM_ID_SECOND);
  await expect(itemMiniCardSecond.nth(1)).toHaveText(
    `サイズ:${TEST_ITEM_SIZE_SECOND}`
  );
  await expect(itemMiniCardSecond.nth(2)).toHaveText(
    `小カテ:${TEST_ITEM_CATEGORY_SECOND}`
  );
});

test("同じアイテムを追加すると「このアイテムは既に読み取り済みです」とアラートダイアルグが表示され、アイテムリストに追加されない", async ({
  page,
}) => {
  const ERROR_MESSAGE = "このアイテムは既に読み取り済みです";

  const itemScanButton = page.getByRole("button", {
    name: "アイテムスキャン",
  });
  const openBarcodeInputButton = page.getByRole("button").nth(1);
  const barcodeInput = page.getByRole("spinbutton");
  const barcodeInputCompleteButton = page.getByRole("button", {
    name: "OK",
  });
  const itemMiniCardFirst = page.locator(
    "body > section > div.MuiBox-root.css-ncs2ti > div:nth-child(1) > div > div > p"
  );
  const itemMiniCard_second = page.locator(
    "body > section > div.MuiBox-root.css-ncs2ti > div:nth-child(2)"
  );

  await itemScanButton.click();
  await openBarcodeInputButton.click();
  await barcodeInput.type(TEST_ITEM_ID);
  await barcodeInputCompleteButton.click();
  await expect(itemMiniCardFirst.nth(0)).toHaveText(TEST_ITEM_ID);
  await expect(itemMiniCardFirst.nth(1)).toHaveText(`サイズ:${TEST_ITEM_SIZE}`);
  await expect(itemMiniCardFirst.nth(2)).toHaveText(
    `小カテ:${TEST_ITEM_CATEGORY}`
  );

  await barcodeInput.type(TEST_ITEM_ID);
  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain(ERROR_MESSAGE);
    await dialog.accept();
  });
  await barcodeInputCompleteButton.click();

  await expect(await itemMiniCard_second.count()).toEqual(0);
});

test("追加したアイテムを棚移動するとアイテムがその棚に登録され、アイテムリストが空になる", async ({
  page,
}) => {
  const VALID_LOCATION_ID = "10001";

  const itemScanButton = page.getByRole("button", {
    name: "アイテムスキャン",
  });
  const openBarcodeInputButton = page.getByRole("button").nth(1);
  const barcodeInput = page.getByRole("spinbutton");
  const barcodeInputCompleteButton = page.getByRole("button", {
    name: "OK",
  });
  const itemIdInMiniCard = await page.getByText(TEST_ITEM_ID);
  const barcodeInputCancelButton = page.getByRole("button", {
    name: "キャンセル",
  });
  const locationMoveButton = page
    .getByRole("button", { name: "棚移動" })
    .nth(1);
  const itemMiniCardCount = await page.getByText(TEST_ITEM_ID).count();

  await itemScanButton.click();
  await openBarcodeInputButton.click();
  await barcodeInput.type(TEST_ITEM_ID);
  await barcodeInputCompleteButton.click();

  await expect(itemIdInMiniCard).toBeVisible();

  await barcodeInputCancelButton.click();
  await page.goBack();
  await locationMoveButton.click();
  await openBarcodeInputButton.click();
  await barcodeInput.type(VALID_LOCATION_ID);
  await barcodeInputCompleteButton.click();
  await page.getByRole("button", { name: "OK" }).click(); //確認ダイアログのOKボタン
  await expect(itemMiniCardCount).toEqual(0);
});

test("棚移動に失敗すると、「登録に失敗しました」というアラートダイアログが表示される", async ({
  page,
}) => {
  const INVALID_LOCATION_ID = "999999999";
  const ERROR_MESSAGE = "登録に失敗しました";

  const itemScanButton = page.getByRole("button", {
    name: "アイテムスキャン",
  });
  const openBarcodeInputButton = page.getByRole("button").nth(1);
  const barcodeInput = page.getByRole("spinbutton");
  const barcodeInputCompleteButton = page.getByRole("button", {
    name: "OK",
  });
  const itemIdInMiniCard = await page.getByText(TEST_ITEM_ID);
  const barcodeInputCancelButton = page.getByRole("button", {
    name: "キャンセル",
  });
  const locationMoveButton = page.getByRole("button").nth(2);

  await itemScanButton.click();
  await openBarcodeInputButton.click();
  await barcodeInput.type(TEST_ITEM_ID);
  await barcodeInputCompleteButton.click();

  await expect(itemIdInMiniCard).toBeVisible();

  await barcodeInputCancelButton.click();
  await page.goBack();
  await locationMoveButton.click();
  await openBarcodeInputButton.click();
  await barcodeInput.type(INVALID_LOCATION_ID);
  await page.getByRole("button", { name: "OK" }).click();
  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain(ERROR_MESSAGE);
    await dialog.accept();
  });
  await barcodeInputCompleteButton.click();
  await expect(itemIdInMiniCard).toBeVisible();
});

test("アイテムを選択するとアイテム詳細カードが表示される", async ({ page }) => {
  const itemScanButton = page.getByRole("button", {
    name: "アイテムスキャン",
  });
  const openBarcodeInputButton = page.getByRole("button").nth(1);
  const barcodeInput = page.getByRole("spinbutton");
  const barcodeInputCompleteButton = page.getByRole("button", {
    name: "OK",
  });
  const barcodeInputCancelButton = page.getByRole("button", {
    name: "キャンセル",
  });
  const itemMiniCard = page
    .locator("div")
    .filter({ hasText: "497288サイズ:L小カテ:柄カットソー棚:C-12-上" })
    .nth(2);

  const itemDetailCard = page
    .locator("div")
    .filter({
      hasText:
        "肩身幅袖565967着丈股上7272サイズLアイテムID497288ランク・使用回数S・0棚C-12-上アイテムコードL-pcts-unsw-230807-01",
    })
    .nth(3);

  const itemSizeCell = page.getByRole("cell", { name: "L", exact: true });
  const itemIdCell = page.getByRole("cell", { name: "497288" });
  const itemCategoryCell = page.getByRole("cell", { name: "柄カットソー" });

  await itemScanButton.click();
  await openBarcodeInputButton.click();
  await barcodeInput.type(TEST_ITEM_ID);
  await barcodeInputCompleteButton.click();
  await barcodeInputCancelButton.click();
  await page.goBack();
  await itemMiniCard.click();

  await expect(itemDetailCard).toBeVisible();
  await expect(itemSizeCell).toHaveText(TEST_ITEM_SIZE);
  await expect(itemIdCell).toHaveText(TEST_ITEM_ID);
  await expect(itemCategoryCell).toHaveText(TEST_ITEM_CATEGORY);
});
