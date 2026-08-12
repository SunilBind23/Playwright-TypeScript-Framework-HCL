import { Locator, Page } from "@playwright/test";
import { WebUtils } from "../utils/webutils";

export class CartPage {
    readonly page: Page;
    readonly wt: WebUtils;
    readonly ProductName: Locator;
    readonly ProductPrice: Locator;
    readonly ProductDescription: Locator;
    readonly CheckoutButton: Locator;

    constructor(page: Page, wbt: WebUtils) {
        this.page = page;
        this.wt = wbt;
        this.ProductName = page.locator("//div[@class='inventory_item_name']");
        this.ProductPrice = page.locator("//div[@class='inventory_item_price']");
        this.ProductDescription = page.locator("//div[@class='inventory_item_desc']");
        this.CheckoutButton = page.locator("//button[contains(text(),'Checkout')]");
    }
    async getProductNames(): Promise<string[]> {
        const productNames = await this.ProductName.allTextContents();
        return productNames;
    }
    async getProductPrices(): Promise<string[]> {
        const productPrices = await this.ProductPrice.allTextContents();
        return productPrices;
    }
    async getProductDescriptions(): Promise<string[]> {
        const productDescriptions = await this.ProductDescription.allTextContents();
        return productDescriptions;
    }
    async clickCheckoutButton(): Promise<void> {
        await this.CheckoutButton.click();
    }
}