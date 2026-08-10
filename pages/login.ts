import { Locator, Page } from "@playwright/test";
import { WebUtils } from "../utils/webutils";


export class LoginPage {
    readonly username: Locator;
    readonly password: Locator;
    readonly submit: Locator;
    wt: WebUtils;

    readonly page: Page;

    constructor(page: Page) {

        this.page = page;
        this.wt = new WebUtils(page);
        this.username = page.locator('input[name="username"]');
        this.password = page.locator('input[name="password"]');
        this.submit = page.locator('button[type="submit"]');
    }
    async enterUsername(Username: string) {
        await this.wt.fill(this.username, Username);
    }
    async enterPassword(password: string) {
        await this.wt.fill(this.password, password);
    }
    async clickSubmit() {
        await this.submit.click();
    }
    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickSubmit();
    }

}

