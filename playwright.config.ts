import { defineConfig, devices } from '@playwright/test'

const PORT = 4173

/**
 * Runs against the production build (`npm run build` first). The responsive suite
 * runs on every device below; the content suite only on desktop Chrome.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop-chrome', use: { ...devices['Desktop Chrome'] } },
    { name: 'desktop-safari', use: { ...devices['Desktop Safari'] }, testIgnore: /content\.spec/ },
    // Phones: WebKit covers iOS Safari, Chromium covers Android.
    {
      name: 'narrow-280',
      use: { ...devices['Galaxy S9+'], viewport: { width: 280, height: 653 } },
      testIgnore: /content\.spec/,
    },
    { name: 'iphone-se', use: { ...devices['iPhone SE'] }, testIgnore: /content\.spec/ },
    {
      name: 'iphone-se-3',
      use: { ...devices['iPhone SE (3rd gen)'] },
      testIgnore: /content\.spec/,
    },
    { name: 'iphone-15', use: { ...devices['iPhone 15'] }, testIgnore: /content\.spec/ },
    {
      name: 'iphone-15-pro-max',
      use: { ...devices['iPhone 15 Pro Max'] },
      testIgnore: /content\.spec/,
    },
    {
      name: 'iphone-15-landscape',
      use: { ...devices['iPhone 15 landscape'] },
      testIgnore: /content\.spec/,
    },
    { name: 'pixel-7', use: { ...devices['Pixel 7'] }, testIgnore: /content\.spec/ },
    { name: 'galaxy-s9', use: { ...devices['Galaxy S9+'] }, testIgnore: /content\.spec/ },
    {
      name: 'galaxy-fold-cover',
      use: { ...devices['Galaxy Z Fold 7 Cover'] },
      testIgnore: /content\.spec/,
    },
    { name: 'ipad-mini', use: { ...devices['iPad Mini'] }, testIgnore: /content\.spec/ },
    {
      name: 'ipad-pro-landscape',
      use: { ...devices['iPad Pro 11 landscape'] },
      testIgnore: /content\.spec/,
    },
  ],
  webServer: {
    command: `npm run preview -- --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
