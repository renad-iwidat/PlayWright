import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Add to Cart Feature', () => {
    let productsPage: ProductsPage;
    let page;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await page.waitForTimeout(2000);

        await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
        await page.waitForTimeout(3000);

        productsPage = new ProductsPage(page);
    });

    test('Add a single item to cart', async () => {
        await productsPage.addItemToCart('sauce-labs-backpack');
        await page.waitForTimeout(2000);

        await productsPage.openCart();
        await page.waitForTimeout(3000);

        const cartItem = page.locator('.cart_item');
        await expect(cartItem).toContainText('Sauce Labs Backpack');

        await page.waitForTimeout(3000);
    });

    test('Add multiple items to cart', async () => {
        await productsPage.addItemToCart('sauce-labs-bike-light');
        await page.waitForTimeout(2000);

        await productsPage.addItemToCart('sauce-labs-bolt-t-shirt');
        await page.waitForTimeout(2000);

        await productsPage.openCart();
        await page.waitForTimeout(3000);

        const items = page.locator('.cart_item');
        await expect(items).toHaveCount(2);
        await page.waitForTimeout(3000);
    });
});
