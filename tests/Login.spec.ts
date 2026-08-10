import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import loginData from '../testdata/loginData.json';

for (const user of loginData) {

  test(`Login Test - ${user.username}`, async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    const lp = new LoginPage(page);

    await lp.enterUsername(user.username);

    await lp.enterPassword(user.password);

    await lp.clickSubmit();

    await expect(page).toHaveURL(
      'https://www.saucedemo.com/inventory.html'
    );

  });

}