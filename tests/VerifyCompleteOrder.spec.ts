import { test } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { HomePage } from '../pages/HomePage';
import { WebUtils } from '../utils/webutils';

test('Verify Complete Order', async ({ page }) => {
    let wbt = new WebUtils(page);
    await page.goto('https://www.saucedemo.com/');
    const loginPage = new LoginPage(page, wbt);
    await loginPage.login('standard_user', 'secret_sauce');

    const homePage = new HomePage(page, wbt);
    // apply filter and sort options
    await homePage.selectSortOption('Price (low to high)');
    // get product names after sorting
    // homePage.getProductNames().then((productNames) => {
    //     console.log('Product Names after sorting:');
    //     productNames.forEach((name) => console.log(name));
    // });



    // let pname: string[] = await homePage.getProductNames();
    // for (let i = 0; i < pname.length; i++) {
    //     console.log(`Product Name ${i + 1}: ${pname[i]}`);
    // }

    // // get product prices after sorting
    // let pprices: string[] = await homePage.getProductPrices();
    // console.log('Product Prices after sorting:');
    // pprices.forEach((price) => console.log(price));

    // // get product descriptions after sorting
    // let pdescriptions: string[] = await homePage.getProductDescriptions();
    // console.log('Product Descriptions after sorting:');
    // pdescriptions.forEach((description) => console.log(description));


    // Get product information
    const pnames: string[] = await homePage.getProductNames();
    const pprices: string[] = await homePage.getProductPrices();
    const pdescriptions: string[] = await homePage.getProductDescriptions();

    // Display product information
    for (let i = 0; i < pnames.length; i++) {
        console.log(`Product ${i + 1}:`);
        console.log(`Name: ${pnames[i]}`);
        console.log(`Price: ${pprices[i]}`);
        console.log(`Description: ${pdescriptions[i]}`);
        console.log('================================');
    }

    // Get last product details
    const lastIndex = pnames.length - 1;
    const selectedProduct = {
        name: pnames[lastIndex],
        price: pprices[lastIndex],
        description: pdescriptions[lastIndex]
    };
    console.log('Selected Product:');
    console.log(selectedProduct);
    // Add last product to cart
    await homePage.addToCartButton.last().click();
    // Open cart
    await homePage.cartButton.click();


    // verify product details in cart
    const cartProductName = await homePage.getProductNameByIndex(1);
    const cartProductPrice = await homePage.getProductPrices().then(prices => prices[1]);
    const cartProductDescription = await homePage.getProductDescriptions().then(descriptions => descriptions[1]);

    console.log('Product Details in Cart:');
    console.log(`Name: ${cartProductName}`);
    console.log(`Price: ${cartProductPrice}`);
    console.log(`Description: ${cartProductDescription}`);


    await page.pause();
    // await homePage.checkoutButton.click();

});