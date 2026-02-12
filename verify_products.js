const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 2000 });
  await page.goto('file://' + process.cwd() + '/products.html');
  // Wait for products to load
  await page.waitForSelector('.product-card');
  await page.screenshot({ path: 'verification/products.png', fullPage: true });
  await browser.close();
})();
