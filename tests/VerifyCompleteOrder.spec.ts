import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/login';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { UserInformationPage } from '../pages/UserInformationPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { WebUtils } from '../utils/webutils';
import { ConfirmOrderPage } from '../pages/ConfirmOrderPage';
import { ENV } from '../config/env';
import customerData  from '../testdata/customerData.json';

test('Verify Complete Order @smoke', async ({ page }) => {

    // --------------------------------------------------
    // Setup
    // --------------------------------------------------
    const wbt = new WebUtils(page);

    // --------------------------------------------------
    // Login
    // --------------------------------------------------

    await page.goto(ENV.baseUrl);

    const loginPage = new LoginPage(page, wbt);
    await loginPage.login(ENV.username, ENV.password);

    console.log("Login Success")
    // --------------------------------------------------
    // Home Page
    // --------------------------------------------------
    const homePage = new HomePage(page, wbt);

    // Sort products by price: Low to High
    await homePage.selectSortOption('Price (low to high)');

    // Get product information
    const productNames = await homePage.getProductNames();
    const productPrices = await homePage.getProductPrices();
    const productDescriptions = await homePage.getProductDescriptions();

    console.log('Product Names Count:', productNames.length);
    console.log('Product Prices Count:', productPrices.length);
    console.log('Product Descriptions Count:', productDescriptions.length);

    // Display product information
    console.log('================= Product Information =================');

    for (let i = 0; i < productNames.length; i++) {
        console.log(`Product ${i + 1}`);
        console.log(`Name: ${productNames[i]}`);
        console.log(`Price: ${productPrices[i]}`);
        console.log(`Description: ${productDescriptions[i]}`);
        console.log('--------------------------------');
    }

    // --------------------------------------------------
    // Select Last Product
    // --------------------------------------------------
    const lastIndex = productNames.length - 1;

    const expectedProductName = productNames[lastIndex];
    const expectedProductPrice = productPrices[lastIndex];
    const expectedProductDescription = productDescriptions[lastIndex];

    console.log('================= Selected Product =================');
    console.log(`Selected Product: ${expectedProductName}`);
    console.log(`Selected Price: ${expectedProductPrice}`);

    // Add last product to cart
    await homePage.addToCartButton.last().click();

    // --------------------------------------------------
    // Cart
    // --------------------------------------------------
    await homePage.cartButton.click();

    const cartPage = new CartPage(page, wbt);

    const cartProductNames = await cartPage.getProductNames();
    const cartProductPrices = await cartPage.getProductPrices();

    console.log('================= Cart Product =================');
    console.log(`Cart Product: ${cartProductNames[0]}`);
    console.log(`Cart Price: ${cartProductPrices[0]}`);

    // Verify product name
    expect(cartProductNames).toContain(expectedProductName);

    // Verify product price
    expect(cartProductPrices).toContain(expectedProductPrice);

    // --------------------------------------------------
    // Checkout - User Information
    // --------------------------------------------------
    await cartPage.clickCheckoutButton();

    const userInfo = new UserInformationPage(page, wbt);

    await userInfo.enterFirstName(customerData.customer.firstName);
    await userInfo.enterLastName(customerData.customer.lastName);
    await userInfo.enterPostalCode(customerData.customer.postalCode);

    // Get entered information
    const firstName = await userInfo.getFirstName();
    const lastName = await userInfo.getLastName();
    const postalCode = await userInfo.getPostalCode();

    console.log('================= User Information =================');
    console.log(`First Name: ${firstName}`);
    console.log(`Last Name: ${lastName}`);
    console.log(`Postal Code: ${postalCode}`);

    // Verify user information
    expect(firstName).toBe(customerData.customer.firstName);
    expect(lastName).toBe(customerData.customer.lastName);
    expect(postalCode).toBe(customerData.customer.postalCode);

    await userInfo.clickContinueButton();

    // --------------------------------------------------
    // Checkout Overview
    // --------------------------------------------------
    const checkoutPage = new CheckoutPage(page, wbt);

    const actualProductName = await checkoutPage.getProductName();
    const actualProductPrice = await checkoutPage.getProductPrice();
    const actualProductDescription = await checkoutPage.getProductDescription();

    console.log('================= Checkout Product =================');
    console.log(`Product Name: ${actualProductName}`);
    console.log(`Product Price: ${actualProductPrice}`);
    console.log(`Product Description: ${actualProductDescription}`);

    const actualTotalPrice = await checkoutPage.getTotalPrice();
    const actualTax = await checkoutPage.getTax();
    const actualSubtotal = await checkoutPage.getSubtotal();

    console.log('================= Checkout Summary =================');
    console.log(`Subtotal: ${actualSubtotal}`);
    console.log(`Tax: ${actualTax}`);
    console.log(`Total: ${actualTotalPrice}`);
    const productPrice = parseFloat(actualProductPrice.replace('$', ''));
    const subtotal = parseFloat(actualSubtotal.replace('Item total: $', ''));
    const tax = parseFloat(actualTax.replace('Tax: $', ''));
    const total = parseFloat(actualTotalPrice.replace('Total: $', ''));

    // Verify subtotal
    expect(subtotal).toBeCloseTo(productPrice, 2);

    // Verify total = subtotal + tax
    expect(total).toBeCloseTo(subtotal + tax, 2);

    // Verify checkout product details
    expect(actualProductName).toBe(expectedProductName);
    expect(actualProductPrice).toBe(expectedProductPrice);
    expect(actualProductDescription).toBe(expectedProductDescription);

    // --------------------------------------------------
    // Complete Order
    // --------------------------------------------------
    await checkoutPage.clickFinishButton();

    // Screenshot of order confirmation
    await page.screenshot({ path: 'reports/order_confirmation.png', fullPage: true });

    const confirmOrderPage = new ConfirmOrderPage(page, wbt);
    // verify order confirmation message
    const orderConfirmationMessage = await confirmOrderPage.getOrderConfirmationMessage();
    console.log('================= Order Confirmation =================');
    console.log(`Order Confirmation Message: ${orderConfirmationMessage}`);
    expect(orderConfirmationMessage).toBe('Thank you for your order!');
    await confirmOrderPage.clickBackHomeButton();
    // Navigate to logout 
    await homePage.clickOnNavbar();
    await homePage.clickOnLogout();

});
