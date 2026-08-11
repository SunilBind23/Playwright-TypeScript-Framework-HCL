import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import loginData from '../testdata/loginData.json';
import WebUtils from '../utils/webutils.ts';
import { HomePage } from '../pages/HomePage.ts';

for (const user of loginData) {

  test(`Login Test - ${user.username}`, async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    const wt = new WebUtils(page);

    const lp = new LoginPage(page, wt);

    await lp.enterUsername(user.username);
    await lp.enterPassword(user.password);
    await lp.clickSubmit();

    if (user.expectedResult === 'success') {

      await expect(page).toHaveURL(
        'https://www.saucedemo.com/inventory.html'
      );

      // Home Page
      const hp = new HomePage(page, wt);

      const isVisible = await hp.swaglabLogoIsVisible();

      if (isVisible) {
        const logoText = await hp.swaglbabLogoText();
        console.log(`Swaglab Logo Text: ${logoText}`);
      } else {
        console.log('Swaglab Logo is not visible on the page.');
      }

    } else {

      await expect(page.locator('[data-test="error"]')).toBeVisible();
    }
  });
}