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


// test('checkLength function works as expected', async () => {
//   const input = { value: 'test' };

//   checkLength(input, 3, 10);

//   expect(input.className).toEqual('success');
// });

// test('checkLength function shows error for too short input', async () => {
//   const input = { value: 'te' };

//   checkLength(input, 3, 10);

//   expect(input.className).toEqual('error');
//   expect(input.nextSibling.textContent).toEqual('must be at least 3 characters');
// });

// test('checkLength function shows error for too long input', async () => {
//   const input = { value: 'this_input_is_too_long' };

//   checkLength(input, 3, 10);

//   expect(input.className).toEqual('error');
//   expect(input.nextSibling.textContent).toEqual('must be less than 10 characters');
// });


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

