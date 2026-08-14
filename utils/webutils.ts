import { Locator, Page } from '@playwright/test';

export class WebUtils {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // =========================================================
  // PAGE / NAVIGATION
  // =========================================================

  getPage(): Page {
    return this.page;
  }

  async navigate(
    url: string,
    waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'load'
  ): Promise<void> {
    await this.page.goto(url, { waitUntil });
  }

  async reload(timeout = 30000): Promise<void> {
    await this.page.reload({ timeout });
  }

  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  async goForward(): Promise<void> {
    await this.page.goForward();
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  getCurrentUrl(): string {
    return this.page.url();
  }

  async waitForLoadState(
    state: 'load' | 'domcontentloaded' | 'networkidle' = 'load',
    timeout = 30000
  ): Promise<void> {
    await this.page.waitForLoadState(state, { timeout });
  }

  async waitForUrl(
    url: string | RegExp,
    timeout = 30000
  ): Promise<void> {
    await this.page.waitForURL(url, { timeout });
  }

  // =========================================================
  // LOCATOR
  // =========================================================

  locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  // =========================================================
  // WAIT METHODS
  // =========================================================

  async waitForSelector(
    selector: string,
    timeout = 30000
  ): Promise<Locator> {
    const element = this.page.locator(selector);

    await element.waitFor({
      state: 'visible',
      timeout,
    });

    return element;
  }

  async waitForVisible(
    locator: Locator,
    timeout = 30000
  ): Promise<void> {
    await locator.waitFor({
      state: 'visible',
      timeout,
    });
  }

  async waitForHidden(
    locator: Locator,
    timeout = 30000
  ): Promise<void> {
    await locator.waitFor({
      state: 'hidden',
      timeout,
    });
  }

  // =========================================================
  // CLICK METHODS
  // =========================================================

  async click(
    locator: Locator,
    options?: {
      timeout?: number;
      force?: boolean;
      clickCount?: number;
      delay?: number;
    }
  ): Promise<void> {
    await locator.click({
      timeout: options?.timeout ?? 30000,
      force: options?.force ?? false,
      clickCount: options?.clickCount ?? 1,
      delay: options?.delay,
    });
  }

  async clickByText(
    text: string,
    exact = false,
    timeout = 30000
  ): Promise<void> {
    await this.page
      .getByText(text, { exact })
      .click({ timeout });
  }

  async doubleClick(
    locator: Locator,
    timeout = 30000
  ): Promise<void> {
    await locator.dblclick({ timeout });
  }

  async rightClick(
    locator: Locator,
    timeout = 30000
  ): Promise<void> {
    await locator.click({
      button: 'right',
      timeout,
    });
  }

  async hover(
    locator: Locator,
    timeout = 30000
  ): Promise<void> {
    await locator.hover({ timeout });
  }

  // =========================================================
  // INPUT METHODS
  // =========================================================

  async fill(
    locator: Locator,
    value: string,
    timeout = 30000
  ): Promise<void> {
    await locator.fill(value, { timeout });
  }

  async type(
    locator: Locator,
    value: string,
    delay = 0,
    timeout = 30000
  ): Promise<void> {
    await locator.pressSequentially(value, {
      delay,
      timeout,
    });
  }

  async clear(
    locator: Locator,
    timeout = 30000
  ): Promise<void> {
    await locator.fill('', { timeout });
  }

  async press(
    locator: Locator,
    key: string,
    timeout = 30000
  ): Promise<void> {
    await locator.press(key, { timeout });
  }

  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  // =========================================================
  // CHECKBOX / RADIO
  // =========================================================

  async check(
    locator: Locator,
    timeout = 30000
  ): Promise<void> {
    await locator.check({ timeout });
  }

  async uncheck(
    locator: Locator,
    timeout = 30000
  ): Promise<void> {
    await locator.uncheck({ timeout });
  }

  // =========================================================
  // DROPDOWN
  // =========================================================

  async selectOption(
    locator: Locator,
    value: string | string[],
    timeout = 30000
  ): Promise<void> {
    await locator.selectOption(value, { timeout });
  }

  // =========================================================
  // GET TEXT / VALUE / ATTRIBUTE
  // =========================================================

  async getText(locator: Locator, ElText: string): Promise<string> {
    return locator.innerText();
  }

  async getTextByLocator(
    locator: Locator,
    timeout = 30000
  ): Promise<string> {
    return locator.innerText({ timeout });
  }

  async getValue(
    locator: Locator,
    timeout = 30000
  ): Promise<string> {
    return locator.inputValue({ timeout });
  }

  async getAttribute(
    locator: Locator,
    attributeName: string,
    timeout = 30000
  ): Promise<string | null> {
    return locator.getAttribute(attributeName, { timeout });
  }

  async getAllText(
    locator: Locator
  ): Promise<string[]> {
    return locator.allInnerTexts();
  }

  async count(
    locator: Locator
  ): Promise<number> {
    return locator.count();
  }

  // =========================================================
  // ELEMENT VALIDATION
  // =========================================================

  async isVisible(
    locator: Locator,
    timeout = 5000
  ): Promise<boolean> {
    try {
      await locator.waitFor({
        state: 'visible',
        timeout,
      });

      return true;
    } catch {
      return false;
    }
  }

  async isHidden(
    locator: Locator,
    timeout = 5000
  ): Promise<boolean> {
    try {
      await locator.waitFor({
        state: 'hidden',
        timeout,
      });

      return true;
    } catch {
      return false;
    }
  }

  async elementExists(
    locator: Locator,
    timeout = 5000
  ): Promise<boolean> {
    try {
      await locator.waitFor({
        state: 'attached',
        timeout,
      });

      return true;
    } catch {
      return false;
    }
  }

  // =========================================================
  // SCROLL / FOCUS
  // =========================================================

  async scrollIntoView(
    locator: Locator,
    timeout = 30000
  ): Promise<void> {
    await locator.scrollIntoViewIfNeeded({ timeout });
  }

  async focus(
    locator: Locator,
    timeout = 30000
  ): Promise<void> {
    await locator.focus({ timeout });
  }

  async blur(locator: Locator): Promise<void> {
    await locator.blur();
  }

  // =========================================================
  // DRAG AND DROP
  // =========================================================

  async dragAndDrop(
    source: Locator,
    target: Locator
  ): Promise<void> {
    await source.dragTo(target);
  }

  // =========================================================
  // JAVASCRIPT
  // =========================================================

  async evaluate(
    expression: string | ((arg: any) => any),
    arg?: any
  ): Promise<any> {
    return this.page.evaluate(expression as any, arg);
  }

  async evaluateHandle(
    expression: string | ((arg: any) => any),
    arg?: any
  ): Promise<any> {
    return this.page.evaluateHandle(expression as any, arg);
  }

  async jsClick(locator: Locator): Promise<void> {
    await locator.evaluate((element) => {
      (element as HTMLElement).click();
    });
  }

  // =========================================================
  // SCREENSHOT
  // =========================================================

  async takeScreenshot(
    path: string,
    fullPage = false
  ): Promise<void> {
    await this.page.screenshot({
      path,
      fullPage,
    });
  }

  // =========================================================
  // FILE UPLOAD
  // =========================================================

  async uploadFile(
    locator: Locator,
    filePath: string,
    timeout = 30000
  ): Promise<void> {
    await locator.setInputFiles(filePath, { timeout });
  }

  // =========================================================
  // DIALOGS / ALERTS
  // =========================================================

  async acceptDialog(): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
  }

