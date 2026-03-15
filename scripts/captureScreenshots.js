import { chromium } from 'playwright';
import fs from 'fs';

const takeScreenshots = async () => {
    if (!fs.existsSync('./screenshots')) {
        fs.mkdirSync('./screenshots');
    }

    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    // Set a good viewport for desktop
    await page.setViewportSize({ width: 1440, height: 900 });

    try {
        console.log('Navigating to Home...');
        await page.goto('http://localhost:5173/');
        await page.waitForTimeout(3000); // Wait for animations/fakeAPI
        await page.screenshot({ path: './screenshots/1_home.png', fullPage: true });

        console.log('Navigating to Product Details...');
        // Click on the first product
        const productLocator = page.locator('.product-card').first();
        await productLocator.click();
        await page.waitForTimeout(2000); // Wait for load
        await page.screenshot({ path: './screenshots/2_product_detail.png', fullPage: true });

        console.log('Adding to cart and opening Cart...');
        // Add to cart
        const addToCartBtn = page.locator('.add-to-cart-large');
        await addToCartBtn.click();
        await page.waitForTimeout(1000); // wait for animation
        
        // Go to cart
        await page.goto('http://localhost:5173/cart');
        await page.waitForTimeout(1500);
        await page.screenshot({ path: './screenshots/3_cart.png', fullPage: true });

        console.log('Opening Checkout...');
        const checkoutBtn = page.locator('.checkout-btn');
        await checkoutBtn.click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: './screenshots/4_checkout.png', fullPage: true });

        console.log('Simulating Login Slideout...');
        await page.goto('http://localhost:5173/');
        await page.waitForTimeout(1500);
        const loginBtn = page.locator('.action-btn').first();
        await loginBtn.click();
        await page.waitForTimeout(1000); // Wait for slideout
        await page.screenshot({ path: './screenshots/5_login.png' });
        
        // Close login slideout
        const closeBtn = page.locator('.close-btn');
        await closeBtn.click();
        await page.waitForTimeout(500);

        console.log('Filtering by Category...');
        const categoryBtn = page.locator('button:has-text("electronics")').first();
        if (await categoryBtn.count() > 0) {
            await categoryBtn.click();
            await page.waitForTimeout(1500);
            await page.screenshot({ path: './screenshots/6_category_filter.png', fullPage: true });
        }

        console.log('Sorting Products...');
        const sortSelect = page.locator('.sort-select');
        await sortSelect.selectOption('price-high');
        await page.waitForTimeout(1500);
        await page.screenshot({ path: './screenshots/7_sorted_products.png', fullPage: true });

        console.log('Simulating Empty Cart...');
        await page.goto('http://localhost:5173/cart');
        await page.waitForTimeout(1000);
        const clearBtn = page.locator('.btn-clear');
        if (await clearBtn.count() > 0) {
            await clearBtn.click();
            await page.waitForTimeout(1000);
        }
        await page.screenshot({ path: './screenshots/8_empty_cart.png', fullPage: true });

        console.log('Mobile View Home page...');
        const mobileContext = await browser.newContext({
            viewport: { width: 390, height: 844 }, // iPhone 12 Pro size
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
        });
        const mobilePage = await mobileContext.newPage();
        await mobilePage.goto('http://localhost:5173/');
        await mobilePage.waitForTimeout(3000);
        await mobilePage.screenshot({ path: './screenshots/9_home_mobile.png', fullPage: true });
        await mobileContext.close();
        
        console.log('Screenshots complete!');
    } catch (e) {
        console.error('Error taking screenshots: ', e);
    } finally {
        await browser.close();
    }
};

takeScreenshots();
