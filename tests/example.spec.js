const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('C:/Users/tgilbert/OneDrive%20-%20Scott%20Logic%20Ltd/Documents/FormValidator/index.html');
 
});

test('the one where the webpage has the correct title', async ({ page }) => {

  // Expect title to contain Form Validator.
  await expect(page).toHaveTitle(/Form Validator/);

});

test('the one where the form has the correct header', async ({ page }) => {
  // Get the form header  
  const formTitle = page.locator('#form > h2')
  // Expect header to contain 'Register With Us'
  await expect(formTitle).toHaveText('Register With Us');

});

test('the one where the form has the correct field names', async ({ page }) => {
  // Create an array of the locators for the form fields
  const labelLocators = ['id=userNameLabel', 'id=emailLabel', 'id=passwordLabel', 'id=password2Label'];

  // Create an array of the expected label values
  const expectedValues = ['Username', 'Email', 'Password', 'Confirm Password'];

  // Iterate over the labels and assert their text
  for (let i = 0; i < labelLocators.length; i++) {
    const label = await page.locator(labelLocators[i]);
    await expect(label).toHaveText(expectedValues[i]);
  }

  await page.screenshot({ path: 'screenshot.png' });
});

test('the one where the form has the correct placeholder in the field', async ({ page }) => {

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

test('the one where the empty field validation is correct', async ({ page }) => {
  // Define the expected values and locators
  const expectedValues = [    'Username must be at least 3 characters',    'Email is not valid',    'Password must be at least 6 characters',    'Password2 is required',  ];
  const locators = [    '#form > div:nth-child(2) > small',    '#form > div:nth-child(3) > small',    '#form > div:nth-child(4) > small',    '#form > div:nth-child(5) > small',  ];

  // Click the submit button
  await page.getByRole('button', { name: 'Submit' }).click();

  // Iterate over the locators and assert their text
  for (let i = 0; i < locators.length; i++) {
    const element = await page.locator(locators[i]);
    const text = await element.textContent();
    expect(text).toBe(expectedValues[i]);
  }
});

test('the one where the min field length validation is correct', async ({ page }) => {
  // Define the expected values and locators
  const expectedValues = ['Username must be at least 3 characters', 'Password must be at least 6 characters',];
  const locators = [ '#form > div:nth-child(2) > small', '#form > div:nth-child(4) > small',];

  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('12');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('12345');

  // Click the submit button
  await page.getByRole('button', { name: 'Submit' }).click();

  // Iterate over the locators and assert their text
  for (let i = 0; i < locators.length; i++) {
    const element = await page.locator(locators[i]);
    const text = await element.textContent();
    expect(text).toBe(expectedValues[i]);
  }
});

test('the one where the max field length validation is correct', async ({ page }) => {
  // Define the expected values and locators
  const expectedValues = ['Username must be less than 15 characters', 'Password must be less than 25 characters',];
  const locators = [ '#form > div:nth-child(2) > small', '#form > div:nth-child(4) > small',];

  //test max field lengths
  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('1234567891234567');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('12345678912345678912345678');

  // Click the submit button
  await page.getByRole('button', { name: 'Submit' }).click();

// Iterate over the locators and assert their text
  for (let i = 0; i < locators.length; i++) {
    const element = await page.locator(locators[i]);
    const text = await element.textContent();
    expect(text).toBe(expectedValues[i]);
  }
});

test('the one where the password match validation is correct', async ({ page }) => {
  const passwordInput = page.getByRole('textbox', { name: 'Enter password' });
  const confirmPasswordInput = page.getByPlaceholder('Enter password again');
  const submitButton = page.getByRole('button', { name: 'Submit' });
  const passwordMatchError = page.locator('#form > div:nth-child(5) > small');

  // Enter different passwords in the password and confirm password fields
  await passwordInput.click();
  await passwordInput.fill('password');
  await confirmPasswordInput.click();
  await confirmPasswordInput.fill('differentPassword');
  // Submit the form
  await submitButton.click();

  // Expect the password match error to contain 'Passwords do not match'
  await expect(passwordMatchError).toHaveText('Passwords do not match');
});

test('the one where no validation errors occur', async ({ page }) => {

  await page.getByPlaceholder('Enter username').click();
  await page.getByPlaceholder('Enter username').fill('TestUser');
  await page.getByPlaceholder('Enter email').click();
  await page.getByPlaceholder('Enter email').fill('test@test.com');
  await page.getByRole('textbox', { name: 'Enter password' }).fill('Password123');
  await page.getByPlaceholder('Enter password again').fill('Password123');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.screenshot({ path: 'screenshot.png' });

  const locators = [    '#form > div:nth-child(2) > small',    '#form > div:nth-child(3) > small',    '#form > div:nth-child(4) > small',    '#form > div:nth-child(5) > small',  '#form > div:nth-child(6) > small'];
  for (let i = 0; i < locators.length; i++) {
    const element = page.locator(locators[i]);
    await expect(element).toBeHidden();
  }
});
