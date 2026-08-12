import { Locator, Page } from "@playwright/test";
import { WebUtils } from "../utils/webutils";

export class UserInformationPage {
    webUtils: WebUtils;
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;

    constructor(page: Page, webUtils: WebUtils) {
        this.page = page;
        this.webUtils = webUtils;
        this.firstNameInput = page.getByPlaceholder("First Name");
        this.lastNameInput = page.getByPlaceholder("Last Name");
        this.postalCodeInput = page.getByPlaceholder("Postal Code");
        this.continueButton = page.getByRole("button", { name: "Continue" });
    }

    async enterUserInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }
    async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }
    async getFirstName(): Promise<string> {
        return this.firstNameInput.inputValue();
    }
    async getLastName(): Promise<string> {
        return this.lastNameInput.inputValue();
    }
    async getPostalCode(): Promise<string> {
        return this.postalCodeInput.inputValue();
    }
    async enterFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
    }
    async enterLastName(lastName: string): Promise<void> {
        await this.lastNameInput.fill(lastName);
    }
    async enterPostalCode(postalCode: string): Promise<void> {
        await this.postalCodeInput.fill(postalCode);
    }
} 