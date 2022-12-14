const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/index.html?');
});

test('form has correct title', async ({ page }) => {

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Form Validator/);

});

test('form has correct field names', async ({ page }) => {
   // Get the username label
  const username = page.locator('id=userNameLabel')
  const email = page.locator('id=emailLabel')
  const password = page.locator('id=passwordLabel')
  const password2 = page.locator('id=password2Label')

  const labels = [username, email, password, password2];

  // Create an array of the expected label values
  const expectedValues = ['Username', 'Email', 'Password', 'Confirm Password'];

  // Iterate over the labels and assert their text
  for (let i = 0; i < labels.length; i++) {
    await expect(labels[i]).toHaveText(expectedValues[i]);
  }
});



  // test('Check password match', async ({ page }) => {
  //   await page.goto('http://127.0.0.1:5500/index.html?');
  
  //   await page.fill('#password', 'mypassword'); 

  //   await page.fill('#password2', 'differentPassword');

  //   await page.getByRole('button', { name: 'Submit' }).click();
    
  //   const passwordMatchError = page.getByText('Passwords do not match');

  //   await expect(page).toHaveProperty(passwordMatchError);

  //   await page.screenshot({ path: 'screenshot.png' });
  // });


  // // create a locator
  // const getStarted = page.getByRole('link', { name: 'Get started' });

  // // Expect an attribute "to be strictly equal" to the value.
  // await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // // Click the get started link.
  // await getStarted.click();

  // // Expects the URL to contain intro.
  // await expect(page).toHaveURL(/.*intro/);

