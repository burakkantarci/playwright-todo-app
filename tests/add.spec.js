// @ts-check
const { test, expect } = require('@playwright/test');

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});

test('add a todo item', async ({ page }) => {

  var todoName = TODO_ITEMS[0];

  // Text input
  await page.locator('#todo').fill(todoName);
  await page.locator('#todo').press('Enter');

  // Make sure the list only has one todo item.
  await expect(page.locator('.Home_card__2SdtB')).toHaveText([
    todoName
  ]);

});

test('complete a todo item', async ({ page }) => {

  var todoName = TODO_ITEMS[0];

  // Text input
  await page.click(`.Home_card__2SdtB:has-text("buy some cheese")`);
  
  // Make sure the list only has one todo item.
  await expect(page.locator('.Home_card__2SdtB')).not.toHaveText([todoName]);
});