  async dismissDialog(): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.dismiss();
    });
  }

  async getAlertText(): Promise<string> {
    const dialog = await this.page.waitForEvent('dialog');

    const message = dialog.message();

    await dialog.dismiss();

    return message;
  }

  // =========================================================
  // COOKIES
  // =========================================================

  async setCookie(
    name: string,
    value: string,
    url: string
  ): Promise<void> {
    await this.page.context().addCookies([
      {
        name,
        value,
        url,
      },
    ]);
  }

  async getCookies() {
    return this.page.context().cookies();
  }

  async clearCookies(): Promise<void> {
    await this.page.context().clearCookies();
  }

  // =========================================================
  // NEW TAB
  // =========================================================

  async openNewTab(url?: string): Promise<Page> {
    const newPage = await this.page.context().newPage();

    if (url) {
      await newPage.goto(url);
    }

    return newPage;
  }

  // =========================================================
  // FRAME
  // =========================================================

  getFrame(selector: string) {
    return this.page.frameLocator(selector);
  }

  // =========================================================
  // CONSOLE LOGS
  // =========================================================

  captureConsoleLogs(): string[] {
    const logs: string[] = [];

    this.page.on('console', (message) => {
      logs.push(message.text());
    });

    return logs;
  }
}

export default WebUtils;