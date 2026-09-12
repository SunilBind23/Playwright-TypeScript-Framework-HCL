import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
test('Login to Naukri, update resume title and upload resume @smoke @daily', async ({ page }) => {

    const username = "yadavsaurabh51107@gmail.com";
    const password = "Saurabh@932005";
    const resumePath = "testdata/QA_SaurabhYadav_Resume_2+.pdf";

    // Open Naukri login
    await page.goto('https://www.naukri.com/');

    await page.locator("//a[text()='Login']").click();
    // Enter username
    await page.getByPlaceholder("Enter your active Email ID / Username").fill(username);

    // await page.locator('input[name="email"]').fill(username);

    // Enter password
    await page.getByPlaceholder("Enter your password").fill(password);

    //await page.locator('input[name="password"]').fill(password);

    // Click Login
    await page.locator('button[type="submit"]').click();

    // Wait for login
    await page.waitForTimeout(3000);

    // Open profile
    await page.goto('https://www.naukri.com/mnjuser/profile');

    // Wait for profile page
    await page.waitForTimeout(3000);

    // Get today's date
    // Get today's date
    const today = new Date();

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    // Get original file name
    const resumeName = path.basename(resumePath, path.extname(resumePath));

    // Create new file name
    const newFileName = `${resumeName}_${yyyy}-${mm}-${dd}.pdf`;

    // Create new path
    const newResumePath = path.join(path.dirname(resumePath), newFileName);

    // Copy original PDF with new name
    fs.copyFileSync(resumePath, newResumePath);

    console.log("New Resume:", newResumePath);

    // Upload renamed PDF
    await page.locator('#attachCV').setInputFiles(newResumePath);

    // Click Update Resume
    await page.locator('input[value="Update resume"]').click();

    await page.waitForTimeout(3000);

    console.log("Resume uploaded successfully");

});