type Locator = any;
type Page = any;

type ElementHandle = any;

type WaitForOptions = {
  timeout?: number;
  state?: 'attached' | 'detached' | 'visible' | 'hidden';
};

export class WebUtils {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getPage(): Page {
    return this.page;
  }

  async navigate(url: string, waitUntil: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
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
    return await this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load', timeout = 30000): Promise<void> {
    await this.page.waitForLoadState(state, { timeout });
  }

  locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  async waitForSelector(selector: string, options: WaitForOptions = {}): Promise<Locator> {
    const timeout = options.timeout ?? 30000;
    const state = options.state ?? 'visible';
    const element = this.page.locator(selector);
    await element.waitFor({ state, timeout });
    return element;
  }

  async waitForVisible(selector: string, timeout = 30000): Promise<Locator> {
    const element = this.page.locator(selector);
    await element.waitFor({ state: 'visible', timeout });
    return element;
  }

  async waitForHidden(selector: string, timeout = 30000): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'hidden', timeout });
  }

  async click(selector: string, options?: { timeout?: number; force?: boolean; clickCount?: number; delay?: number; }): Promise<void> {
    const element = this.page.locator(selector);
    await element.click({
      timeout: options?.timeout ?? 30000,
      force: options?.force ?? false,
      clickCount: options?.clickCount,
      delay: options?.delay,
    });
  }

  async clickByText(text: string, selector = 'text', options?: { timeout?: number; exact?: boolean; force?: boolean }): Promise<void> {
    const locator = selector === 'text' ? this.page.getByText(text, { exact: options?.exact ?? false }) : this.page.locator(selector).getByText(text, { exact: options?.exact ?? false });
    await locator.click({ timeout: options?.timeout ?? 30000, force: options?.force ?? false });
  }

  async doubleClick(selector: string, timeout = 30000): Promise<void> {
    await this.page.locator(selector).dblclick({ timeout });
  }

  async rightClick(selector: Locator): Promise<void> {
    await this.page.locator(selector).click({ button: 'right'});
  }

  async hover(selector: Locator): Promise<void> {
    await this.page.locator(selector).hover({});
  }

  async fill(selector: Locator, value: string): Promise<void> {
    await this.page.locator(selector).fill(value);
  }

  async type(selector: Locator, value: string, delay = 0, timeout = 30000): Promise<void> {
    await this.page.locator(selector).type(value, { delay, timeout });
  }

  async clear(selector: Locator, timeout = 30000): Promise<void> {
    const element = this.page.locator(selector);
    await element.fill('', { timeout });
  }

  async selectOption(selector: string, value: string | string[], timeout = 30000): Promise<void> {
    await this.page.locator(selector).selectOption(value, { timeout });
  }

  async check(selector: string, timeout = 30000): Promise<void> {
    await this.page.locator(selector).check({ timeout });
  }

  async uncheck(selector: string, timeout = 30000): Promise<void> {
    await this.page.locator(selector).uncheck({ timeout });
  }

  async press(selector: string, key: string, timeout = 30000): Promise<void> {
    await this.page.locator(selector).press(key, { timeout });
  }

  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  async getText(selector: string, timeout = 30000): Promise<string> {
    return await this.page.locator(selector).innerText({ timeout });
  }

  async getTextByLocator(locator: Locator): Promise<string> {
    return await locator.innerText();
  }

  async getValue(selector: string, timeout = 30000): Promise<string> {
    return await this.page.locator(selector).inputValue({ timeout });
  }

  async getAttribute(selector: string, attributeName: string, timeout = 30000): Promise<string | null> {
    return await this.page.locator(selector).getAttribute(attributeName, { timeout });
  }

  async isVisible(selector: string, timeout = 30000): Promise<boolean> {
    try {
      await this.waitForVisible(selector, timeout);
      return true;
    } catch {
      return false;
    }
  }

  async isHidden(selector: string, timeout = 30000): Promise<boolean> {
    try {
      await this.page.locator(selector).waitFor({ state: 'hidden', timeout });
      return true;
    } catch {
      return false;
    }
  }

  async elementExists(selector: string, timeout = 10000): Promise<boolean> {
    try {
      await this.page.locator(selector).waitFor({ state: 'attached', timeout });
      return true;
    } catch {
      return false;
    }
  }

  async count(selector: string): Promise<number> {
    return await this.page.locator(selector).count();
  }

  async getAllText(selector: string): Promise<string[]> {
    return await this.page.locator(selector).allInnerTexts();
  }

  async waitForUrl(url: string | RegExp, timeout = 30000): Promise<void> {
    await this.page.waitForURL(url, { timeout });
  }

  async waitForTimeout(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  async scrollIntoView(selector: string, timeout = 30000): Promise<void> {
    await this.page.locator(selector).scrollIntoViewIfNeeded({ timeout });
  }

  async focus(selector: string, timeout = 30000): Promise<void> {
    await this.page.locator(selector).focus({ timeout });
  }

  async blur(selector: string): Promise<void> {
    await this.page.locator(selector).blur();
  }

  async dragAndDrop(sourceSelector: string, targetSelector: string): Promise<void> {
    await this.page.locator(sourceSelector).dragTo(this.page.locator(targetSelector));
  }

  async evaluate(expression: string | Function, arg?: any): Promise<any> {
    return await this.page.evaluate(expression as any, arg);
  }

  async evaluateHandle(expression: string | Function, arg?: any): Promise<ElementHandle> {
    return await this.page.evaluateHandle(expression as any, arg);
  }

  async takeScreenshot(path: string, fullPage = false): Promise<void> {
    await this.page.screenshot({ path, fullPage });
  }

  async uploadFile(selector: string, filePath: string, timeout = 30000): Promise<void> {
    await this.page.locator(selector).setInputFiles(filePath, { timeout });
  }

  async acceptDialog(): Promise<void> {
    this.page.on('dialog', async (dialog: any) => {
      await dialog.accept();
    });
  }

  async dismissDialog(): Promise<void> {
    this.page.on('dialog', async (dialog: any) => {
      await dialog.dismiss();
    });
  }

  async getAlertText(): Promise<string> {
    return await this.page.waitForEvent('dialog').then(async (dialog: any) => {
      const message = dialog.message();
      await dialog.dismiss();
      return message;
    });
  }

  async setCookie(name: string, value: string, url?: string): Promise<void> {
    await this.page.context().addCookies([
      {
        name,
        value,
        url: url ?? this.page.url(),
      },
    ]);
  }

  async getCookies(): Promise<any[]> {
    return await this.page.context().cookies();
  }

  async clearCookies(): Promise<void> {
    await this.page.context().clearCookies();
  }

  async refresh(): Promise<void> {
    await this.page.reload();
  }

  async openNewTab(url?: string): Promise<Page> {
    const tab = await this.page.context().newPage();
    if (url) {
      await tab.goto(url);
    }
    return tab;
  }

  async switchToFrame(selector: string): Promise<void> {
    const frame = this.page.frameLocator(selector);
    await frame.locator('body').waitFor();
  }

  async switchToDefaultContent(): Promise<void> {
    await this.page.mainFrame().waitForLoadState('domcontentloaded');
  }

  async getConsoleLogs(): Promise<any[]> {
    const logs: any[] = [];
    this.page.on('console', (message: any) => logs.push(message.text()));
    return logs;
  }

  async jsClick(selector: string): Promise<void> {
    await this.page.locator(selector).evaluate((element: any) => {
      (element as HTMLElement).click();
    });
  }
}

export default WebUtils;
