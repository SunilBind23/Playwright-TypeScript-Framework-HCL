import { Locator, Page } from '@playwright/test'
import { WebUtils } from '../utils/webutils'

export class HomePage {
    readonly swaglabLogo: Locator
    // readonly products: Locator;
    // readonly pageTitle: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly productDescription: Locator;
    readonly addToCartButton: Locator;
    readonly removeFromCartButton: Locator;
    readonly cartBadge: Locator;
    readonly cartButton: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly finishButton: Locator;
    readonly backToProductsButton: Locator;
    readonly errorMessage: Locator;
    readonly searchInput: Locator;
    readonly sortDropdown: Locator;
    readonly filterButton: Locator
    readonly navbar: Locator;
    readonly logOut: Locator;
    wt: WebUtils;
    readonly page: Page;

    constructor(page: Page, wbt: WebUtils) {
        this.page = page;
        this.wt = wbt;
        this.swaglabLogo = page.locator("//div[@class='app_logo']");
        //   this.products = page.locator('.inventory_item');
        // this.pageTitle = page.locator('.title');

        this.productDescription = page.locator("//div[@class='inventory_item_desc']");

        this.productName = page.locator("//div[@class='inventory_item_name ']");

        this.productPrice = page.locator("//div[@class='inventory_item_price']");

        this.addToCartButton = page.locator("//button[contains(text(),'Add to cart')]");

        this.removeFromCartButton = page.locator("//button[contains(text(),'Remove')]");

        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartButton = page.locator('.shopping_cart_link');

        this.checkoutButton = page.locator("//button[contains(text(),'Checkout')]");
        this.continueShoppingButton = page.locator("//button[contains(text(),'Continue Shopping')]");
        this.finishButton = page.locator("//button[contains(text(),'Finish')]");
        this.backToProductsButton = page.locator("//button[contains(text(),'Back to products')]");
        this.errorMessage = page.locator('.error-message-container');
        this.searchInput = page.locator('#search_input');
        this.sortDropdown = page.locator('.product_sort_container');
        this.filterButton = page.locator('#filter_button');
        this.navbar = page.locator("//button[@id='react-burger-menu-btn']");
        this.logOut = page.locator("//a[text()='Logout']")
    }

    async swaglabLogoIsVisible(): Promise<boolean> {
        return this.swaglabLogo.isVisible();
    }
    async swaglbabLogoText(): Promise<string> {
        return this.swaglabLogo.innerText();
    }

    // apply filter and sort options
    async selectSortOption(option: string): Promise<void> {
        await this.sortDropdown.selectOption({ label: option });
    }
    // extract all product names
    async getProductNames(): Promise<string[]> {
        return await this.productName.allTextContents();
    }

    async getProductPrices(): Promise<string[]> {
        return await this.productPrice.allTextContents();
    }

    async getProductDescriptions(): Promise<string[]> {
        return await this.productDescription.allTextContents();
    }
    async clickOnNavbar() {
        await this.navbar.click();
    }
    async clickOnLogout() {
        await this.logOut.click();
    }

}