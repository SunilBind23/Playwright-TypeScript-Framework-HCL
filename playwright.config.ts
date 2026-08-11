import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* Run tests in parallel */
  fullyParallel: true,

  /* Fail CI if test.only is accidentally committed */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests on CI */
  retries: process.env.CI ? 2 : 0,

  /* One worker on CI */
  workers: process.env.CI ? 1 : undefined,

  /* HTML Report */
  reporter: 'html',

  /* Shared settings */
  use: {
    /* Headless browser */
    headless: true,

    /* Screenshot only on failure */
    screenshot: 'only-on-failure',

    /* Video retained only on failure */
    video: 'retain-on-failure',

    /* Trace retained on failure */
    trace: 'retain-on-failure',
  },

  /* Browser */
  projects: [
  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
    },
  },

  {
    name: 'firefox',
    use: {
      ...devices['Desktop Firefox'],
    },
  },

  {
    name: 'webkit',
    use: {
      ...devices['Desktop Safari'],
    },
  },
],
});