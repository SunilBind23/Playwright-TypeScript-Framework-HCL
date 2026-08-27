import { test, expect } from '@playwright/test';

test('Handle Alert @regression', async function ({ page }) {

    await page.goto('https://demoqa.com/alerts');

    page.on('dialog', async function (dialog) {

        console.log(dialog.type());
        console.log(dialog.message());

        await dialog.accept('Sunil');
    });

    await page.locator('#alertButton').click();

});