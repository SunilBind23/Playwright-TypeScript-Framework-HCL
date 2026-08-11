import { Locator, Page } from '@playwright/test'
import { WebUtils } from '../utils/webutils'

export class HomePage {
    readonly swaglabLogo: Locator
    readonly products: Locator;
    readonly pageTitle: Locator;
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
    wt: WebUtils;
    readonly page: Page;

    constructor(page: Page, wbt: WebUtils) {
         this.page = page;
        this.wt = wbt;
        this.swaglabLogo = page.locator("//div[@class='app_logo']") ;
        this.products = page.locator('.inventory_item');
        this.pageTitle = page.locator('.title');
        this.productDescription = page.locator('.inventory_item_desc');
        this.productName = page.locator('.inventory_item_name');
        this.productPrice = page.locator('.inventory_item_price');
        this.addToCartButton = page.locator('.btn_inventory');
        this.removeFromCartButton = page.locator('.btn_inventory');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartButton = page.locator('.shopping_cart_link');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.backToProductsButton = page.locator('[data-test="back-to-products"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.searchInput = page.locator('[data-test="search"]');
        this.sortDropdown = page.locator('[data-test="sort"]');
        this.filterButton = page.locator('[data-test="filter"]');
    }

   async swaglabLogoIsVisible(): Promise<boolean> {
        return this.swaglabLogo.isVisible();
    }
    async swaglbabLogoText(): Promise<string> {
        return this.swaglabLogo.innerText();
    }


    async getProductCount(): Promise<number> {
        return await this.products.count();
    }
    async getProductName(index: number): Promise<string> {
        return await this.productName.nth(index).textContent() || '';
    }
    async getProductPrice(index: number): Promise<string> {
        return await this.productPrice.nth(index).textContent() || '';
    }
    async getProductDescription(index: number): Promise<string> {
        return await this.productDescription.nth(index).textContent() || '';
    }
    async clickAddToCartButton(index: number): Promise<void> {
        await this.addToCartButton.nth(index).click();
    }
    async clickRemoveFromCartButton(index: number): Promise<void> {
        await this.removeFromCartButton.nth(index).click();
    }
    async getCartBadgeCount(): Promise<number> {
        const countText = await this.cartBadge.textContent();
        return countText ? parseInt(countText) : 0;
    }
    async clickCartButton(): Promise<void> {
        await this.cartButton.click();
    }
    async clickCheckoutButton(): Promise<void> {
        await this.checkoutButton.click();
    }
    async clickContinueShoppingButton(): Promise<void> {
        await this.continueShoppingButton.click();
    }
    async clickFinishButton(): Promise<void> {
        await this.finishButton.click();
    }
    async clickBackToProductsButton(): Promise<void> {
        await this.backToProductsButton.click();
    }
    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() || '';
    }
    async enterSearchInput(searchTerm: string): Promise<void> {
        await this.wt.fill(this.searchInput, searchTerm);
    }
    async selectSortOption(option: string): Promise<void> {
        await this.sortDropdown.selectOption(option);
    }
    async clickFilterButton(): Promise<void> {
        await this.filterButton.click();
    }
    async getPageTitle(): Promise<string> {
        return await this.pageTitle.textContent() || '';
    }
    async getCurrentUrl(): Promise<string> {
        return await this.wt.getCurrentUrl();
    }

}