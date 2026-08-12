import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { HomePage } from '../pages/HomePage';
import { WebUtils } from '../utils/webutils';
import { CartPage } from '../pages/CartPage';
import { UserInformationPage } from '../pages/UserInformationPage';

test('Verify Complete Order', async ({ page }) => {

    const wbt = new WebUtils(page);

    // Navigate to application
    await page.goto('https://www.saucedemo.com/');

    // Login
    const loginPage = new LoginPage(page, wbt);
    await loginPage.login('standard_user', 'secret_sauce');

    // Home page
    const homePage = new HomePage(page, wbt);

    await homePage.selectSortOption('Price (low to high)');
    const pnames = await homePage.getProductNames();
    const pprices = await homePage.getProductPrices();
    console.log('Product Names Count:', pnames.length);
    //  console.log('Product Names:', pnames);

    console.log('Product Prices Count:', pprices.length);
    // console.log('Product Prices:', pprices);

    const pdescriptions = await homePage.getProductDescriptions();
    console.log('Product Descriptions Count:', pdescriptions.length);
    //console.log('Product Descriptions:', pdescriptions);

    // Sort products by price: low to high


    // Get product information
    // const pnames: string[] = await homePage.getProductNames();
    // const pprices: string[] = await homePage.getProductPrices();
    //   const pdescriptions: string[] = await homePage.getProductDescriptions();

    // Display product information
    console.log('=================Product Information:==========================');
    for (let i = 0; i < pnames.length; i++) {
        console.log(`Product ${i + 1}:`);
        console.log(`Name: ${pnames[i]}`);
        console.log(`Price: ${pprices[i]}`);
        console.log(`Description: ${pdescriptions[i]}`);
        console.log('================================');
    }

    await homePage.addToCartButton.last().click();


    // Get last product
    const lastIndex = pnames.length - 1;

    const expectedProductName = pnames[lastIndex];
    const expectedProductPrice = pprices[lastIndex];

    console.log('=================Selected Product:==========================');
    console.log(`Selected Product: ${expectedProductName}`);
    console.log(`Selected Price: ${expectedProductPrice}`);

    // Add last product to cart


    // Open cart
    await homePage.cartButton.click();

    // Cart page
    const cartPage = new CartPage(page, wbt);

    const cartProductNames = await cartPage.getProductNames();
    const cartProductPrices = await cartPage.getProductPrices();

    console.log('=================Added Product in Cart:==========================');
    console.log('Cart Product:', cartProductNames[0]);
    console.log('Cart Price:', cartProductPrices[0]);

    // Verify product
    expect(cartProductNames).toContain(expectedProductName);

    // Verify price
    expect(cartProductPrices).toContain(expectedProductPrice);
    // navigate to checkout
    await cartPage.clickCheckoutButton();
    const userInfo: UserInformationPage = new UserInformationPage(page, wbt);
    await userInfo.enterFirstName('John');
    await userInfo.enterLastName('Doe');
    await userInfo.enterPostalCode('12345');


    console.log('=================Entered User Information:==========================');

    console.log('First Name:', await userInfo.getFirstName());
    console.log('Last Name:', await userInfo.getLastName());
    console.log('Postal Code:', await userInfo.getPostalCode());

    await page.pause();

    // verify entered information
    expect(await userInfo.getFirstName()).toBe('John');
    expect(await userInfo.getLastName()).toBe('Doe');
    expect(await userInfo.getPostalCode()).toBe('12345');
    // await userInfo.clickContinueButton();
});