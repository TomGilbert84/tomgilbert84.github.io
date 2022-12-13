import { test, expect } from '@playwright/test';


test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html?');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Form Validator/);

});

  test('Check password match', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/index.html?');
  
    await page.fill('#password', 'mypassword'); 

    await page.fill('#password2', 'differentpassword');

    await page.getByRole('button', { name: 'Submit' }).click();

    await page.getByText('Passwords do not match')
  });


  // // create a locator
  // const getStarted = page.getByRole('link', { name: 'Get started' });

  // // Expect an attribute "to be strictly equal" to the value.
  // await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // // Click the get started link.
  // await getStarted.click();

  // // Expects the URL to contain intro.
  // await expect(page).toHaveURL(/.*intro/);

