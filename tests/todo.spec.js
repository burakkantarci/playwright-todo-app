// @ts-check
const { test, expect } = require("@playwright/test");

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/', {
    waitUntil: 'domcontentloaded'
  });
});

// test('add a todo item', async ({ page }) => {
//   let todoName = TODO_ITEMS[0];

//   // Text input
//   await page.locator('#todo').fill(todoName);
//   await page.locator('#todo').press('Enter');

//   // Make sure the list only has one todo item.
//   await expect(page.locator('.Home_card__2SdtB').first()).toHaveText([
//     todoName
//   ]);
// });

test('complete a todo item', async ({ page }) => {
  // https://github.com/microsoft/playwright/issues/14278#issuecomment-1138347405
  // https://github.com/microsoft/playwright/issues/15371#issuecomment-1175042016
  // https://github.com/microsoft/playwright/issues/10648#issuecomment-1042741050

  setTimeout(() => {
    console.log('init')
  }, 1000);
  const cards = await page.locator('.Home_card__2SdtB');
  setTimeout(() => {
    console.log('select')
  }, 1000);
  const initialCount = await cards.count();
  console.log(initialCount)

  // let todoName = TODO_ITEMS[0];

  // Text input
  // await page.locator('#todo').fill(todoName);
  // await page.locator('#todo').press('Enter');


  // Make sure the list only has one todo item.
  // await expect(page.locator('.Home_card__2SdtB').first()).toHaveText([
  //   todoName
  // ]);

  // await page.click('.Home_card__2SdtB');

  // const finalCount = await page.locator('.Home_card__2SdtB').count()

  // await expect(finalCount).toBe(initialCount);
});

// test('clear all todos', async ({ page }) => {
//   await page.goto('http://localhost:3000/', {
//     waitUntil: 'domcontentloaded'
//   });

//   const clearAll = await page.locator('.clear-cta');
//   await clearAll.click();


//   const cards = await page.locator('.Home_card__2SdtB');
//   const initialCount = await cards.count();
//   console.log(initialCount);
// })
