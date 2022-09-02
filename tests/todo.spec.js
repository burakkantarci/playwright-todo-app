// @ts-check
const { test, expect } = require("playwright-test-coverage");

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

test.beforeEach(async ({ page }) => {
  await page.goto('/', {
    waitUntil: 'domcontentloaded'
  });

  const clearAll = page.locator('.clear-cta');
  await clearAll.click();

  await page.reload();
  await page.locator('[placeholder="Enter your exciting TODO item\!"]').waitFor()
});

test.afterEach(async ({ page }) => {
  const clearAll = page.locator('.clear-cta');
  await clearAll.click();
});

test('add a todo item', async ({ page }) => {
  let todoName = TODO_ITEMS[0];

  // Text input
  await page.locator('#todo').fill(todoName);
  await page.locator('#todo').press('Enter');

  // Make sure the list only has one todo item.
  await expect(page.locator('.Home_card__2SdtB').first()).toHaveText([
    todoName
  ]);
});

test('complete a todo item', async ({ page }) => {
  // https://github.com/microsoft/playwright/issues/14278#issuecomment-1138347405
  // https://github.com/microsoft/playwright/issues/15371#issuecomment-1175042016
  // https://github.com/microsoft/playwright/issues/10648#issuecomment-1042741050
  const initalCards = page.locator('.Home_card__2SdtB');
  const initialCount = await initalCards.count();
  let todoName = TODO_ITEMS[0];

  // Text input
  await page.locator('#todo').fill(todoName);
  await page.locator('#todo').press('Enter');

  // Make sure the list only has one todo item.
  await expect(page.locator('.Home_card__2SdtB').first()).toHaveText([
    todoName
  ]);

  await page.click('.Home_card__2SdtB');

  await page.reload();
  await page.locator('[placeholder="Enter your exciting TODO item\!"]').waitFor()

  const finalCards = page.locator('.Home_card__2SdtB');
  const finalCount = await finalCards.count();

  expect(finalCount).toBe(initialCount);
});

test('clear one todo', async ({ page }) => {
  const initalCards = page.locator('.Home_card__2SdtB');
  const initialCount = await initalCards.count();
  expect(initialCount).toBe(0);

  let todoName = TODO_ITEMS[0];

  // Text input
  await page.locator('#todo').fill(todoName);
  await page.locator('#todo').press('Enter');

  // Make sure the list only has one todo item.
  await expect(page.locator('.Home_card__2SdtB').first()).toHaveText([
    todoName
  ]);

  const clearAll = page.locator('.clear-cta');
  await clearAll.click();

  await page.reload();
  await page.locator('[placeholder="Enter your exciting TODO item\!"]').waitFor()

  const finalCards = page.locator('.Home_card__2SdtB');
  const finalCount = await finalCards.count();

  expect(finalCount).toBe(0);
})

test('clear two todos', async ({ page }) => {
  const initalCards = page.locator('.Home_card__2SdtB');
  const initialCount = await initalCards.count();
  expect(initialCount).toBe(0);

  let firstTodoName = TODO_ITEMS[0];
  let secondTodoName = TODO_ITEMS[1];

  // Text input
  await page.locator('#todo').fill(firstTodoName);
  await page.locator('#todo').press('Enter');

  // Make sure the list only has one todo item.
  await expect(page.locator('.Home_card__2SdtB').first()).toHaveText([
    firstTodoName
  ]);

  // Text input
  await page.locator('#todo').fill(secondTodoName);
  await page.locator('#todo').press('Enter');

  // Make sure the list only has one todo item.
  await expect(page.locator('.Home_card__2SdtB').first()).toHaveText([
    secondTodoName
  ]);

  const clearAll = page.locator('.clear-cta');
  await clearAll.click();

  await page.reload();
  await page.locator('[placeholder="Enter your exciting TODO item\!"]').waitFor()

  const finalCards = page.locator('.Home_card__2SdtB');
  const finalCount = await finalCards.count();

  expect(finalCount).toBe(0);
})
