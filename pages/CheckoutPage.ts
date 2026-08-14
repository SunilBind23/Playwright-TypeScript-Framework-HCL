import { Locator, Page } from "@playwright/test";
import { WebUtils } from "../utils/webutils";

export class CheckoutPage {
    readonly page: Page;
    readonly wt: WebUtils;
    readonly ProductName: Locator;
    readonly ProductPrice: Locator;
    readonly ProductDescription: Locator;
    readonly totalPrice: Locator;
    readonly tax: Locator;
    readonly subtotal: Locator;
    readonly FinishButton: Locator;

    constructor(page: Page, wbt: WebUtils) {
        this.page = page;
        this.wt = wbt;
        this.ProductName = page.locator("//div[@class='inventory_item_name']");
        this.ProductPrice = page.locator("//div[@class='inventory_item_price']");
        this.ProductDescription = page.locator("//div[@class='inventory_item_desc']");
        this.totalPrice = page.locator("//div[@class='summary_total_label']");
        this.tax = page.locator("//div[@class='summary_tax_label']");
        this.subtotal = page.locator("//div[@class='summary_subtotal_label']");
        this.FinishButton = page.locator("//button[contains(text(),'Finish')]");
    }

    async getProductName(): Promise<string> {
        this.wt.getText(this.ProductName, "Product Name");
        return await this.ProductName.innerText();
    }
    async getProductPrice(): Promise<string> {
        this.wt.getText(this.ProductPrice, "Product Price");
        return await this.ProductPrice.innerText();
    }
    async getProductDescription(): Promise<string> {
        this.wt.getText(this.ProductDescription, "Product Description");
        return await this.ProductDescription.innerText();
    }
    async getTotalPrice(): Promise<string> {
        this.wt.getText(this.totalPrice, "Total Price");
        return await this.totalPrice.innerText();
    }
    async getTax(): Promise<string> {
        this.wt.getText(this.tax, "Tax");
        return await this.tax.innerText();
    }
    async getSubtotal(): Promise<string> {
        this.wt.getText(this.subtotal, "Subtotal");
        return await this.subtotal.innerText();
    }
    // Verify product details on the checkout page
    // verify the product details on the overview page
    async verifyProductDetails(expectedName: string, expectedPrice: string, expectedDescription: string): Promise<void> {
        const actualName = await this.getProductName();
        const actualPrice = await this.getProductPrice();
        const actualDescription = await this.getProductDescription();
    }
    async clickFinishButton(): Promise<void> {
        await this.FinishButton.click();
    }
}