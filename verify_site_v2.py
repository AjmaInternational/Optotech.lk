import asyncio
from playwright.async_api import async_playwright
import os

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1920, 'height': 1080})

        # Log console errors
        page.on("console", lambda msg: print(f"CONSOLE {msg.type}: {msg.text}"))

        os.makedirs('verification', exist_ok=True)

        # Home Page
        print("Checking Home Page...")
        await page.goto('http://localhost:8000/index.html')
        await page.wait_for_timeout(3000)
        await page.screenshot(path='verification/home_full.png', full_page=True)

        # Products Page
        print("Checking Products Page...")
        await page.goto('http://localhost:8000/products.html')
        # Wait for product container to have at least one child
        try:
            await page.wait_for_selector('#product-container > div', timeout=5000)
        except:
            print("Timeout waiting for products to load")

        await page.wait_for_timeout(2000)
        await page.screenshot(path='verification/products_full.png', full_page=True)

        # Brand Page
        print("Checking Brand Page...")
        await page.goto('http://localhost:8000/sunshine.html')
        await page.wait_for_timeout(2000)
        await page.screenshot(path='verification/sunshine_full.png', full_page=True)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
