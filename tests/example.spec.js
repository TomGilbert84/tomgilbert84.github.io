const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('C:/Users/tgilbert/OneDrive%20-%20Scott%20Logic%20Ltd/Documents/FormValidator/index.html');
 
});

test('webpage has correct title', async ({ page }) => {

  // Expect title to contain Form Validator.
  await expect(page).toHaveTitle(/Form Validator/);

});

test('form has correct header', async ({ page }) => {
  // Get the form header  
  const formTitle = page.locator('#form > h2')
  // Expect header to contain 'Register With Us'
  await expect(formTitle).toHaveText('Register With Us');

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

    await page.screenshot({ path: 'screenshot.png' });
});

test('form has correct placeholder in field', async ({ page }) => {

  // Create an array of the locators for the form fields
  const fieldLocators = ['id=username', 'id=email', 'id=password', 'id=password2'];

 // Create an array of the expected label values
 const expectedValues = ['Enter username', 'Enter email', 'Enter password', 'Enter password again'];

 // Iterate over the locators and assert the placeholder text for each field
 for (let i = 0; i < fieldLocators.length; i++) {
  const field = await page.locator(fieldLocators[i]);
  const placeholder = await field.getAttribute('placeholder');
  await expect(placeholder).toContain(expectedValues[i]);
}

   await page.screenshot({ path: 'screenshot.png' });
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

