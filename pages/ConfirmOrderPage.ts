import { Locator, Page } from "@playwright/test";
import { WebUtils } from "../utils/webutils";

export class ConfirmOrderPage {
    readonly page: Page;
    readonly wt: WebUtils;
    readonly OrderConfirmationMessage: Locator;
    readonly BackHomeButton: Locator;

    constructor(page: Page, wbt: WebUtils) {
        this.page = page;
        this.wt = wbt;
        this.OrderConfirmationMessage = page.locator("//h2[text()='Thank you for your order!']");
        this.BackHomeButton = page.locator("//button[contains(text(),'Back Home')]");
    }
    async getOrderConfirmationMessage(): Promise<string> {
        const orderConfirmationMessage = await this.OrderConfirmationMessage.textContent();
        return orderConfirmationMessage ? orderConfirmationMessage.trim() : '';
    }
    async clickBackHomeButton(): Promise<void> {
        await this.BackHomeButton.click();
    }
}